import { createStackNavigator, createAppContainer } from 'react-navigation';

// IMPORT SCREEN
import HomeScreen from './containers/HomeScreen';
import AddNoteScreen from './containers/AddNoteScreen';
import Notes from './Notes';
import EditNoteScreen from "./containers/EditNoteScreen";

const AppNavigator = createStackNavigator({
    Notes: Notes,
    Home: HomeScreen,
    AddNote: AddNoteScreen,
    EditNote: EditNoteScreen
}, {
        defaultNavigationOptions: {
            title: "Notes",
        }
    }
)
export default createAppContainer(AppNavigator);