import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from '../reducers';
// import logger from '../middleware/logger';

const store = createStore(rootReducer, applyMiddleware(logger));

store.subscribe(() => {
    console.log('store changed', store.getState());
})

export default store;