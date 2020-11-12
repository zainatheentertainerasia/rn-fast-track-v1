import { setItem, getItem } from '../../utils/storage';
//import facebookSdk from '../../sdks/facebook';

// import gtmSdk from '../../sdks/gtm';
// import firebaseSdk from '../../sdks/firebase';
// import appFlyerSdk from '../../sdks/appFlyer';

const init = async (initObject) => {
  return;
  let jsonData = JSON.stringify(initObject);
  if (jsonData === null) {
    jsonData = {};
  }
  await setItem('init', jsonData);
  //   const facebook = initObject.facebook;
  //   const appBoy = initObject.appBoy;
  //   const gtm = initObject.gtm;
  //   const firebase = initObject.firebase;
  //   const appFlyer = initObject.appFlyer;
  //   if (facebook) {
  //     await facebookSdk.init(facebook);
  //   }
  //   // if (appBoy) {
  //   // 	await appBoySdk.init(appBoy);
  //   // }

  //   if (gtm) {
  //     await gtmSdk.init(gtm);
  //   }

  //   if (firebase) {
  //     await firebaseSdk.init(firebase);
  //   }
  //   if (appFlyer) {
  //     await appFlyerSdk.init(firebase);
  //   }
};

export const getinit = async () => {
  let init = await getItem('init');
  if (init === null) {
    init = {};
  } else {
    init = JSON.parse(init);
  }
  return init;
};

export default init;
