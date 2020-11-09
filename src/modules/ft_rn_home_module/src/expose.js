import { EventRegister } from "react-native-event-listeners";

export const eventName = "ft_rn_home_module";
export const exposeFunction = (data) => {
  EventRegister.emit(eventName, data);
};



export const initExposeFunction = (callBack) => {
  EventRegister.addEventListener(eventName, (data) => {
    callBack(data);
  });
};