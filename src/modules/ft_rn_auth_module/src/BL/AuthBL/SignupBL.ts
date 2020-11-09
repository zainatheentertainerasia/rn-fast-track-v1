import { signUpUserApi } from './apis';
import { SignupDataType } from './Interfaces';
import emailValidation from './EmailValidation';
import { first } from 'lodash';
import { Alert } from 'react-native';

const STRINGS = {
  tokenCheck: 'Token not found.',
  sessionTokenCheck: 'Session Token not found.',
  allCheck: 'Please fill in all the required fields.',
  emailCheck: 'Please enter a valid email!',
  confirmEmailError: 'Email and confirm email do not match. Please enter the same email.',
  passwordCheck:
    'Password and confirm password do not match. Please enter the same password.',
  passwordValidation: 'Please enter atleast 6 characters for password',
  privacyPolicyCheckString: 'Please review & accept the Privacy Policy',
  endUserLicenseAgreementCheckString:
    'Please review & accept the End User License Agreement.',
};

const SignupBL = async (data: SignupDataType) => {
  try {
    const {
      token,
      email,
      password,
      confirmPassword,
      country,
      firstName,
      lastName,
      endUserLicenseAgreementCheck,
      privacyPolicyCheck,
      confirmEmail,
      isDemographics,
    } = data;
    
    if (token == null || token == '') {
      throw { messageType: 'tokenError', messageText: STRINGS.tokenCheck };
    }
    if (
      email == null ||
      email == '' ||
      password == null ||
      password == '' ||
      confirmPassword == null ||
      confirmPassword == '' ||
      country == null ||
      country == ''
    ) {
      throw { messageType: 'emptyFields', messageText: STRINGS.allCheck };
    }

    if (!emailValidation(email)) {
      throw {
        messageType: 'invalidEmailError',
        messageText: STRINGS.emailCheck,
      };
    }

    if (isDemographics) {
      if (confirmEmail != email) {
        throw {
          messageType: 'confirmEmailError',
          messageText: STRINGS.confirmEmailError
        }
      }
      if (
        firstName == '' ||
        firstName == null ||
        lastName == '' ||
        lastName == null
      ) throw { messageType: 'emptyFields', messageText: STRINGS.allCheck }
    }

    if (password.length < 6) {
      throw {
        messageType: 'passwordError',
        messageText: STRINGS.passwordValidation,
      };
    }

    if (password !== confirmPassword) {
      throw {
        messageType: 'passwordError',
        messageText: STRINGS.passwordCheck,
      };
    }

    if (!privacyPolicyCheck) {
      throw {
        messageType: 'privacyPolicyError',
        messageText: STRINGS.privacyPolicyCheckString,
      };
    }

    if (!endUserLicenseAgreementCheck) {
      throw {
        messageType: 'endUserLicenseAgreementError',
        messageText: STRINGS.endUserLicenseAgreementCheckString,
      };
    }

    console.log('API_DATA', data);
    const signUpResult = await signUpUserApi(data);

    const sessionToken = signUpResult.data.session_token;

    if (
      sessionToken === undefined ||
      sessionToken === null ||
      sessionToken === ''
    )
      throw {
        messageType: 'sessionTokenError',
        messageText: STRINGS.sessionTokenCheck,
      };

    return sessionToken;
  } catch (e) {
    console.log('r: ', e);
    throw e;
  }
};

export default SignupBL;
