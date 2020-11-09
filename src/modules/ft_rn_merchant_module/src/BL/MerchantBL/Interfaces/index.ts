declare global {
  interface Window {
    initMerchant: InitDataType;
  }
}

export interface attribute {
  image_url: string;
  name: string;
}
export interface merchantAttributes {
  attributes: attribute[];
  section_name: string;
}

export interface merchantName {
  name: string;
}

export interface bannersInterface {
  banners: string[];
}

export interface additionalDetails {
  color: string;
  image: string;
  title: string;
}

export interface offers_to_display {
  name: string;
  voucher_type_image: string;
  additional_details: additionalDetails[];
  locationValid: boolean;
}

export interface OfferAdditionalDetails extends OfferDetails {
  color: string;
}

export interface OfferDetails {
  title: string;
  image: string;
}

export interface productOffer {
  voucher_type_image: string;
  name: string;
  additional_details: OfferAdditionalDetails[];
  voucher_details: OfferDetails[];
  outlet_ids: number[];
  redeemability: number;
  offer_id: number;
  savings_estimate: number;
  validity_date: string;
  sub_detail_label: string;
  details: string | null;

  // voucherImage: string;
  // offerName: string;
  // additionalDetails: string;
  // outletIds: number[];
  // redeamOfferStyle: string;
}

export interface RequestObjectDataType {
  path: string;
  method: string;
  headers: HeaderDataType;
  postData?: object;
}

interface HeaderDataType {
  Authorization: string;
}

export interface InitDataType {
  merchantServiceUrl: string;
  redemptionServiceUrl: string;
  mode: string;
}

export interface redemptionDataParams {
  offer_id: number;
  outlet_id: number;
  merchant_pin: number;
  product_id: number;
}

export interface outletInterface {
  id: number;
  name: string;
  telephone: string;
  email: string;
  lat: number;
  lng: number;
  mall: string;
  area: string;
  location: string;
  distance: string;
  neighborhood: string;
  merlin_url: string;
  description: string;
  human_location: string;
}

export interface MerchantData {
  id: number;
  name: string;
  description: string;
  logo_small_url: string;
  hero_urls: string[];
  offers: productOffer[];
  merchant_attributes: merchantAttributes[];
  outlets: outletInterface[];
}

export interface merchantDataResponse {
  selectedOutlet: outletInterface;
  merchantData: MerchantData;
}
