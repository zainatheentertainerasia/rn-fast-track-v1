import React from "react";
import App from "./App";

import { EventRegister } from "react-native-event-listeners";

const JSX = (props) => {
  return (
        <App {...props} />
  );
};

import {eventName} from './expose';

JSX.initExposeFunction = (callBack) => {
  EventRegister.addEventListener(eventName, (data) => {
    callBack(data);
  });
};


export default JSX;
