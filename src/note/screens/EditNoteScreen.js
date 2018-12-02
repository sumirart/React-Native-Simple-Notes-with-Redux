import React, { Component } from "react";
import { Container, Content, Textarea, Form } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { AndroidBackHandler } from 'react-navigation-backhandler'; // handle back button
import { connect } from 'react-redux';

// IMPORT ACTIONS
import { editNotes } from '../../public/redux/actions/note';

// MAP DISPATCH TO PROPS
const mapDispatchToProps = dispatch => {
    return {
        editNotes: note => dispatch(editNotes(note))
    }
}


class EditNoteScreen extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            text: ''
        }
    }

    // SET NAVIGATION TO ACCESS METHOD
    componentDidMount() {
        this.props.navigation.setParams({
            editNote: this.editNote
        });
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        const text = navigation.getParam('text');
        this.setState({ id, text })
    }

    // SAVE TO REDUX
    editNote = () => {
        const text = this.state.text;
        const id = this.state.id;
        const date = Date();

        if (this.state.text !== '') {
            this.props.editNotes({ id, text, date })
            this.props.navigation.pop();
        } else {
            this.props.navigation.pop()
        }
    }

    // CUSTOM BACK BUTTON (ALSO SAVE) ON HEADER
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerLeft: (
                <Icon name="arrow-back" size={25}
                    style={{ margin: 15 }}
                    onPress={() => params.editNote()}
                />
            )
        }
    }

    // HANDLE WHEN BACK KEY PRESSES
    onBackButtonPressAndroid = () => {
        this.editNote();
        this.props.navigation.pop();
        return true;
    };

    // GET MONTHS FOR PLACEHOLDER
    showDate = () => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const today = new Date();
        const thisMonth = months[today.getMonth()];
        const thisDate = today.getDate();
        const thisYear = today.getFullYear();
        const thisHour = today.getHours();
        const thisMinute = today.getMinutes();
        return `${thisDate} ${thisMonth} ${thisYear} ${thisHour}.${thisMinute}`;
    }

    render() {
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
                <Container>
                    <Content enableAutomaticScroll={false}>
                        <Form>
                            <Textarea
                                autoFocus={true}
                                value={this.state.text}
                                onChangeText={(text) =>
                                    this.setState({ text })
                                }
                                style={{ fontSize: 16, padding: 15, textAlign: "left" }}
                                rowSpan={22}
                            />
                        </Form>
                    </Content>
                </Container>
            </AndroidBackHandler>
        );
    }
}

export default connect(null, mapDispatchToProps)(EditNoteScreen);