import { FastTrackLibs } from 'rn_fast_track_uilib';
const { JWT } = FastTrackLibs;
export const wait = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const createJwt = () => {
  const payload = {
    api_token: this.props.appConfigs.apiToken,
  };
  const jwt = JWT.encode(payload, this.props.appConfigs.serectKey);
  //console.log(appConfig, 'Hey there')
  console.log('jwt:', jwt, 'payLoad:', payload);
  return jwt;
};
