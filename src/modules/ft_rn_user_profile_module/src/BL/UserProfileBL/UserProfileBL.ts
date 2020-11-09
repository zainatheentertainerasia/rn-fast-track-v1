import { getUserProfileApi } from './apis';
import UserModelMapper from "./UserModelMapper";


const UserProfileBL = async (token: string, language: string, currency: string) => {
    try{
        if(token === "" || token === null)  throw new Error("Token not found");
        if(language === "" || language === null)  throw new Error("language not found");
        if(currency === "" || currency === null)  throw new Error("currency not found");

        const userResult  = await  getUserProfileApi(token,language,currency)

        const userProfile  = UserModelMapper(userResult.data)

        return userProfile
    }catch (e) {
        throw new Error(e.message);
    }
}

export  default UserProfileBL