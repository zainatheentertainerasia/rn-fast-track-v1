import axios from 'axios';




axios.defaults.headers.post['Content-Type'] = 'application/json';
import {getAuthBlInitObject} from '..'
export async function invokeApi({ path, method = 'GET', headers = {}, queryParams = {}, postData = {} }) {

	const base_uri = window.auth_init?window.auth_init.userServiceUrl:window.endPoints.userServices;

	let reqObj = {
		method: method,
		url: base_uri + path,
		headers: {
			...headers
		}
	};


	reqObj['params'] = queryParams;

	if (method === 'POST' || method === 'PUT' ) {
		reqObj['data'] = postData;
	}

	let results = undefined;

	try {
		console.log('reqObj',reqObj)
		results = await axios(reqObj);
		console.log("axios: ",results);
		return results.data;
	} catch (error) {
		if (error.response && error.response.data && error.response.data.message) {
			const errorData = {
				messageText: error.response.data.message,
				code: error.response.data.code,
				email: postData.email
			}

			throw (errorData)
			// throw new Error(error.response.data.message);
		} else if (error.response && error.response.status && error.response.statusText) {
			if (error.response.status === 401) {
			}
			throw ({ messageText: error.response.statusText, })
		} else {
			throw ({ messageText: 'NETWORK ERROR : Some Thing Went Wrong!', })
		}
	}
}