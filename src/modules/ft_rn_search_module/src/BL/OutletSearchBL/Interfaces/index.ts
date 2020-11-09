declare global {
  interface Window {
    outlet_search_init: InitDataType;
  }
}

export interface InitDataType {
  configServiceUrl: string;
  outletServiceUrl: string;
  mode: string;
}

export interface outletAttributesInterface {
  type: string;
  value: string;
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

export interface outletResposeInterface {
  outlets: outletItemInterface[];
}

export interface outletSearchApiParams {
  location_id: number;
  category?: string;
  query: string;
  query_type: string;
  offset: number;
  language: string;
  show_new_offers?: boolean;
  sub_category_filter?: string;
  cuisine_filter?: Array<string>;
  filters_selected_for_yes?: Array<string>;
  filters_selected_for_no?: Array<string>;
  lat: number;
  lng: number;
}
