/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import configStore from "./stores/configStore";
import Router from "./routes/App"
export default class Boot extends Component {
  constructor(props) {
    super(props);
    const { persistor, store } = configStore();
    this.persistor = persistor;
    this.store = store;
  }

  render() {
    return (
      <Provider store={this.store}>
        <PersistGate  persistor={this.persistor}>
          <Router/>
        </PersistGate>
      </Provider>
    )
  }
}
