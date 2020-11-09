import { logOutApi} from './apis';


const LogoutBL = async (token: string) => {

    try{

        if(token === "")  throw new Error("Token not found");

        const logoutResult = await logOutApi(token)

        const message = logoutResult.data.message

        return message

    }catch (e) {
        throw new Error(e.message);
    }

}

export  default LogoutBL