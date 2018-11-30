import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'


import { store, persistor } from './src/store';
import RootNavigator from './src/RootNavigator';

export default class App extends Component {
  renderLoading = () => (
    <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  )

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    );
  }
}