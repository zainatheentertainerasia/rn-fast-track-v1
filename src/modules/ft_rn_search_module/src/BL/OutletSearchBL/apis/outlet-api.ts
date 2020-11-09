import { invokeApi } from './invokeApi';
import { outletsApiResponse } from './responses';

import {
  outletSearchApiParams,
} from '../Interfaces';


export const outletSearch = async (
  token: string,
  params: outletSearchApiParams
) => {
  try {
    let requestObj = {
      path: window.outlet_search_init.outletServiceUrl,
      queryParams: {
        ...params,
      },

      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    //console.log('requestObj', requestObj);
    const mode = window.outlet_search_init.mode;
    if (mode === 'test') {
      return outletsApiResponse();
    }

    console.log('requestObj search outlet', requestObj);
    return invokeApi(requestObj);
  } catch (error) {
    // console.log('error: ', error);
  }
};
