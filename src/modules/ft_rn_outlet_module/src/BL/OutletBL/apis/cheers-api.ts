import { invokeApi } from './invokeApi';
import { cheersApiResponse } from './responses';
import { cheersParams } from '../Interfaces';


export const getCheersData = async (token: string, params: cheersParams) => {


  let requestObj = {
    path: window.outlet_init.configServiceUrl + 'configs/cheers',
    method: 'GET',
    queryParams: {
      ...params,
    },

    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  const mode = window.outlet_init.mode;
  if (mode === 'test') {
    return cheersApiResponse();
  }

  return invokeApi(requestObj);
};
