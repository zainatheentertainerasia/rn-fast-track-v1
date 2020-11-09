import { merchantById } from './apis/merchant-api';
import {
  MerchantData,
  productOffer,
  offers_to_display,
  additionalDetails,
  merchantAttributes,
  attribute,
  outletInterface,
  OfferDetails,
} from './Interfaces/index';

interface params {
  location_id: number;
  lat: number;
  lng: number;
  currency: string;
  language: string;
}

const GetMerchantById = async (
  token: string,
  merchantId: number,
  outletId: number,
  params: params
) => {
  try {
    if (token === '') throw new Error('Token not found');
    if (params.currency === '') throw new Error('Currency not found');
    if (!params.language || params.language === '')
      throw new Error('Language not found');


    const merchant = await merchantById(token, merchantId, params);

    console.log('merchant:DAta',merchant)
    const website = merchant.data.website;
    const menu = merchant.data.pdf_url;
    console.log(merchant, 'raw');
    const merchantData = transformData(merchant.data, params.currency);
    let selectedOutlet = {};
    merchantData.outlets.forEach((outlet) => {
      if (outlet.id === parseInt(outletId.toString(), 10)) {
        // console.log(outlet.distance, typeof outlet.distance, 'there there');
        // let outletDistance: string = '';
        // let dis = parseInt(outlet.distance.toString(), 10);
        // if (dis >= 1000) {
        //   outletDistance = Math.round(dis / 1000) + 'km';
        // } else {
        //   outletDistance = outlet.distance + 'm';
        // }
        selectedOutlet = {
          lat: outlet.lat,
          neighborhood: outlet.neighborhood,
          mall: outlet.mall,
          name: outlet.name,
          id: outlet.id,
          lng: outlet.lng,
          human_location: outlet.human_location,
          distance: outlet.distance,
          telephone: outlet.telephone,
        };
      }
    });

    return {
      selectedOutlet: selectedOutlet,
      merchant: merchantData,
      website: website,
      menu: menu,
    };
    //const userProfile = UserModelMapper(userResult.data);
  } catch (e) {
    throw new Error(e.message);
  }
};

const transformData = (data: any, currency: string): MerchantData => {
  //product offer is nested object thats why when
  //we to transformData we have to fetch nested data
  const productOffers: productOffer[] = data.offers.map((offer: any) => {
    const product_id = offer.product_id ? offer.product_id : 0;
    const section_name = offer.section_name ? offer.section_name : ''; //section name i

    //its a array of offers obejcts to display offers on screen on screens
    const offersToDisplay: offers_to_display[] = offer.offers_to_display.map(
      (displayOffer: any) => {
        const offer_id = displayOffer.offer_id ? displayOffer.offer_id : 0;
        const details = displayOffer.details ? displayOffer.details : '';
        const name = displayOffer.name ? displayOffer.name : '';
        const voucher_type_image = displayOffer.voucher_type_image
          ? displayOffer.voucher_type_image
          : '';
        const savings_estimate = displayOffer.savings_estimate
          ? currency + ' ' + displayOffer.savings_estimate
          : currency + ' ';
        const redeemability = displayOffer.redeemability
          ? displayOffer.redeemability
          : '';
        const validity_date = displayOffer.validity_date
          ? displayOffer.validity_date
          : '';
        const outlet_ids = displayOffer.outlet_ids
          ? displayOffer.outlet_ids
          : [];
        const sub_detail_label = displayOffer.sub_detail_label
          ? displayOffer.sub_detail_label
          : '';
        //addtional detains is array of objects
        const additionalDetails: additionalDetails[] = displayOffer.additional_details.map(
          (detail: any) => {
            const color = detail.color ? detail.color : '';
            const image = detail.image ? detail.image : '';
            const title = detail.title ? detail.title : '';
            return {
              color: color,
              image: image,
              title: title,
            };
          }
        );

        const voucher_details: OfferDetails[] = displayOffer.voucher_details.map(
          (vdetail: any) => {
            return {
              title: vdetail.title ? vdetail.title : '',
              image: vdetail.image ? vdetail.image : '',
            };
          }
        );
        return {
          offer_id: offer_id,
          details: details,
          name: name,
          savings_estimate: savings_estimate,
          redeemability: redeemability,
          validity_date: validity_date,
          outlet_ids: outlet_ids,
          voucher_type_image: voucher_type_image,
          additional_details: additionalDetails,
          sub_detail_label: sub_detail_label,
          voucher_details: voucher_details,
        };
      }
    );
    return {
      product_id: product_id,
      section_name: section_name,
      offers_to_display: offersToDisplay,
    };
  });

  const amenities: merchantAttributes[] = data.merchant_attributes.map(
    (merchantAttributesData: any) => {
      const attributes: attribute[] = merchantAttributesData.attributes.map(
        (attribute: any) => {
          return {
            image_url: attribute.image_url ? attribute.image_url : '',
            name: attribute.name ? attribute.name : '',
          };
        }
      );
      const sectionName: string = merchantAttributesData.section_name
        ? merchantAttributesData.section_name
        : '';

      return {
        attributes: attributes,
        section_name: sectionName,
      };
    }
  );

  const outletsArray: outletInterface[] = data.outlets.map((outlet: any) => {
    let dis = outlet.distance;
    let okayDistance = '';
    if (dis >= 1000) {
      okayDistance = Math.round(dis / 1000) + 'km';
    } else {
      okayDistance = outlet.distance + 'm';
    }
    outlet.distance = okayDistance;
    return outlet;
  });

  const description: string = data.description ? data.description : '';
  return {
    id: data.id,
    name: data.name,
    logo_small_url: data.logo_small_url,
    hero_urls: data.hero_urls,
    offers: productOffers,
    description: description,
    merchant_attributes: amenities,
    outlets: outletsArray,
  };
};

export default GetMerchantById;
