import React, { Component } from "react";
import { View } from "react-native";
import { Body, ListItem, Text, CheckBox, Left } from 'native-base';
import { withNavigation } from 'react-navigation';

class ListComponent extends Component {
    state = {
        checked: false,
        selectNone: this.props.selectNone
    }

    // RERENDER PROPS AND SET CHECKED TO FALSE
    componentDidUpdate(prevProps) {
        if (prevProps.toggle === false) {
            if (this.state.checked === true) {
                this.setState({ checked: false })
            }
        }
    }

    // FORMAT DATE
    formatDate = (date) => {
        var date = new Date(date);
        var today = new Date();
        // custom date for check
        // var date = new Date("Sat Nov 24 2018 07:00:00 GMT+0700 (WIB)");

        // check if today
        if (date.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
            return "Today"
        }

        // check if less less than 7 days and return day name
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var diffDays = Math.round(Math.abs((today.getTime() - date.getTime()) / (oneDay)));

        if (diffDays < 7) {
            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            return weekday[date.getDay()];

        } else {
            // if more than 6 days return format
            var dd = date.getDate();
            var mm = date.getMonth() + 1; //January is 0!
            var yy = date.getFullYear().toString().substr(-2);

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            return dd + '/' + mm + '/' + yy;
        }
    }

    render() {
        // if (!this.props.toggle) {
        //     this.setState({ checked: !this.state.checked })
        // }

        return (
            <ListItem key={this.props.note.id} onPress={() => {
                this.props.navigation.navigate("EditNote", {
                    id: this.props.note.id,
                    date: this.props.note.date,
                    text: this.props.note.text
                })
            }
            }>
                {this.props.toggle ?
                    <CheckBox checked={this.state.checked}
                        onPress={
                            () => {
                                this.props.selectId(this.props.note)
                                this.setState({ checked: !this.state.checked })
                            }
                        } />
                    :
                    <View />

                }
                <Body>
                    <Text numberOfLines={1} style={{ fontSize: 18 }}>
                        {this.props.note.text.split('\n')[0]}
                    </Text>
                    <View style={{ flexDirection: "row", marginTop: 0 }}>
                        <Text style={{ fontSize: 16, color: "#949494", marginVertical: 0 }}>
                            {this.formatDate(this.props.note.date)}
                        </Text>
                        <Text numberOfLines={1} style={{ flex: 1, fontSize: 16, color: "#949494", marginVertical: 0 }}>
                            {
                                this.props.note.text.split('\n')[1] === undefined ?
                                    "No additional text" :
                                    this.props.note.text.split('\n')[1]
                            }
                        </Text>
                    </View>
                </Body>
            </ListItem>
        );
    }
}
export default withNavigation(ListComponent);