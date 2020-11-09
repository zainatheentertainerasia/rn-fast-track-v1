import { invokeApi } from '../libs/invokeApi';
import { ConfigsApiResponse } from './responses';
import apiInfo from './info.json';

const mode = apiInfo.mode;

export const testAPI = () => {
  let requestObj = {
    method: 'GET',
    path: 'http://localhost:3030/api/1',
    headers: {},
  };

  if (mode === 'test') {
    return {
      data: {
        web_page_response: '<h1>TEST</h1>',
      },
    };
  }

  return invokeApi(requestObj);
};

export const configs = (token) => {
  let requestObj = {
    path: 'https://apiutb2bcnfsrvrpy.theentertainerme.com/api_ets/v2/configs',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  console.log('requestObj', requestObj);

  if (mode === 'test') {
    return ConfigsApiResponse();
  }

  return invokeApi(requestObj);
};
