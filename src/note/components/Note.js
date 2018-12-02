// import React, { Component } from 'react';
// import { ListView, Alert } from 'react-native';
// import { Container, Content, Button, Icon, List, Header, Title, Left, Body, Right, Text, Footer, FooterTab, CardItem } from 'native-base';
// import { Col, Row, Grid } from 'react-native-easy-grid'
// import { withNavigation } from 'react-navigation';

// // IMPORT COMPONENT
// import ListComponent from './ListComponent';


// class Note extends Component {
//     constructor(props) {
//         super(props);
//         this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
//         this.state = {
//             toggle: false,
//             selectedId: [],
//             selectNone: false
//         };
//     }

//     // TOGGLE EDIT BUTTON
//     toggleEdit = () => {
//         this.setState({ toggle: !this.state.toggle })
//     }

//     // SELECTED ID
//     selectId = (id) => {
//         var index = this.state.selectedId.indexOf(id);

//         if (index === -1) {
//             this.setState({ selectedId: [...this.state.selectedId, id] })
//         } else {
//             this.setState(state => {
//                 const selectedId = state.selectedId.filter(e => e !== id);
//                 return {
//                     selectedId
//                 }
//             })
//         }
//     }

//     // DELETE NOTES
//     deleteNote = () => {
//         const self = this.props;
//         // If no selected note, delete all
//         if (this.state.selectedId.length === 0) {
//             self.notes.map(e => {
//                 self.removeNotes(e);
//             })
//             this.toggleEdit()
//         } else {
//             // if there is selected note, delete selected
//             this.state.selectedId.map(e => {
//                 self.removeNotes(e);
//                 this.setState({ selectedId: [], toggle: false, selectNone: true })
//             })
//         }
//     }

//     // DELETE SINGLE NOTE
//     deleteSingleNote = (note) => {
//         this.props.removeNotes(note);
//     }

//     // CLOSE ROW WHEN DELETED
//     deleteRow = (secId, rowId, rowMap) => {
//         // <<<<<<<<<<<<<<<<<<<<<<<<< CONSOLE LOG LATER FOR FIXs
//         rowMap[`${secId}${rowId}`].props.closeRow();
//     }

//     // CONFIRMATION ALERT ON DELETE ALL/SELECTED
//     confirmButton() {
//         Alert.alert(
//             "Delete Note",
//             "Are you sure want to delete note?",
//             [
//                 {
//                     text: "NO", onPress: () => {
//                         console.log("Cancel delete");
//                     }
//                 },
//                 {
//                     text: "YES", onPress: () => {
//                         console.log("Confirm delete");
//                         this.deleteNote();
//                     }
//                 }
//             ],
//             { cancelable: false }
//         )
//     }

//     // CONFIRMATION ALERT ON DELETE SINGLE
//     confirmButtonSingle(note) {
//         Alert.alert(
//             "Delete Note",
//             "Are you sure want to delete note?",
//             [
//                 {
//                     text: "NO", onPress: () => {
//                         console.log("Cancel delete");
//                     }
//                 },
//                 {
//                     text: "YES", onPress: () => {
//                         console.log("Confirm delete");
//                         this.deleteSingleNote(note);
//                     }
//                 }
//             ],
//             { cancelable: false }
//         )
//     }

//     // FORMAT DATE
//     formatDate = (date) => {
//         var date = new Date(date);
//         var today = new Date();
//         // custom date for check
//         // var date = new Date("Sat Nov 24 2018 07:00:00 GMT+0700 (WIB)");

//         // check if today
//         if (date.setHours(0, 0, 0, 0) == today.setHours(0, 0, 0, 0)) {
//             return "Today"
//         }

//         // check if less less than 7 days and return day name
//         var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
//         var diffDays = Math.round(Math.abs((today.getTime() - date.getTime()) / (oneDay)));

//         if (diffDays < 7) {
//             var weekday = new Array(7);
//             weekday[0] = "Sunday";
//             weekday[1] = "Monday";
//             weekday[2] = "Tuesday";
//             weekday[3] = "Wednesday";
//             weekday[4] = "Thursday";
//             weekday[5] = "Friday";
//             weekday[6] = "Saturday";

