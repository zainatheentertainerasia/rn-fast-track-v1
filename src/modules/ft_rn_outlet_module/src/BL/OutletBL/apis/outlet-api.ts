import { invokeApi } from './invokeApi';
import { outletsApiResponse } from './responses';

import {
  outletParams,
  outletParamsMaps,
  outletSearchApiParams,
} from '../Interfaces';



export const getOutlets = async (token: string, params: outletParams) => {
  try {
    let requestObj = {
      path: window.outlet_init.outletServiceUrl,
      queryParams: {
        ...params,
      },

      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };



    const mode = window.outlet_init.mode;

    if (mode === 'test') {
      return outletsApiResponse();
    }

    return invokeApi(requestObj);
  } catch (error) {
    // //console.log('error: ', error);
  }
};

export const getOutletsMaps = async (
  token: string,
  params: outletParamsMaps
) => {
  try {
    let requestObj = {
      path: window.outlet_init.outletServiceUrl,
      queryParams: {
        ...params,
      },

      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };


    const mode = window.outlet_init.mode;
    if (mode === 'test') {
      return outletsApiResponse();
    }

    return invokeApi(requestObj);
  } catch (error) {
    console.log('error: ', error);
  }
};

export const outletSearch = async (
  token: string,
  params: outletSearchApiParams
) => {
  try {
    let requestObj = {
      path: window.outlet_init.outletServiceUrl,
      queryParams: {
        ...params,
      },

      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };


    const mode = window.outlet_init.mode;
    if (mode === 'test') {
      return outletsApiResponse();
    }

    return invokeApi(requestObj);
  } catch (error) {
    console.log('error: ', error);
  }
};
