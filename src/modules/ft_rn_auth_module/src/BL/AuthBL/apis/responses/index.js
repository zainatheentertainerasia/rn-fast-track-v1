import SignUp from './sign-up'
import SignIn from './sign-in'
import UserProfile from './user-profile'
import ForgotPassword from './forgot.json';
import update from './update.json';
import validateKey from './validate-Key.json';





export const signUpUserApiResponse = () =>{ 

    return SignUp

};

export const signInUserApiResponse = () =>{ 

    return SignIn

};

export const getUserProfileApiResponse = () =>{ 

    return UserProfile

};

export const forgotPasswordApiResponse = () =>{ 

    return ForgotPassword

};

export const updateUserApiResponse = () => {
	return update;
};


export const ValidateVipKeyResponse = () => {
	return validateKey;
};


