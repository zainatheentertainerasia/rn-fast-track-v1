import { AppActionTypes } from './app.types';
import appConfig from '../../AppConfig.json';
import endPoints from '../../EndPoints.json';
import Device from 'react-native-device-info';
import { currentLanguage } from '../../utils/localization/I18n';
const env = appConfig.env; //this env is used for endpoints

const isDemographicsEnable = (appConfigs, screenName) => {
  if (appConfigs.demographics_is_active === '1') {
    if (appConfigs.demographics_screen_locations.indexOf(screenName) > -1) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const INITIAL_STATE = {
  skipMode: false,
  AppConfigs: appConfig,
  deviceInfo: {
    company: appConfig.companyName,
    app_version: appConfig.appVerison,
    device_key: Device.getUniqueId(),
    device_brand: Device.getBrand(),
    device_model: Device.getModel(),
    device_os: Platform.OS,
    __device_id: Device.getUniqueId(),
    language: currentLanguage(),
    wlcompany: appConfig.company,
  }, //TODO: add more device info data

  isLoading: false,
  errorObject: { status: false, message: '' },
  successObject: { status: false, message: '' },
  isVisibleDemographic: false,
  webViewObject:{status:false,url:'',headerText:''}
};

const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AppActionTypes.SET_CONSUME_VALUES:
      return {
        ...state,
        ...action.dataObj,
      };
    case AppActionTypes.SET_EXPOSE_VALUES:
      return {
        ...state,
        exposeFunction: action.exposeFunction,
      };

    case AppActionTypes.SET_SKIP_MODE:
      return {
        ...state,
        skipMode: action.value,
      };

    case AppActionTypes.SET_APP_CONFIGS:
      return {
        ...state,
        AppConfigs: { ...state.AppConfigs, ...action.data },
      };

    case AppActionTypes.SET_APP_LOADING:
      return {
        ...state,
        isLoading: action.data,
      };

    case AppActionTypes.SET_APP_ERROR:
      return {
        ...state,
        errorObject: action.data,
      };

      case AppActionTypes.SET_APP_WEBVIEW:
        return {
          ...state,
          webViewObject: action.data,
        };

    case AppActionTypes.SET_APP_SUCCESS:
      return {
        ...state,
        successObject: action.data,
      };

    case AppActionTypes.SET_IS_DEMOGRAPHIC_VISIBLE:
      return {
        ...state,
        isVisibleDemographic: isDemographicsEnable(
          state.AppConfigs,
          action.data
        ),
      };

      case AppActionTypes.SET_DISMISS_DEMOGRAPHIC:
      return {
        ...state,
        isVisibleDemographic: false,
      };

    default:
      return state;
  }
};

export default appReducer;
