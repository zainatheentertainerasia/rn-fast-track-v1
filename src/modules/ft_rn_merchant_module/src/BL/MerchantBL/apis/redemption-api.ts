import { invokeApi } from '../apis/invokeApi';
import { redemptionApiResponse } from './responses';



export const redemption = (token: string, params: any) => {
  let requestObj = {
    path: window.initMerchant.redemptionServiceUrl + 'offer/redeem',
    method: 'POST',
    postData: {
      ...params,
    },
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  if (window.initMerchant.mode === 'test') {
    return redemptionApiResponse();
  }

  return invokeApi(requestObj);
};
