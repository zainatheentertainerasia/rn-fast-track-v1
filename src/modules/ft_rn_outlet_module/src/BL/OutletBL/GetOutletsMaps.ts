import {getOutlets, getOutletsMaps} from './apis/outlet-api';
import {
    outletParamsMaps,
    outletItemInterface,
    mapOutletItemInterface,
    outletResposeInterface,
    outletAttributesInterface,
} from './Interfaces';

const GetOutletsWithMaps = async (token: string, params: outletParamsMaps) => {
    try {
        if (token === '') throw new Error('Token not found');
        if(params.language === "") throw new Error('Language not found');
        const outlets = await getOutletsMaps(token, params);

        // dummy fav object your
        const favouriteList = {
            35203: {},
            67: {},
        };
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
): { outlets: mapOutletItemInterface[] } => {
    const outlets: mapOutletItemInterface[] = data.outlets.map((outlet: any) => {
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
                    const type = attribute.type ? attribute.type : '';
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

        let humanLocation = ""
        if (check(outlet.human_location)) {
            humanLocation = outlet.human_location
        }

        let lat = 0
        if (check(outlet.lat)) {
            lat = outlet.lat
        }

        let lng = 0
        if (check(outlet.lng)) {
            lng = outlet.lng
        }

        return {
            latitude: lat,
            longitude: lng,
            merchantId: merchantId,
            outletId: outletId,
            merchantName: merchantName,
            merchantLogo: merchantLogo,
            humanLocation: humanLocation,
            distance: distance,
            favourite: favourite
        };
    });

    return {outlets: outlets};
};

export default GetOutletsWithMaps;
