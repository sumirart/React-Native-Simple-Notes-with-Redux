import { createNavigationReducer } from 'react-navigation-redux-helpers';
import { combineReducers } from 'redux';

import RootNavigator from '../../navigators/RootNavigator';
import notesReducer from './note';

const reducerRouter = createNavigationReducer(RootNavigator);

const reducers = combineReducers({
    router: reducerRouter,
    notes: notesReducer
});

export default reducers;