import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './src/store';
import RootNavigator from './src/RootNavigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}