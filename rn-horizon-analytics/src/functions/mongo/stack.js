import { setItem, getItem } from '../../utils/storage';
import { postStackApiCalling } from '../../libs/apiCalling/mongoAnalytics';
import { getSession, getSessionId, setSessionObject } from './session';
import { AUTH_KEY } from '../../utils/strings';
import { isNotAnalyticsEnable } from '../../utils/index';
const STACK_OBJECT_KEY = 'stackObject';
const SCREEN_NO = 'screen_sequence_number';

//update screen sequance by adding key pair values in async function when a session is created
// before  push a stack/trail update the screen sequance number and use it in stack and push stack accordingly
export const getAllStackObject = async () => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  let stackObject = await getItem(STACK_OBJECT_KEY);
  if (stackObject === null) {
    stackObject = {};
  } else {
    try {
      stackObject = JSON.parse(stackObject);
    } catch (error) {
      stackObject = {};
    }
  }
  return stackObject;
};

export const setStackObject = async (stackObject) => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  const stackObjectStringify = JSON.stringify(stackObject);
  await setItem(STACK_OBJECT_KEY, stackObjectStringify);
};

export const makeStack = async (stackObject) => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  //fetching screen sequance number to update its values
  let screenSequenceNumber = await getItem(SCREEN_NO);
  if (stackObject.changeSequenceNumber === true) {
    if (
      screenSequenceNumber === undefined ||
      screenSequenceNumber == '' ||
      screenSequenceNumber === null
    ) {
      screenSequenceNumber = '0';
    }
    screenSequenceNumber = parseInt(screenSequenceNumber) + 1;
  }

  let stackData = {
    current_screen: '',
    screen_sequence_number: screenSequenceNumber.toString(),
    action: '',
    category_id: '',
    categories: '',
    categories_analytics: '',
    location_id: '',
  };
  //if user don't send proper key value pair then we implicitly adding values
  stackData = {
    ...stackData,
    ...stackObject,
  };

  let allStackObject = await getAllStackObject();
  const sessionId = await getSessionId();

  let stackArray = await getStackArray();

  stackArray.push(stackData);
  allStackObject = {
    ...allStackObject,
    [sessionId]: stackArray,
  };
  setItem(SCREEN_NO, screenSequenceNumber);
  await setStackObject(allStackObject);
};

export const getStackArray = async () => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  let allStackObject = await getAllStackObject();
  const sessionId = await getSessionId();
  let stackArray = allStackObject[sessionId];
  
  if (stackArray === undefined) {
    stackArray = [];
  }
  return stackArray;
};

export const resetStackObject = async () => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  const stackObject = {};
  const stackObjectStringify = JSON.stringify(stackObject);
  setItem(SCREEN_NO, 0);
  await setItem(STACK_OBJECT_KEY, stackObjectStringify);
};

export const postStack = async () => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  let allStackObject = await getAllStackObject();
  let getSessionObject = await getSession();
  //console.log(allStackObject, 'allStackObject');
  const authToken = await getItem(AUTH_KEY);
  for (let [key, value] of Object.entries(allStackObject)) {
    const header = getSessionObject[key];
    const body = value;
    //console.log(key, value, 'moni moni', allStackObject);
    //console.log(header, 'header', body, 'body');
    if (header !== undefined && body !== undefined) {
      try {
        //mokey patching on header and body to make as requestable
        const bodyOkay = {
          header: header,
          body: body,
        };
        const headerOkay = {
          AuthorizationToken: authToken,
        };
        const apiResponse = await postStackApiCalling(headerOkay, bodyOkay);
        console.log(apiResponse, 'apiResponseapiResponse');
        setStackAndSessionObjectAfterPost(
          { allStackObject },
          getSessionObject,
          key
        );
        setItem(SCREEN_NO, 0);
      } catch (error) {
        console.log(error, 'errorerror');
      }
    } else {
      setStackAndSessionObjectAfterPost(allStackObject, getSessionObject, key);
      console.log('I am in else state');
    }
  }
};

export const setStackAndSessionObjectAfterPost = (
  allStackObject,
  getSessionObject,
  key
) => {
  if(isNotAnalyticsEnable())
  {
    return;
  }
  try {
    delete allStackObject[key];
    setStackObject(allStackObject);
  } catch (error) {}
  try {
    delete getSessionObject[key];
    setSessionObject(getSessionObject);
  } catch (error) {}
};
