import React from 'react';
import { Provider, connect } from 'react-redux';
import { reduxifyNavigator } from 'react-navigation-redux-helpers'
import { PersistGate } from 'redux-persist/integration/react'


import { store, persistor } from './src/public/redux/store';
import RootNavigator from './src/public/navigators/RootNavigator';

const App = reduxifyNavigator(RootNavigator, "root");

const mapStateToProps = state => ({
  state: state.router
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    );
  }
}