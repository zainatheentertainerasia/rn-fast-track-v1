import { redemption } from './apis/redemption-api';

interface params {
  offer_id: number;
  outlet_id: number;
  merchant_pin: number;
  platform: string;
  transaction_id: string;
  product_id: number;
  currency: string,
  language:  string
}

interface data {
  offer_id: number;
  outlet_id: number;
  merchant_pin: number;
  product_id: number;
  currency: string,
  language:  string
}

interface redemptionResponse {
  coupon: string;
  redemption_code: string;
  smiles_earned: number;
}

const GetRedemption = async (token: string, data: data) => {
  try {
    const currentDate = new Date();
    const transactionID =
      'Last Sync: ' +
      currentDate.getDate() +
      '/' +
      (currentDate.getMonth() + 1) +
      '/' +
      currentDate.getFullYear() +
      ' @ ' +
      currentDate.getHours() +
      ':' +
      currentDate.getMinutes() +
      ':' +
      currentDate.getSeconds();

    if (token === '') throw new Error('Token not found');
    if( data.language === '')throw new Error('language not found');
    if( data.currency === "") throw new Error('currency not found');

    const params: params = {
      offer_id: data.offer_id,
      outlet_id: data.outlet_id,
      merchant_pin: data.merchant_pin,
      platform: 'ios', //TODO: fetch platform
      transaction_id: transactionID,
      product_id: data.product_id,
      currency: data.currency,
      language: data.language
    }
    const redemptionData = await redemption(token, params);

    console.log(redemptionData,'redemptionData');
    
    const resData = redemptionData.data.referenceNo;
    return {
      coupon: resData.coupon ? resData.coupon : "",
      redemption_code: resData.redemption_code ? resData.redemption_code : "",
      smiles_earned: resData.smiles_earned ? resData.smiles_earned : "",
    };
  } catch (e) {

    throw new Error(e.message);
  }
};

export default GetRedemption;
