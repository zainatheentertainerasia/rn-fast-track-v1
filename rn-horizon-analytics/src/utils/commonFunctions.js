import * as Device from 'expo-device';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const getPlateform = () => {
  let plateform = 'android';
  if (isIOS || isAndroid) {
    plateform = isIOS ? 'ios' : 'android';
  } else {
    plateform = 'web';
  }
  return plateform;
};

const genRand = () => {
  const lower = 1;
  const upper = 999999;
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const makeSessionId = () => {
  const plateform = Device.osName;
  let prefix = 'and';
  if (plateform === 'android' || plateform === 'ios') {
    prefix = plateform === 'android' ? 'and' : 'ios';
  } else {
    prefix = 'web';
  }
  return `react-${prefix}-${Date.now()}-${genRand()}`;
};

export const deviceDetect = () => {
  let osname = Device.osName + '-RN';
  return {
    os: osname,
    model: Device.modelName,
    isMobile: true,
    osVersion: Device.osVersion,
    screen_resolution: windowWidth + 'x' + windowHeight,
  };
};
//a function to get all the information about device
export const getDeviceInfo = () => {
  const deviceInfo = deviceDetect();
  return deviceInfo;
};


export const isNotAnalyticsEnable=()=>{
  return !window.appConfigs.log_analytics;
}