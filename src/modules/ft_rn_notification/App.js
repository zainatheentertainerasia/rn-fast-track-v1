import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "./src/redux/store";

import App from "./src/App";

import StaticData from "./src/StaticData.json";
import Module from "./src/Module.json";
import { NavigationContainer } from "@react-navigation/native";

const JSX = (props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <App {...props} />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const exposeFunction = (data) => {
  console.log("data =", data);
};

JSX.defaultProps = {
  StaticData,
  Module,
  exposeFunction,
};

export default JSX;
