declare global {
  interface Window {
    auth_init: InitDataType;
  }
}

export interface InitDataType {
  userServiceUrl: string;
  mode: string;
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

export interface SignupDataType {
    token: string,
    email: string,
    confirmEmail: string,
    password: string,
    confirmPassword : string,
    firstName: string,
    lastName: string,
    country: string,
    gender: string,
    nationality: string,
    dateOfBirth: string,
    privacyPolicyCheck: boolean
    endUserLicenseAgreementCheck: boolean,
    isDemographics: boolean,
}

export interface LoginDataType {
    token: string,
    email: string,
    password: string,
    privacyPolicyCheck: boolean
    endUserLicenseAgreementCheck: boolean
}

export interface ForgotPasswordDataType {
  token: string;
  email: string;
}

export interface UserProfileDataType {
  userId: number;
  countryOfResidence: string;
  currency: string;
  gender: string;
  pushNotifications: boolean;
  nationality: string;
  mobilePhone: number | null;
  email: string;
  demographicsUpdated: boolean;
  firstName: string;
  lastName: string;
  profileImage: string;
  savings: number;
  dateOfBirth: string;
}

export interface DemographicsDataType {
  token: string;
  nationality: string;
  dateOfBirth: string;
  gender: string;
}
