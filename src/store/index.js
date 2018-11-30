import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';

import rootReducer from '../reducers';
// import logger from '../middleware/logger';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(logger));

store.subscribe(() => {
    console.log('store changed', store.getState());
})

export const persistor = persistStore(store);
// export default store;