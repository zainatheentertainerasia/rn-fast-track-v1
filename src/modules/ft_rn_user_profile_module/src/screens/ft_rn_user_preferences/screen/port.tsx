interface datatype {
  user: userDataType;
  loadingOverlayActive: boolean;
  showDoneMessage: boolean;
  errorText: string;
  error: boolean;
  helpAndChatURL: string;
  rulesOfUserURL: string;
  ppURL: string;
  eulaURL: string;
  appVersion: string;
  travel_key:boolean;
  hotelRulesOfuse:string;
}

interface userDataType {
  userId: number;
  countryOfResidence: string;
  currency: string;
  gender: string;
  pushNotifications: boolean;
  nationality: string;
  mobilePhone: string | null;
  email: string;
  demographicsUpdated: boolean;
  firstName: string;
  lastName: string;
  profileImage: string;
  dateOfBirth: string;
}

interface ErrorData {
  error: boolean;
  message: string;
}

interface UpdateUserDataType {
  countryOfResidence: string;
  mobilePhone: string;
  currency: string;
  pushNotifications: boolean;
}

interface forgotPasswordReturnDataType {
  doneMessage: string;
  showDoneMessgae: boolean;
}

interface callBacks {
  onBack: () => void;
  onUpdate: (data: UpdateUserDataType) => Promise<boolean>;
  onError: (data: ErrorData) => void;
  getExternalWebPageHTML: (data: string) => void;
  logout: () => void;
  forgotPassword: () => Promise<forgotPasswordReturnDataType>;
  onSavingHistoryClick: () => void;
  onRedemptionHistoryClick: () => void;
  hideEdit?: () => void;
  hideError?: () => void;
  pushAnalytics: (data: any) => void;
  updateCountryOfResidency:(country: string) => void;
  updateMobileNumber:(mobileNumber: string) => void;
  updateCurrencyPreference:(currency:string)=>void;
}

export interface Port {
  data: datatype;
  CallBacks: callBacks;
}