//             return weekday[date.getDay()];

//         } else {
//             // if more than 6 days return format
//             var dd = date.getDate();
//             var mm = date.getMonth() + 1; //January is 0!
//             var yy = date.getFullYear().toString().substr(-2);

//             if (dd < 10) {
//                 dd = '0' + dd
//             }

//             if (mm < 10) {
//                 mm = '0' + mm
//             }

//             return dd + '/' + mm + '/' + yy;
//         }
//     }

//     render() {
//         const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
//         return (
//             <Container>
//                 {/* HEADER------------------------------ */}
//                 <Header style={{ backgroundColor: "white", marginBottom: 5 }}>
//                     <Left />
//                     <Body>
//                         <Title style={{ color: "black", fontWeight: "bold" }}>Notes</Title>
//                     </Body>
//                     <Right>
//                         {/* If no notes disabled "Edit" button */}
//                         {this.props.notes.length < 1 ?
//                             (
//                                 <Button hasText transparent>
//                                     <Text style={{ color: "#949494" }}>
//                                         Edit
//                                     </Text>
//                                 </Button>

//                             ) :
//                             // If there is note toggleEdit()
//                             (
//                                 <Button hasText transparent onPress={() => this.toggleEdit()}>
//                                     <Text style={{ color: "black" }}>
//                                         {this.state.toggle ? "Cancel" : "Edit"}
//                                     </Text>
//                                 </Button>
//                             )}
//                     </Right>
//                 </Header>


//                 {/* CONTAINER------------------------------ */}
//                 <Content>
//                     {this.props.isGrid ?
//                         <Grid style={{ marginTop: 10 }}>
//                             {
//                                 this.props.notes.map((item, index) => {
//                                     if (index % 2 == 0) {
//                                         return (
//                                             <Row key={index} style={{ marginVertical: 10, marginHorizontal: 10, justifyContent: "space-between" }}>
//                                                 <Col
//                                                     style={{ height: 100, marginHorizontal: 5 }}
//                                                     onPress={() => {
//                                                         this.props.navigation.navigate("EditNote", {
//                                                             id: this.props.notes[index].id,
//                                                             date: this.props.notes[index].date,
//                                                             text: this.props.notes[index].text
//                                                         })
//                                                     }
//                                                     }
//                                                 >
//                                                     <CardItem style={{ flexGrow: 1, flexDirection: "column", borderColor: "#98999b", borderWidth: 1, borderRadius: 5 }}>
//                                                         <Text numberOfLines={1} style={{ flex: 1 }}>
//                                                             {this.props.notes[index].text.split('\n')[0]}
//                                                         </Text>
//                                                         <Text note style={{ flex: 1 }} numberOfLines={1}>
//                                                             {
//                                                                 this.props.notes[index].text.split('\n')[1] === undefined ?
//                                                                     "No additional text" :
//                                                                     this.props.notes[index].text.split('\n')[1]
//                                                             }
//                                                         </Text>
//                                                         <Text note numberOfLines={1} style={{ flex: 1 }}>
//                                                             {this.formatDate(this.props.notes[index].date)}
//                                                         </Text>
//                                                     </CardItem>
//                                                 </Col>
//                                                 {
//                                                     this.props.notes[index + 1] ?
//                                                         (
//                                                             <Col
//                                                                 style={{ height: 100, marginHorizontal: 5 }}
//                                                                 onPress={() => {
//                                                                     this.props.navigation.navigate("EditNote", {
//                                                                         id: this.props.notes[index + 1].id,
//                                                                         date: this.props.notes[index + 1].date,
//                                                                         text: this.props.notes[index + 1].text
//                                                                     })
//                                                                 }}
//                                                             >
//                                                                 <CardItem style={{ flexGrow: 1, flexDirection: "column", borderColor: "#98999b", borderWidth: 1, borderRadius: 5 }}>
//                                                                     <Text numberOfLines={1} style={{ flex: 1 }}>
//                                                                         {this.props.notes[index + 1].text.split('\n')[0]}
//                                                                     </Text>
//                                                                     <Text note style={{ flex: 1 }} numberOfLines={1}>
//                                                                         {
//                                                                             this.props.notes[index + 1].text.split('\n')[1] === undefined ?
//                                                                                 "No additional text" :
//                                                                                 this.props.notes[index + 1].text.split('\n')[1]
//                                                                         }
//                                                                     </Text>
//                                                                     <Text note numberOfLines={1} style={{ flex: 1 }}>
//                                                                         {this.formatDate(this.props.notes[index + 1].date)}
//                                                                     </Text>
//                                                                 </CardItem>
//                                                             </Col>
//                                                         ) : (
//                                                             <Col
//                                                                 style={{ height: 100, marginHorizontal: 5 }} >
//                                                                 <CardItem style={{ flexGrow: 1 }}>
//                                                                     <Text numberOfLines={1} style={{ flex: 1 }}>
//                                                                     </Text>
//                                                                     <Text note style={{ flex: 1 }} numberOfLines={1}>
//                                                                     </Text>
//                                                                     <Text note numberOfLines={1} style={{ flex: 1 }}>
//                                                                     </Text>
//                                                                 </CardItem>
//                                                             </Col>
//                                                         )
//                                                 }
//                                             </Row>
//                                         )
//                                     } else {
//                                         return null
//                                     }
//                                 })
//                             }
//                         </Grid>
//                         :
//                         <List
//                             rightOpenValue={-75}
//                             disableRightSwipe={true}
//                             closeOnRowBeginSwipe={true}
//                             dataSource={this.ds.cloneWithRows(this.props.notes)}
//                             renderRow={data =>
//                                 <List>
//                                     <ListComponent
//                                         selectNone={this.state.selectNone}
//                                         note={data}
//                                         toggle={this.state.toggle}
//                                         selectId={this.selectId}
//                                         style={{ marginLeft: 15 }} />
//                                 </List>
//                             }
//                             renderRightHiddenRow={(data, secId, rowId, rowMap) =>
//                                 <Button full danger onPress={_ => {
//                                     this.confirmButtonSingle(data);
//                                     this.deleteRow(secId, rowId, rowMap)
//                                 }}>
//                                     <Icon active name="trash" />
//                                 </Button>}
//                         />
//                     }
//                 </Content>


