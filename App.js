import React, { useEffect, useState, Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import StartModule from './startModule'
import { store, persistor } from './src/redux/store';
import { Portal } from 'react-native-paper';
class Base extends Component {
  
  render() {

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Portal.Host>
            <StartModule/>
          </Portal.Host>
        </PersistGate>
      </Provider>
    );
  }
}

export default Base;
