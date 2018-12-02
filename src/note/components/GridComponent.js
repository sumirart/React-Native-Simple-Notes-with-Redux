import React, { Component } from "react";
import { Text, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid'
import { withNavigation } from 'react-navigation';

class GridComponent extends Component {

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
        return (
            <Grid style={{ marginTop: 10 }}>
                {
                    this.props.notes.map((item, index) => {
                        if (index % 2 == 0) {
                            return (
                                <Row key={index} style={{ marginVertical: 10, marginHorizontal: 10, justifyContent: "space-between" }}>
                                    <Col
                                        style={{ height: 100, marginHorizontal: 5 }}
                                        onPress={() => {
                                            this.props.navigation.navigate("EditNote", {
                                                id: this.props.notes[index].id,
                                                date: this.props.notes[index].date,
                                                text: this.props.notes[index].text
                                            })
                                        }
                                        }
                                    >
                                        <CardItem style={{ flexGrow: 1, flexDirection: "column", borderColor: "#98999b", borderWidth: 1, borderRadius: 5 }}>
                                            <Text numberOfLines={1} style={{ flex: 1 }}>
                                                {this.props.notes[index].text.split('\n')[0]}
                                            </Text>
                                            <Text note style={{ flex: 1 }} numberOfLines={1}>
                                                {
                                                    this.props.notes[index].text.split('\n')[1] === undefined ?
                                                        "No additional text" :
                                                        this.props.notes[index].text.split('\n')[1]
                                                }
                                            </Text>
                                            <Text note numberOfLines={1} style={{ flex: 1 }}>
                                                {this.formatDate(this.props.notes[index].date)}
                                            </Text>
                                        </CardItem>
                                    </Col>
                                    {
                                        this.props.notes[index + 1] ?
                                            (
                                                <Col
                                                    style={{ height: 100, marginHorizontal: 5 }}
                                                    onPress={() => {
                                                        this.props.navigation.navigate("EditNote", {
                                                            id: this.props.notes[index + 1].id,
                                                            date: this.props.notes[index + 1].date,
                                                            text: this.props.notes[index + 1].text
                                                        })
                                                    }}
                                                >
                                                    <CardItem style={{ flexGrow: 1, flexDirection: "column", borderColor: "#98999b", borderWidth: 1, borderRadius: 5 }}>
                                                        <Text numberOfLines={1} style={{ flex: 1 }}>
                                                            {this.props.notes[index + 1].text.split('\n')[0]}
                                                        </Text>
                                                        <Text note style={{ flex: 1 }} numberOfLines={1}>
                                                            {
                                                                this.props.notes[index + 1].text.split('\n')[1] === undefined ?
                                                                    "No additional text" :
                                                                    this.props.notes[index + 1].text.split('\n')[1]
                                                            }
                                                        </Text>
                                                        <Text note numberOfLines={1} style={{ flex: 1 }}>
                                                            {this.formatDate(this.props.notes[index + 1].date)}
                                                        </Text>
                                                    </CardItem>
                                                </Col>
                                            ) : (
                                                <Col
                                                    style={{ height: 100, marginHorizontal: 5 }} >
                                                    <CardItem style={{ flexGrow: 1 }}>
                                                        <Text numberOfLines={1} style={{ flex: 1 }}>
                                                        </Text>
                                                        <Text note style={{ flex: 1 }} numberOfLines={1}>
                                                        </Text>
                                                        <Text note numberOfLines={1} style={{ flex: 1 }}>
                                                        </Text>
                                                    </CardItem>
                                                </Col>
                                            )
                                    }
                                </Row>
                            )
                        } else {
                            return null
                        }
                    })
                }
            </Grid>
        );
    }
}
export default withNavigation(GridComponent);