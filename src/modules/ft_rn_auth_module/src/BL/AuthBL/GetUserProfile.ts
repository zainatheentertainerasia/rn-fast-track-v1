import { getUserProfileApi } from './apis';
import UserModelMapper from "./UserModelMapper";


const GetUserProfile = async (token: string) => {
    try{
        if(token === "")  throw new Error("Token not found");

        const userResult  = await  getUserProfileApi(token)

        const userProfile  = UserModelMapper(userResult.data)

        return userProfile
    }catch (e) {

    }
}

export  default GetUserProfile