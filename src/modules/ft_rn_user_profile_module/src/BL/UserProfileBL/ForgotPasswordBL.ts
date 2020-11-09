import { forgotPasswordApi } from './apis';
import {ForgotPasswordDataType} from "./Interfaces";


const ForgotPasswordBL = async (data: ForgotPasswordDataType) => {

    try{

        if (data.token == null || data.token == "" ) {
            throw new Error('Token not found');
        }

        if (data.email == null || data.email == "") {
            throw new Error('Email not found');
        }

        if(data.language == null || data.language == ""){
            throw new Error('language not found');
        }


        const forgotResult = await forgotPasswordApi(data)

        const message = forgotResult.data.message ? forgotResult.data.message : ""

        return message

    }catch (e) {
        throw new Error(e.message);
    }


};

export default  ForgotPasswordBL
