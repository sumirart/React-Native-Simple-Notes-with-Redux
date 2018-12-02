import React, { Component } from 'react';
import { ListView, Alert } from 'react-native';
import { Container, Content, Button, Icon, List, Header, Title, Left, Body, Right, Text, Footer, FooterTab, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { connect } from 'react-redux';
// import { withNavigation } from 'react-navigation';

// IMPORT COMPONENT AND ACTIONS
// import Note from '../components/Note';
import { toggleGrid } from '../../public/redux/actions/note'
import { removeNotes } from '../../public/redux/actions/note'

const mapStateToProps = state => ({
    notes: state.notes,
    isGrid: state.isGrid

})

const mapDispatchToProps = dispatch => ({
    toggleGrid: () => dispatch(toggleGrid()),
    removeNotes: note => dispatch(removeNotes(note)),
})


// IMPORT COMPONENT
import ListComponent from '../components/ListComponent';
import GridComponent from '../components/GridComponent';


class HomeScreen extends Component {
    constructor() {
        super();
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            toggle: false,
            selectedId: [],
            selectNone: false
        };
    }

    static navigationOptions = {
        header: null
    };

    // TOGGLE EDIT BUTTON
    toggleEdit = () => {
        this.setState({ toggle: !this.state.toggle })
    }

    // SELECTED ID
    selectId = (id) => {
        var index = this.state.selectedId.indexOf(id);

        if (index === -1) {
            this.setState({ selectedId: [...this.state.selectedId, id] })
        } else {
            this.setState(state => {
                const selectedId = state.selectedId.filter(e => e !== id);
                return {
                    selectedId
                }
            })
        }
    }

    // DELETE NOTES
    deleteNote = () => {
        // const self = this.props;
        // If no selected note, delete all
        if (this.state.selectedId.length === 0) {
            this.props.notes.notes.map(e => {
                this.props.removeNotes(e);
            })
            this.toggleEdit()
        } else {
            // if there is selected note, delete selected
            this.state.selectedId.map(e => {
                this.props.removeNotes(e);
                this.setState({ selectedId: [], toggle: false, selectNone: true })
            })
        }
    }

    // DELETE SINGLE NOTE
    deleteSingleNote = (note) => {
        this.props.removeNotes(note);
    }

    // CLOSE ROW WHEN DELETED
    deleteRow = (secId, rowId, rowMap) => {
        // <<<<<<<<<<<<<<<<<<<<<<<<< CONSOLE LOG LATER FOR FIXs
        rowMap[`${secId}${rowId}`].props.closeRow();
    }

    // CONFIRMATION ALERT ON DELETE ALL/SELECTED
    confirmButton() {
        Alert.alert(
            "Delete Note",
            "Are you sure want to delete note?",
            [
                {
                    text: "NO", onPress: () => {
                        console.log("Cancel delete");
                    }
                },
                {
                    text: "YES", onPress: () => {
                        console.log("Confirm delete");
                        this.deleteNote();
                    }
                }
            ],
            { cancelable: false }
        )
    }

    // CONFIRMATION ALERT ON DELETE SINGLE
    confirmButtonSingle(note) {
        Alert.alert(
            "Delete Note",
            "Are you sure want to delete note?",
            [
                {
                    text: "NO", onPress: () => {
                        console.log("Cancel delete");
                    }
                },
                {
                    text: "YES", onPress: () => {
                        console.log("Confirm delete");
                        this.deleteSingleNote(note);
                    }
                }
            ],
            { cancelable: false }
        )
    }

    render() {
        // static navigationOptions = {

        // }
        console.log(this.props);
        // console.log(this.props.notes);
        // console.log(this.props.notes.notes);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <Container>
                {/* HEADER------------------------------ */}
                <Header style={{ backgroundColor: "white", marginBottom: 5 }}>
                    <Left />
                    <Body>
                        <Title style={{ color: "black", fontWeight: "bold" }}>Notes</Title>
                    </Body>
                    <Right>
                        {/* If no notes disabled "Edit" button */}
                        {this.props.notes.notes.length < 1 ?
                            (
                                <Button hasText transparent>
                                    <Text style={{ color: "#949494" }}>
                                        Edit
                                    </Text>
                                </Button>

                            ) :
                            // If there is note toggleEdit()
                            (
                                <Button hasText transparent onPress={() => this.toggleEdit()}>
                                    <Text style={{ color: "black" }}>
                                        {this.state.toggle ? "Cancel" : "Edit"}
                                    </Text>
                                </Button>
                            )}
                    </Right>
                </Header>


                {/* CONTAINER------------------------------ */}
                <Content>
                    {this.props.notes.isGrid ?
                        <GridComponent notes={this.props.notes.notes} />
                        :
                        <List
                            rightOpenValue={-75}
                            disableRightSwipe={true}
                            closeOnRowBeginSwipe={true}
                            dataSource={this.ds.cloneWithRows(this.props.notes.notes)}
                            renderRow={data =>
                                <List>
                                    <ListComponent
                                        selectNone={this.state.selectNone}
                                        note={data}
                                        toggle={this.state.toggle}
                                        selectId={this.selectId}
                                        style={{ marginLeft: 15 }} />
                                </List>
                            }
                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger onPress={_ => {
                                    this.confirmButtonSingle(data);
                                    this.deleteRow(secId, rowId, rowMap)
                                }}>
                                    <Icon active name="trash" />
                                </Button>}
                        />
                    }
                </Content>


                {/* FOOTER------------------------------ */}
                < Footer >
                    <FooterTab style={{ backgroundColor: "white" }} >
                        <Left>
                            {this.props.notes.isGrid ?
                                (
                                    <Button transparent={true} onPress={() => this.props.toggleGrid({})}>
                                        <Icon name="list-box" />
                                    </Button>
                                ) :
                                <Button transparent={true} onPress={() => this.props.toggleGrid({})}>
                                    <Icon name="grid" />
                                </Button>
                            }

                        </Left>

                        <Body>
                            <Text style={{ color: "black" }} >
                                {
                                    // Show length() of notes
                                    this.props.notes.notes.length
                                }{
                                    // "note" for 0 and 1, "notes" for 2 or more
                                    this.props.notes.notes.length < 2 ? " Note" : " Notes"
                                }
                            </Text>
                        </Body>

                        <Right>
                            {/* Toggle Delete or Add */}
                            {this.state.toggle ?
                                (
                                    // Toggle "Delete" or "Delete All"
                                    this.state.selectedId.length == 0 ? (
                                        <Button hasText transparent onPress={
                                            () => {
                                                this.confirmButton();
                                            }
                                        }>
                                            <Text>Delete All</Text>
                                        </Button>
                                    ) :
                                        <Button hasText transparent onPress={
                                            () => {
                                                this.confirmButton();
                                            }
                                        }>
                                            <Text>Delete</Text>
                                        </Button>
                                ) :
                                (
                                    <Button onPress={() => this.props.navigation.navigate("AddNote")} transparent={true}>
                                        <Icon name="add-circle" color="black" />
                                    </Button>
                                )}

                        </Right>
                    </FooterTab>
                </Footer >
            </Container >
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);