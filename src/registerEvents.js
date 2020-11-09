import { EventRegister } from 'react-native-event-listeners';

export const eventNameAuth = 'ft_rn_auth_module';
export const eventNameHome = 'ft_rn_home_module';
export const eventNameOutlet = 'ft_rn_outlet_module';
export const eventNameMerchant = 'ft_rn_merchant_module';
export const eventNameSearch = 'ft_rn_search_module';
export const eventNameFav = 'ft_rn_fav_module';
export const eventNameProfile = 'ft_rn_profile_module';
export const eventNameNotification = 'ft_rn_notification_module';

export const exposeAuth = (data) => {
  EventRegister.emit(eventNameAuth, data);
};

export const initExposeAuth = (callBack) => {
  EventRegister.addEventListener(eventNameAuth, (data) => {
    callBack(data);
  });
};

export const exposeHome = (data) => {
  //console.log(data,'in expose home')
  EventRegister.emit(eventNameHome, data);
};

export const initExposeHome = (callBack) => {
  EventRegister.addEventListener(eventNameHome, (data) => {
    callBack(data);
  });
};

export const exposeOutlet = (data) => {
  EventRegister.emit(eventNameOutlet, data);
};

export const initExposeOutlet = (callBack) => {
  EventRegister.addEventListener(eventNameOutlet, (data) => {
    callBack(data);
  });
};

export const exposeMerchant = (data) => {
  EventRegister.emit(eventNameMerchant, data);
};

export const initExposeMerchant = (callBack) => {
  EventRegister.addEventListener(eventNameMerchant, (data) => {
    callBack(data);
  });
};

export const exposeSearch = (data) => {
  EventRegister.emit(eventNameSearch, data);
};

export const initExposeSearch = (callBack) => {
  EventRegister.addEventListener(eventNameSearch, (data) => {
    callBack(data);
  });
};

export const exposeFav = (data) => {
  EventRegister.emit(eventNameFav, data);
};

export const initExposeFav = (callBack) => {
  EventRegister.addEventListener(eventNameFav, (data) => {
    callBack(data);
  });
};

export const exposeProfile = (data) => {
  EventRegister.emit(eventNameProfile, data);
};

export const initExposeProfile = (callBack) => {
  EventRegister.addEventListener(eventNameProfile, (data) => {
    callBack(data);
  });
};

export const exposeNotification = (data) => {
  EventRegister.emit(eventNameNotification, data);
};

export const initExposeNotification = (callBack) => {
  EventRegister.addEventListener(eventNameNotification, (data) => {
    callBack(data);
  });
};
