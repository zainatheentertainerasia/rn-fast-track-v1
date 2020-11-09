import {loginUserApi} from './apis';
import {LoginDataType} from './Interfaces';
import emailValidation from "./EmailValidation";

const STRINGS = {
    tokenCheck: 'Token not found',
    sessionTokenCheck: 'Session Token not found',
    allCheck: 'Please fill in all the required fields',
    emailCheck: 'Please enter a valid email!',
    passwordCheck: 'Please enter a password!',
    privacyPolicyCheckString: 'Please review & accept the Privacy Policy',
    endUserLicenseAgreementCheckString:
        'Please review & accept the End User License Agreement.',
};

const LoginBL = async (data: LoginDataType) => {
    try {
        const {token, email, password, endUserLicenseAgreementCheck, privacyPolicyCheck,} = data;

        if (token == null || token == "" ) {
            throw ({ messageType: "tokenError", messageText: STRINGS.tokenCheck })
        }


        //form validation
        // if (
        //     email === '' &&
        //     password === '' &&
        //     endUserLicenseAgreementCheck === false &&
        //     privacyPolicyCheck === false
        // ) {
        //     throw new Error(STRINGS.allCheck);
        // } else if (
        //     email !== '' &&
        //     password !== '' &&
        //     privacyPolicyCheck === false
        // ) {
        //     throw new Error(STRINGS.privacyPolicyCheckString);
        // } else if (
        //     email !== '' &&
        //     password !== '' &&
        //     privacyPolicyCheck === true &&
        //     endUserLicenseAgreementCheck === false
        // ) {
        //     throw new Error(STRINGS.endUserLicenseAgreementCheckString);
        // } else if (email === '' && endUserLicenseAgreementCheck === true) {
        //     throw new Error(STRINGS.emailCheck);
        // } else if (email === '' && privacyPolicyCheck === false) {
        //     throw new Error(STRINGS.emailCheck);
        // } else if (email === '') {
        //     throw new Error(STRINGS.emailCheck);
        // }
        if (email == null || email == "" || !emailValidation(email)) {
            throw ({ messageType: "invalidEmailError", messageText: STRINGS.emailCheck})
        }

        if (password == null || password == "") {
            throw ({ messageType: "passwordError", messageText: STRINGS.passwordCheck })
        }

        if (!privacyPolicyCheck) {
            throw ({ messageType: "privacyPolicyError", messageText: STRINGS.privacyPolicyCheckString })
        }

        if (!endUserLicenseAgreementCheck) {
            throw ({ messageType: "endUserLicenseAgreementError", messageText: STRINGS.endUserLicenseAgreementCheckString })
        }


        console.log(data,'in login bL- data')

        const loginResult = await loginUserApi(data);
        console.log(loginResult);
        const sessionToken = loginResult.data.session_token;

        if (
            sessionToken === undefined ||
            sessionToken === null ||
            sessionToken === ''
        )
            throw ({ messageType: "sessionTokenError", messageText: STRINGS.sessionTokenCheck })

        return sessionToken;

    } catch (e) {
        throw (e)
    }
};

export default LoginBL;
