declare global {
  interface Window {
    outlet_init: InitDataType;
  }
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
  configServiceUrl: string;
  outletServiceUrl: string;
  mode: string;
}

//tabs interfaces
export interface tabsParams {
  category: string;
  location_id: number;
  language: string;
}

interface tabsParamDataType {
  [name: string]: string;
}

export interface tabInterface {
  uid: string;
  name: string;
  params: tabsParamDataType;
}

export interface tabsInterface {
  limit: number;
  tabs: tabInterface[];
}

//chears interfaces
export interface cheersParams {
  location_id: number;
  language: string
}
export interface cheersRule {
  cheers_logo_url: string;
  product_information: string;
  drinking_age_confirmation_message: string;
  not_interested_in_cheers_offers_message: string;
  error_message_to_select_an_option: string;
}

export interface cheersInterface {
  cheersRules: cheersRule[];
}

// outlet Interfaces

export interface selectedFilter {
  newOffer: boolean;
  selectedType: string;
  selectedCuisine: [];
  selectedAmenities: {};
}

export interface outletAttributesInterface {
  type: string;
  value: string;
}
interface lockedStyleInterface {
  opacity: number;
}
export interface outletItemInterface {
  merchantId: number;
  outletId: number;
  merchantName: string;
  outletName: string;
  merchantLogo: string;
  locked: boolean;
  attributes: outletAttributesInterface[];
  distance: number;
  favourite: boolean;
}

export interface mapOutletItemInterface {
  latitude: number,
  longitude: number,
  merchantId: number,
  outletId: number,
  merchantName: string,
  merchantLogo: string;
  humanLocation: string
  favourite: boolean,
  distance: number;
}

export interface outletResposeInterface {
  outlets: outletItemInterface[];
}

export interface tabParamsInterface {
  [key: string]: string | boolean;
}
// export interface outletParams {
//   is_checked: boolean;
//   user_inclued_cheers: boolean;
//   location_id: number;
//   category: string;
//   ofset: number;
//   lat: number;
//   lng: number;
//   show_new_offers: boolean;
//   sub_category_filter: string;
//   cuisine_filter: string;
//   filters_selected_for_yes: Array<string>;
//   filters_selected_for_no: Array<string>;
//   language: string;
//   tabsParams: tabParamsInterface;
// }

export interface outletParams {
  location_id: number;
  category: string;
  offset: number;
  user_include_cheers: boolean;
  lat: number;
  lng: number;
  show_new_offers?: boolean;
  sub_category_filter?: string;
  cuisine_filter?: Array<string>;
  filters_selected_for_yes?: Array<string>;
  filters_selected_for_no?: Array<string>;
  language: string;
  tabsParams: tabParamsInterface;
}

export interface outletParamsMaps {
  location_id: number;
  category: string;
  user_include_cheers: boolean;
  radius: number;
  lat: number;
  lng: number;
  language: string;
  show_new_offers?: boolean;
  sub_category_filter?: string;
  cuisine_filter?: Array<string>;
  filters_selected_for_yes?: Array<string>;
  filters_selected_for_no?: Array<string>;
  tabsParams: tabParamsInterface;
}

export interface outletSearchApiParams {
  location_id: number;
  category: string;
  query: string;
  query_type: string;
  ofset: number;
  user_inclued_cheers: boolean;
  sub_category_filter: string;
  cuisine_filter: string;
  language: string;
  filters_selected_for_yes: Array<string>;
  filters_selected_for_no: Array<string>;
}

interface MapOutletDataType {
  latitude: number;
  longitude: number;
  merchantId: number;
  outletId: number;
  merchantName: string;
  merchantLogo: string;
  humanLocation: string;
  favourite: boolean;
  distance: number;
}

export interface outletMapsResposeInterface {
  outlets: MapOutletDataType[];
}
