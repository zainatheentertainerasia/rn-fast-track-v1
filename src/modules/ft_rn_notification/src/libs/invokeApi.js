import axios from 'axios';
import companyApi from '@companyApis';
import InfoJson from '../apis/info.json';
console.log(InfoJson, 'InfoJson');
export const base_uri = InfoJson.basePath;

axios.defaults.headers.post['Content-Type'] = 'application/json';

export async function invokeApi({ path, method = 'GET', headers = {}, queryParams = {}, postData = {} }) {
	let reqObj = {
		method  : method,
		url     : base_uri + path,
		headers : {
			...companyApi,
			...headers
		}
	};

	reqObj['params'] = queryParams;

	if (method === 'POST') {
		reqObj['data'] = postData;
	}

	let results = undefined;

	try {
		results = await axios(reqObj);
		return results.data;
	} catch (error) {
		if (error.response && error.response.data && error.response.data.message) {
			throw new Error(error.response.data.message);
		} else if (error.response && error.response.status && error.response.statusText) {
			if (error.response.status === 401) {
			}
			throw new Error(error.response.statusText);
		} else {
			console.log('invokeApi -> checkpoint-2 --> ', error);
			throw new Error('NETWORK ERROR : Some Thing Went Wrong!');
		}
	}
}
