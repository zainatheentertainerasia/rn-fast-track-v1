import { invokeApi } from './invokeApi';
import { homeApiResponse } from './responses';
import { HomeAPIdataType,RequestObjectDataType } from '../Interfaces'


export const homeApi = (data: HomeAPIdataType) => {

	const queryData = {
		location_id: data.locationID,
		currency: data.currency,
		language: data.language
	}

	let requestObj: RequestObjectDataType = {
		path: window.home_init.homeServiceUrl ,
		method : 'GET',
		queryParams : {
			...queryData
		},
		headers: {
            'Authorization': 'Bearer ' + data.token,
          },
	};
	const mode = window.home_init.mode;
	if (mode === 'test') {
		return homeApiResponse();
	}
	return invokeApi(requestObj);
};


export const locationListApi = (token: string,language: string) => {

	let requestObj: RequestObjectDataType = {
		path: window.home_init.configServiceUrl+"locations" ,
		method : 'GET',
		headers: {
			'Authorization': 'Bearer ' + token,
		},
		queryParams : {
			language: language,
		},
	};
	console.log("req: ",requestObj)
	const mode = window.home_init.mode;
	if (mode === 'test') {
		return homeApiResponse();
	}
	return invokeApi(requestObj);
};
