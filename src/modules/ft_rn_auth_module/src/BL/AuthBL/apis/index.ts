import { invokeApi } from './invokeApi';
import {
  updateUserApiResponse,
  getUserProfileApiResponse,
  signUpUserApiResponse,
  signInUserApiResponse,
  forgotPasswordApiResponse,
  ValidateVipKeyResponse
} from './responses';
import {
  RequestObjectDataType,
  SignupDataType,
  LoginDataType,
  ForgotPasswordDataType,
  DemographicsDataType,
} from '../Interfaces';
import {getVIPKey} from '../getVIP'

export const signUpUserApi = async (data: SignupDataType) => {
  let keyObject={};
  const _vipKey= await getVIPKey();
  console.log(_vipKey,'VIP Key')
  if(_vipKey)
  {
    keyObject={
      key:_vipKey
    }
  }

  if(data.captcha_token){
    keyObject['captcha_token'] = data.captcha_token
  }

  const postData = {
    email: data.email,
    password: data.password,
    confirm_password: data.confirmPassword,
    country_of_residence: data.country,
    firstname: data.firstName,
    lastname: data.lastName,
    terms_acceptance: data.endUserLicenseAgreementCheck && data.privacyPolicyCheck,
    platform: data.platform,
    gender: data.gender,
    date_of_birth: data.dateOfBirth,
    nationality: data.nationality,

    ...keyObject
  };

  let requestObj: RequestObjectDataType = {
    path: 'signup',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + data.token,
    },
    postData: postData,
  };

  console.log("requestObj: ",requestObj)

  let mode = 'live';
  console.warn(mode, 'mode');
  if (mode === 'test') {
    return signUpUserApiResponse();
  }
  return invokeApi(requestObj);
};

export const loginUserApi = async (data: LoginDataType) => {
  let keyObject={};
  const _vipKey=await getVIPKey();
  if(_vipKey)
  {
    keyObject={
      key:_vipKey
    }
  }
  if(data.captcha_token){
    keyObject['captcha_token'] = data.captcha_token
  }

  const postData = {
    email: data.email,
    password: data.password,
    is_privacy_policy_accepted: data.privacyPolicyCheck,
    is_user_agreement_accepted: data.endUserLicenseAgreementCheck,
    platform: data.platform,
      ...keyObject
  };

  let requestObj: RequestObjectDataType = {
    path: 'login',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + data.token,
    },
    postData: postData,
  };

  // const mode = apiInfo.mode;
  const mode = window.auth_init?.mode;
  if (mode === 'test') {
    return signInUserApiResponse();
  }

  return invokeApi(requestObj);
};

export const forgotPasswordApi = (data: ForgotPasswordDataType) => {
  const postData = {
    email: data.email,
  };

  let requestObj: RequestObjectDataType = {
    path: 'password/reset',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + data.token,
    },
    postData: postData,
  };

  const mode = window.auth_init?.mode;

  if (mode === 'test') {
    return forgotPasswordApiResponse();
  }

  return invokeApi(requestObj);
};

export const updateDemographicApi = (data: DemographicsDataType) => {
  const postData = {
    nationality: data.nationality,
    date_of_birth: data.dateOfBirth,
    gender: data.gender,
  };

  let requestObj: RequestObjectDataType = {
    path: 'profile',
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + data.token,
    },
    postData: postData,
  };
  const mode = window.auth_init?.mode;

  if (mode === 'test') {
    return updateUserApiResponse();
  }
  return invokeApi(requestObj);
};

export const getUserProfileApi = async (token: string) => {
  let requestObj: RequestObjectDataType = {
    path: 'profile',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  // const mode = apiInfo.mode;
  const mode = window.auth_init?.mode;

  if (mode === 'test') {
    return getUserProfileApiResponse();
  }

  return invokeApi(requestObj);
};


export const ValidateVipKeyApi = async (token: string,body) => {
  let requestObj: RequestObjectDataType = {
    path: 'validates',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };
  requestObj['postData'] = body;
  // const mode = apiInfo.mode;
  const mode = window.auth_init?.mode;

  if (mode === 'test') {
    return ValidateVipKeyResponse();
  }

  return invokeApi(requestObj);
};
