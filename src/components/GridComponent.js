import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

class GridComponent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>GridComponent</Text>
            </View>
        );
    }
}
export default GridComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});