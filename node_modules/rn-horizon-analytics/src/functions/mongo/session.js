import { setItem, getItem } from '../../utils/storage';
import { makeSessionId, getDeviceInfo, isNotAnalyticsEnable } from '../../utils/index';

const SESSION_ID_KEY = 'session_id';
const SESSION_KEY = 'session';
const SESSION_OBJECT_KEY = 'sessionObject';
const SCREEN_NO = 'screen_sequence_number';
export const getSessionId = async () => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  let session_id = await getItem(SESSION_ID_KEY);
  if (session_id === null) {
    session_id = 'no_session';
  }
  return session_id;
};

export const getAllSessionObject = async () => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  let sessionObject = await getItem(SESSION_OBJECT_KEY);
  if (sessionObject === null) {
    sessionObject = {};
  } else {
    try {
      sessionObject = JSON.parse(sessionObject);
    } catch (error) {
      sessionObject = {};
    }
  }
  return sessionObject;
};

//this function save session objects
export const setSessionObject = async (sessionObject) => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  const sessionObjectStringify = JSON.stringify(sessionObject);
  await setItem(SESSION_OBJECT_KEY, sessionObjectStringify);
};

export const makeSession = async (sessionObject) => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  try {
    const sessionObjectStringify = JSON.stringify(sessionObject);
    await setItem(SESSION_KEY, sessionObjectStringify);
    const deviceInfo = await getDeviceInfo();
    const session_id = makeSessionId();
    setItem(SESSION_ID_KEY, session_id);

    setItem(SCREEN_NO, 0); //setting screen sequance number this is update accordingly when a stack pushed
    let sessionData = {
      location_id: 0,
      session_id,
      customer_id: '',
      app_version: '',
      device_os: deviceInfo.os,
      device_uid: '',
      device_model: deviceInfo.model,
      device_install_token: '',
      screen_resolution: deviceInfo.screen_resolution,
      device_type: deviceInfo.isMobile ? 'mobile' : 'tablet',
      language: '',
      company: '',
      device_os_ver: deviceInfo.osVersion,
      created_at: '',
      wlcompany: '',
    };

    sessionData = {
      ...sessionData,
      ...sessionObject,
    };

    let allSessionObject = await getAllSessionObject();

    allSessionObject = {
      ...allSessionObject,
      [session_id]: sessionData, //session data is an object
    };
    await setSessionObject(allSessionObject);
  } catch (error) {
    console.log('Error in MakeSession', error);
  }
};

// a function that will update session by customer_id
// fetch all sessions and update ith with customer_id and save them
export const updateSessions = async (customer_id = '', location_id = '') => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  try {
    let allSessionObject = await getAllSessionObject(); // fetch all sessions
    //setting values to customer_id
    Object.keys(allSessionObject).map((key) => {
      if (customer_id !== '') {
        allSessionObject[key].customer_id = customer_id;
      }

      if (location_id !== '') {
        allSessionObject[key].location_id = location_id;
      }
    });
    await setSessionObject(allSessionObject);
  } catch (error) {
    console.log('Error in Update Session', error);
  }
};

export const getSession = async () => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  let sessionObject = await getItem(SESSION_OBJECT_KEY);
  if (sessionObject === null) {
    sessionObject = {};
  } else {
    try {
      sessionObject = JSON.parse(sessionObject);
    } catch (error) {
      sessionObject = {};
    }
  }
  return sessionObject;
};

export const resetSessionObject = async () => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  const sessionObject = [];
  const sessionObjectStringify = JSON.stringify(sessionObject);
  await setItem(SESSION_OBJECT_KEY, sessionObjectStringify);
};
