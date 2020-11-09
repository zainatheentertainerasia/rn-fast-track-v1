import { getOutlets } from './apis/outlet-api';
import {
  outletParams,
  outletItemInterface,
  outletResposeInterface,
  outletAttributesInterface,
} from './Interfaces';

const GetOutlets = async (token: string, params: outletParams, favouriteList: any) => {
  try {
    if (token === '') throw new Error('Token not found');
    if(params.language === "") throw new Error('Language not found');

    const tabParams = params['tabsParams'];

    delete params['tabsParams'];
    const data = {
      ...params,
      ...tabParams,
    };

    const outlets = await getOutlets(token, data);

    // dummy fav object your
    // const favouriteList = {
    //   35203: {},
    //   67: {},
    // };
    return transformData(outlets.data, favouriteList);
    //return redemptionData;
  } catch (e) {
    throw new Error(e.message);
  }
};

const check = (x: any) => {
  if (x != null && x !== '') {
    return true;
  }

  return false;
};

const transformData = (
  data: any,
  favouriteList: any
): outletResposeInterface => {
  const outlets: outletItemInterface[] = data.outlets.map((outlet: any) => {
    let merchantName = '';
    let locked = false;

    if (check(outlet.merchant_name)) {
      merchantName = outlet.merchant_name;
    } else if (check(outlet.merchant.name)) {
      merchantName = outlet.merchant.name;
    }

    const merchantId =
      check(outlet.merchant.id) === true ? outlet.merchant.id : 0;
    const outletId = check(outlet.id) === true ? outlet.id : 0;
    const outletName = check(outlet.name) === true ? outlet.name : '';
    const merchantLogo =
      check(outlet.merchant.logo_url) === true ? outlet.merchant.logo_url : '';

    const attributes: outletAttributesInterface[] =
      check(outlet.attributes) === true
        ? outlet.attributes.map((attribute: any) => {
            const type = attribute.type ? attribute.type : "";
            const value = attribute.value ? attribute.value : "";
            return {
              type: type,
              value: value,
            };
          })
        : null;

    let favourite = false;

    if (favouriteList[outlet.merchant.id]) {
      favourite = true;
    }

    const distance =
      outlet.distance >= 1000
        ? Math.round(outlet.distance / 1000) + 'km'
        : outlet.distance + 'm';

    if (
      check(outlet.top_offer_redeemability) &&
      outlet.top_offer_redeemability === 0
    ) {
      locked = true;
    }

    return {
      outletId: outletId,
      merchantId: merchantId,
      merchantName: merchantName,
      outletName: outletName,
      merchantLogo: merchantLogo,
      attributes: attributes,
      distance: distance,
      locked: locked,
      favourite: favourite,
    };
  });

  return { outlets: outlets };
};

export default GetOutlets;
