import React, { Component } from "react";
import { Container, Content, Textarea, Form } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import uuidv1 from 'uuid'; //generate random id
import { AndroidBackHandler } from 'react-navigation-backhandler'; // handle back button
import { connect } from 'react-redux';

// IMPORT ACTIONS
import { addNotes } from '../../public/redux/actions/note';

// MAP DISPATCH TO PROPS
const mapDispatchToProps = dispatch => {
    return {
        addNotes: note => dispatch(addNotes(note))
    }
}


class AddNoteScreen extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            hasFocused: false
        }
    }

    // SET NAVIGATION TO ACCESS METHOD
    componentDidMount() {
        this.props.navigation.setParams({
            addNote: this.addNote
        });
    }

    // SAVE TO REDUX
    addNote = () => {
        const text = this.state.text;
        const id = uuidv1();
        const date = Date();

        if (this.state.text !== '') {
            this.props.addNotes({ id, text, date })
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
                    onPress={() => params.addNote()}
                />
            )
        }
    }

    // HANDLE WHEN BACK KEY PRESSES
    onBackButtonPressAndroid = () => {
        this.addNote();
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
                                onFocus={() => {
                                    this.setState({ hasFocused: true })
                                }}
                                onChangeText={(text) =>
                                    this.setState({ text })
                                }
                                style={[{ fontSize: 16, padding: 15 }, this.state.hasFocused ? { textAlign: "left" } : { textAlign: "center" }]}
                                rowSpan={22}
                                placeholder={this.state.hasFocused ? '' : this.showDate()}
                            />
                        </Form>
                    </Content>
                </Container>
            </AndroidBackHandler>
        );
    }
}

export default connect(null, mapDispatchToProps)(AddNoteScreen);