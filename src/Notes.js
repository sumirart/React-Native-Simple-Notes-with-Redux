import React, { Component } from "react";
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