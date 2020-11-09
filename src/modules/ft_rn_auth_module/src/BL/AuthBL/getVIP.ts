import  ValidateVipKey  from './ValidateVipKey';

export const getVIPKey = async () => {
  
  const vipKey = await deeplinkHandler(window.deeplink);
  return vipKey
};

export const deeplinkHandler = async (deeplink) => {
  try {
    
    if (deeplink) {
      console.log('Deep Link sfsfsdf',deeplink)
      const type = deeplink.type;
      if (type === 'vipKey') {
        console.log(type,'vip type')
        const isDone = deeplink.isDone;
        console.log(isDone,'vip is done')
        if (!isDone) {
          window.deeplink.isDone = true;
          console.log('Deep Link sfsfsdf',window.deeplink.isDone)
          const isLoggedIn = deeplink.data.isLoggedIn;
          const vipKey = deeplink.data.vipKey;
          const token = deeplink.data.token;
          // const sessionToken = deeplink.data.sessionToken;
          if (isLoggedIn) {
            try {
              const validateResponse = await ValidateVipKey(
                token,
                vipKey
              );

              console.log(validateResponse, 'validate response for vip key');

              if (!validateResponse.data.validation_status) {
                // await Updates.reloadAsync()
              }
              
            } catch (error) {
              console.log(error.message, 'Deep Link sfsfsdf');
            }
          } else {
            return vipKey;
          }
        }
      }
    }else{
      console.log('testiqbal12@gmail.com vip')
    }
  } catch (error) {
    console.log(error, 'error VIP');
    return undefined;
  }
};
