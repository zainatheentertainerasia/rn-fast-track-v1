import { invokeApi } from '../apis/invokeApi';
import { merchantByIdApiResponse } from './responses';

interface params {
  location_id: number;
  lat: number;
  lng: number;
}

export const merchantById = async (
  token: string,
  merchantId: number,
  params: params
) => {

  let requestObj = {
    path: window.initMerchant.merchantServiceUrl + merchantId,
    method: 'GET',
    queryParams: {
      ...params,
    },

    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  if (window.initMerchant.mode === 'test') {
    return merchantByIdApiResponse();
  }

  return invokeApi(requestObj);
};
