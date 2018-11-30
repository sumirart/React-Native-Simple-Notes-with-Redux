import React, { Component } from "react";
import {
    View,
    Button
} from "react-native";
import { Container, Content } from 'native-base';

import HomeScreen from './containers/HomeScreen';

class Notes extends Component {
    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <HomeScreen />
        );
    }
}
export default Notes;