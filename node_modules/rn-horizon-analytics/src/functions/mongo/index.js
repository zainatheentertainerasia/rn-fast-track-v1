import {
  makeSession,
  resetSessionObject,
  getSession,
  updateSessions,
} from './session';
import { setItem, getItem } from '../../utils/storage';
import { AUTH_KEY } from '../../utils/strings';
import { isNotAnalyticsEnable } from '../../utils/index';
import { makeStack, getStackArray, resetStackObject, postStack } from './stack';

//this will use in authenication headers to send the session data
const init = (authToken = '') => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  setItem(AUTH_KEY, authToken);
};

const mongo = {
  init,
  getSession,
  makeSession,
  updateSessions,
  makeStack,
  getStackArray, 
  resetStackObject,
  postStack,
  resetSessionObject,
};

export default mongo;
