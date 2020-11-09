import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./redux/store";

import App from "./App";

import StaticData from "./StaticData.json";
import Module from "./Module.json";
import pkg from "../package.json";
import { EventRegister } from "react-native-event-listeners";

const JSX = (props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App {...props} />
      </PersistGate>
    </Provider>
  );
};

const eventName = pkg.name;

const exposeFunction = (data) => {
  EventRegister.emit(eventName, data);
};

JSX.initExposeFunction = (callBack) => {
  EventRegister.addEventListener(eventName, (data) => {
    callBack(data);
  });
};

JSX.defaultProps = {
  StaticData,
  Module,
  exposeFunction,
};

export default JSX;
