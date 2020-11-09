import { EventRegister } from "react-native-event-listeners";

export const eventName = "ft_rn_fav_module";
export const exposeFunction = (data) => {
  EventRegister.emit(eventName, data);
};