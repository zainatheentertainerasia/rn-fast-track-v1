import { updateUserProfileImageApi } from './apis';
import {userProfileImage} from "./Interfaces";


const UpateUserProfilemage = async (data: userProfileImage) => {

    try{

        if(data.token === "" || data.token === null)  throw new Error("Token not found");
        if(!data.profile_image)  throw new Error("image not found");

        const form_data=new FormData();
        form_data.append('profile_image',data.profile_image);

        const updateResult = await updateUserProfileImageApi(form_data,data.token)

        const message = updateResult.message ? updateResult.message : ""

        return message

    }catch (e) {
        throw new Error(e.message);
    }


};

export default  UpateUserProfilemage;
