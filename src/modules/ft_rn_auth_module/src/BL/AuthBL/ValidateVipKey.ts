import { ValidateVipKeyApi } from './apis';


const ValidateVipKey = async (token: string,vipKey:string) => {
    try{
        if(token === "")  throw new Error("token not found");
        if(vipKey === "")  throw new Error("Key not found");

        const body={
            key:vipKey
        }
        const ValidateKeyResponse  = await  ValidateVipKeyApi(token,body)
        console.log(ValidateKeyResponse,"ValidateKeyResponseValidateKeyResponse")
        return ValidateKeyResponse
    }catch (error) {
        throw new Error(error.message);
        }
}

export default ValidateVipKey