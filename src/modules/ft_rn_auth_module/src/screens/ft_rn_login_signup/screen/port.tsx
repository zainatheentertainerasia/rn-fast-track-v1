interface datatype {
  email: string;
  activeComponent: string;
  chatEnable: boolean;
  captchaEnable: boolean;
  loadingOverlayActive: boolean;
  countries: Array<country>;
  message: boolean;
  messageType: string;
  messageText: string;
  eula_url: string;
  pp_url: string;
  showForgetPasswordModal: boolean;
  showDoneMessage: boolean;
}

interface country {
  id: number;
  shortname: string;
  name: string;
  position: number;
  is_shukran?: boolean;
}

interface ExternalWebPageData {
  showExternalWebPage: boolean;
  headerText: string;
  externalURL: string;
  getHTMLapi: () => void;
}

interface loginData {
  email: string;
  password: string;
  privacyPolicyCheck: boolean;
  endUserLicenseAgreementCheck: boolean;
}

interface registrationData {
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
  privacyPolicyCheck: Boolean;
  endUserLicenseAgreementCheck: Boolean;
}

interface MessageData {
  message: boolean;
  messageType: string;
  messageText: string;
}

declare type callBacks = {
  onLogin: (data: loginData) => void;
  onRegistration: (data: registrationData) => any;
  onForgotPassword: (email: string) => void;
  onMessage: (data: MessageData) => void;
  changeActiveComponent: (activeComponent: string) => void;
  onClickWebView: (url: string | null, title: string | null) => void;
  pushAnalytics: (
    screenName: string,
    action: string,
    category_id: string,
    categories: string,
    categories_analytics: string,
    location_id: number,
    changeSequenceNumber: boolean
  ) => void;
  showForgetPasswordModalCallback: () => void;
  hideForgetPasswordModalCallback: () => void;
  hideDoneMessageModalCallback: () => void;
  skipModeHanlder: () => void;
};

export declare type Port = {
  data: datatype;
  CallBacks: callBacks;
};
