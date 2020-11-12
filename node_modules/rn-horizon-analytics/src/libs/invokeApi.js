import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const invokeApi = async ({
  path,
  method = 'GET',
  headers = {},
  queryParams = {},
  postData = {},
}) => {
  let reqObj = {
    method: method,
    url: path,
    headers: headers,
  };
  console.log(postData, 'headers');
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
    } else if (
      error.response &&
      error.response.status &&
      error.response.statusText
    ) {
      if (error.response.status === 401) {
      }
      throw new Error(error.response.statusText);
    } else {
      console.log('invokeApi -> checkpoint-2 --> ', error);
      throw new Error('NETWORK ERROR : Some Thing Went Wrong!');
    }
  }
};