//                 {/* FOOTER------------------------------ */}
//                 < Footer >
//                     <FooterTab style={{ backgroundColor: "white" }} >
//                         <Left>
//                             {this.props.isGrid ?
//                                 (
//                                     <Button transparent={true} onPress={() => this.props.toggleGrid({})}>
//                                         <Icon name="list-box" />
//                                     </Button>
//                                 ) :
//                                 <Button transparent={true} onPress={() => this.props.toggleGrid({})}>
//                                     <Icon name="grid" />
//                                 </Button>
//                             }

//                         </Left>

//                         <Body>
//                             <Text style={{ color: "black" }} >
//                                 {
//                                     // Show length() of notes
//                                     this.props.notes.length
//                                 }{
//                                     // "note" for 0 and 1, "notes" for 2 or more
//                                     this.props.notes.length < 2 ? " Note" : " Notes"
//                                 }
//                             </Text>
//                         </Body>

//                         <Right>
//                             {/* Toggle Delete or Add */}
//                             {this.state.toggle ?
//                                 (
//                                     // Toggle "Delete" or "Delete All"
//                                     this.state.selectedId.length == 0 ? (
//                                         <Button hasText transparent onPress={
//                                             () => {
//                                                 this.confirmButton();
//                                             }
//                                         }>
//                                             <Text>Delete All</Text>
//                                         </Button>
//                                     ) :
//                                         <Button hasText transparent onPress={
//                                             () => {
//                                                 this.confirmButton();
//                                             }
//                                         }>
//                                             <Text>Delete</Text>
//                                         </Button>
//                                 ) :
//                                 (
//                                     <Button onPress={() => this.props.navigation.navigate("AddNote")} transparent={true}>
//                                         <Icon name="add-circle" color="black" />
//                                     </Button>
//                                 )}

//                         </Right>
//                     </FooterTab>
//                 </Footer >
//             </Container >
//         );
//     }
// }

// export default withNavigation(Note);