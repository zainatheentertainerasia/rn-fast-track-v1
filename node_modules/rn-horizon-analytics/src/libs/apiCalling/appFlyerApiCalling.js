// const { invokeApi } = require('../invokeApi');
import { invokeApi } from '../invokeApi';

const mongoDomain = 'https://entqaapi.etenvbiz.com';
export const sendAppFlyerAnalytics = async (devId, appId, body) => {
	let requestObj = {
		path    : `${mongoDomain}/inappevent/${appId}`,
		method  : 'POST',
		headers : {
			authentication : devId
		}
	};
	requestObj['postData'] = body;

	return invokeApi(requestObj);
};
