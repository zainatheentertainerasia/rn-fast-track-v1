import axios from 'axios';

// import InfoJson from '../apis/info.json';
// //console.log(InfoJson, 'InfoJson');
// export const base_uri = InfoJson.basePath;

axios.defaults.headers.post['Content-Type'] = 'application/json';

export async function invokeApi({
  path,
  method = 'GET',
  headers = {},
  queryParams = {},
  postData = {},
}) {
  let reqObj = {
    method: method,
    // url     : base_uri + path,
    url: path,
    headers: {
      // ...companyApi,
      ...headers,
    },
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

      if (error.response.status === 401) {
        throw new Error("logout");
      }else if (error.response.status === 403) {
        throw new Error("logout");
      }else{
       //  //console.log("error.response.status: ",error.response.status)
       // //console.log("error data: ",error.response.data)
        throw new Error(error.response.data.message);
      }
    } else if (error.response && error.response.status && error.response.statusText) {


      throw new Error(error.response.statusText);
    } else {

      throw new Error('NETWORK ERROR : Some Thing Went Wrong!');
    }
  }
}
