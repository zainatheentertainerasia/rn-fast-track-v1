import { invokeApi } from './invokeApi';
import { tabsApiResponse } from './responses';
import { tabsParams } from '../Interfaces';
import apiInfo from './info.json';


export const getTabs = async (token: string, params: tabsParams) => {

  let requestObj = {
    path: window.outlet_init.configServiceUrl + 'app/tabs',
    method: 'GET',
    queryParams: {
      ...params,
    },

    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  console.log(requestObj,'fasdfasf');
  const mode = window.outlet_init.mode;
  if (mode === 'test') {
    return tabsApiResponse();
  }

  return invokeApi(requestObj);
};
