// const { invokeApi } = require('../invokeApi');
import { invokeApi } from '../invokeApi';

// const mongoDomain = 'https://api.theentertainerme.com';
const mongoDomain = 'https://fkru86rv14.execute-api.eu-west-1.amazonaws.com/QA';

export const postStackApiCalling = async (header, body) => {
  let requestObj = {
    path: `${mongoDomain}/v2/log-analytics`,
    method: 'POST',
    headers: header,
  };

  requestObj['postData'] = body;
  
  return invokeApi(requestObj);
};
