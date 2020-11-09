import { updateUserApi } from './apis';
import {UserUpdateDataType} from "./Interfaces";


const UpdateUserProfile = async (data: UserUpdateDataType) => {

    try{

        if(data.token === "" || data.token === null)  throw new Error("Token not found");
        if(data.currency === "" || data.currency === null)  throw new Error("currency not found");
        if(data.countryOfResidence === "" || data.countryOfResidence === null)  throw new Error("countryOfResidence not found");
        if(data.language === "" || data.language === null)throw new Error("language not found");


        const updateResult = await updateUserApi(data)

        const message = updateResult.message ? updateResult.message : ""

        return message

    }catch (e) {
        throw new Error(e.message);
    }


};

export default  UpdateUserProfile
