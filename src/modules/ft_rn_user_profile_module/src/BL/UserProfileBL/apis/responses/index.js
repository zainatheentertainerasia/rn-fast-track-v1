import userProfile from './userProfile.json';
import userProfileImage from './userProfileImage.json';
import update from './update.json';
import logOut from './logout.json';
import ForgotPassword from './forgot.json';
import UserSaving from './userSaving.json';



export const updateUserApiResponse = () => {
	return update;
};

export const updateUserProfileImageApiResponse = () => {
	return update;
};

export const userProfileApiResponse = () => {
	return userProfileImage;
};

export const logOutApiResponse = () => {
	return logOut;
};

export const forgotPasswordApiResponse = () =>{ 

    return ForgotPassword

}

export const userSavingApiResponse = () =>{ 

    return UserSaving

}




