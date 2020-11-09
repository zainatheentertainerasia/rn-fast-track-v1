declare global {
  interface Window {
    home_init: InitDataType;
  }
}

export interface InitDataType {
    homeServiceUrl: string,
    configServiceUrl: string,
    mode: string,
}

export interface RequestObjectDataType {
  path: string;
  method: string;
  headers: HeaderDataType;
  postData?: object;
  queryParams?: object;
}

interface HeaderDataType {
  Authorization: string;
}

export interface HomeAPIdataType {
  token: string;
  locationID: number;
  currency: string;
  language: string;
}

export interface HomeSectionsDataType {
  sectionIdentifier: string;
  data: Array<mainCover | category | featured>;
}

export interface mainCover {
  tileIdentifier: string;
  data: messagingTile | savingsTile;
}

interface messagingTile {
  messages: string[];
  mainTopImage: string;
}

interface savingsTile {
  savingThisYear: number;
  offersUsed: number;
}

export interface category {
  displayName: string;
  apiName: string;
  image: string;
  analytics_category_name: string;
  category_id: number;
  pinUrl:string
}

export interface featured {
  deepLink: string;
  image: string;
  title: string;
  entity_id: number;
}

export interface locationDataType {
    id: number,
    name: string,
    flag: string,
    lat: number,
    lng: number,
}

