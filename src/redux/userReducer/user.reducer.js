import { UserActionTypes } from './user.types';
import JWT from 'expo-jwt';

//localImports
import appConfig from '../../AppConfig.json'

createJwt = () => {
  const payload = {
    api_token: appConfig.apiToken,
  };
  const jwt = JWT.encode(payload, appConfig.serectKey);
  return jwt;
};


const INITIAL_STATE = {
  userInfo: null,
  token: createJwt(),
  userSessionToken:'',
};

const user = (state = INITIAL_STATE, action) => {
  console.log(action, 'actions');
  switch (action.type) {
    case UserActionTypes.SET_CONSUME_VALUES:
      return {
        ...state,
        ...action.dataObj,
      };
    case UserActionTypes.SET_EXPOSE_VALUES:
      return {
        ...state,
        exposeFunction: action.exposeFunction,
      };

    case UserActionTypes.SET_USER:
      return {
        ...state,
        userInfo: action.data,
      };

    case UserActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.data,
      };

    case UserActionTypes.SET_USER_VALUES:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export default user;
