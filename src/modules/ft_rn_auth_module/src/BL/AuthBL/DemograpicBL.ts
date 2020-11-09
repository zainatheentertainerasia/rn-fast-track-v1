import { signUpUserApi,getUserProfileApi } from './apis';
import { SignupDataType,UserProfileDataType } from './Interfaces'
import UserModelMapper from './UserModelMapper'


const SignupBL = async (data: SignupDataType) => {

    try{
        if(data.token === "")  throw new Error("Token not found");
        if(data.email === "")  throw new Error("Email not found");
        if(data.password === "")  throw new Error("Password not found");
        if(data.confirmPassword === "")  throw new Error("confirmPassword not found");
        if(data.country === "")  throw new Error("country not found");


        const loginResult = await signUpUserApi(data)

        const sessionToken = loginResult.data.session_token

        if(sessionToken === undefined || sessionToken === null || sessionToken==="")  throw new Error("Session Token not found");

        return sessionToken

        // const userResult  = await  getUserProfileApi(sessionToken)
        //
        // const userProfile  = UserModelMapper(userResult.data)
        //
        // return userProfile

    }catch (e) {
        throw new Error(e.message);
    }


};

export default  SignupBL
