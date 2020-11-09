import {invokeApi} from './invokeApi';
import {updateUserApiResponse, userProfileApiResponse, logOutApiResponse, forgotPasswordApiResponse} from './responses';
import apiInfo from './info.json';
import {
    ForgotPasswordDataType,
    RequestObjectDataType,
    UserUpdateDataType,
    RedemptionhistoryAPIdataType,
    UserSavingAPIdataType,
    userProfileImage
} from "../Interfaces";




export const updateUserProfileImageApi = (data: any,token) => {

    // const postData = {
    //     profile_image: data.profile_image,
    // };

    let requestObj = {
        path: window.profile_init.userServiceUrl + 'profile/image',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' +token,
        },
        postData: data
    };
    const mode = window.profile_init.mode;
    if (mode === 'test') {
        return userProfileApiResponse();
    }
    return invokeApi(requestObj);
};


export const updateUserApi = (data: UserUpdateDataType) => {

    const postData = {
        country_of_residence: data.countryOfResidence,
        mobile_phone: data.mobilePhone,
        currency: data.currency,
        push_notifications: data.pushNotifications ? 1 : 0
    };

    let requestObj = {
        path: window.profile_init.userServiceUrl + 'profile',
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + data.token,
        },
        postData: postData
    };

    const mode = window.profile_init.mode;
    if (mode === 'test') {
        return updateUserApiResponse();
    }
    return invokeApi(requestObj);
};

export const getUserProfileApi = async (token: string,language: string, currency:string) => {
    let requestObj = {
        path: window.profile_init.userServiceUrl + 'profile',
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        queryParams: {
            language,
            currency
        },

    };

    console.log('reqestObj',requestObj);

    // const mode = apiInfo.mode;
    const mode = window.profile_init.mode;
    if (mode === 'test') {
        return userProfileApiResponse()
    }

    return invokeApi(requestObj);
};

export const logOutApi = (token: string) => {
    let requestObj = {
        path: window.profile_init.userServiceUrl + 'logout',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    };
    const mode = window.profile_init.mode;
    if (mode === 'test') {
        return logOutApiResponse()
    }
    return invokeApi(requestObj);
};

export const forgotPasswordApi = (data: ForgotPasswordDataType) => {

    const postData = {
        email: data.email,
        language: data.language
    };

    let requestObj: RequestObjectDataType = {
        path: window.profile_init.userServiceUrl + 'password/reset',
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + data.token,
        },
        postData: postData
    };

    const mode = window.profile_init.mode;
    if (mode === 'test') {
        return forgotPasswordApiResponse()
    }

    return invokeApi(requestObj);
};

export const redemptionhistoryAPI = (data: RedemptionhistoryAPIdataType) => {

    const postData = {
        session_token: data.sessionToken,
        company: data.company,
        currency: data.currency,
        current_year: data.currentYear,
        language: data.language
    }

    let requestObj: RequestObjectDataType = {
        path: window.profile_init.redemptionHistoryUrl,
        method: 'POST',
        headers: {
            'authorizationToken': window.profile_init.historyToken
        },
        postData: postData
    };
    const mode = window.profile_init.mode;
    if (mode === 'test') {
        return updateUserApiResponse();
    }
    return invokeApi(requestObj);
}

export const userSavingAPI = (data: UserSavingAPIdataType) => {

    const postData: any = {
        session_token: data.sessionToken,
        company: data.company,
        currency: data.currency,
        summary_type: data.summaryType,
        language: data.language
    }

    let requestObj = {
        path: window.profile_init.userSavingHistoryUrl,
        method: 'POST',
        headers: {
            'authorizationToken': window.profile_init.historyToken
        },
        postData: postData
    };

    const mode = window.profile_init.mode;
    if (mode === 'test') {
        return updateUserApiResponse();
    }
    return invokeApi(requestObj);
}


export const getHTMLapi = (token: string, url: string) => {

    const postData = {
        url: url
    };

    let requestObj: RequestObjectDataType = {
        method: 'POST',
        path: 'https://entdvsvr.etenvbiz.com/api_ets/v2/web_page',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        postData: postData
    };

    const mode = window.profile_init.mode;
    if (mode === 'test') {
        return {
            "data": {
                "web_page_response": "<h1>TEST</h1>"
            }
        }
    }

    return invokeApi(requestObj);

}
