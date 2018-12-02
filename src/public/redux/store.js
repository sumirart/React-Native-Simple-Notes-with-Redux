import { createStore, applyMiddleware } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';

// import reducers from '../reducers';
import reducers from './reducers';
import middleware from './middlewares';

const persistConfig = {
    key: 'Root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);
// export default store;