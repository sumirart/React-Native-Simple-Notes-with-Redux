import { createStackNavigator, createAppContainer } from 'react-navigation';

// IMPORT SCREEN
import HomeScreen from '../../note/screens/HomeScreen';
import AddNoteScreen from '../../note/screens/AddNoteScreen';
import EditNoteScreen from "../../note/screens/EditNoteScreen";

const AppNavigator = createStackNavigator({
    Home: HomeScreen,
    AddNote: AddNoteScreen,
    EditNote: EditNoteScreen
}, {
        // headerMode: "none"
        defaultNavigationOptions: {
            title: "Notes",
        }
    }
)
export default createAppContainer(AppNavigator);