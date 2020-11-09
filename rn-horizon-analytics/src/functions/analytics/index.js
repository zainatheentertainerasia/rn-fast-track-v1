// import { setItem, getItem } from '../../utils/storage';
import { getConfig } from '../config/index';
import { getinit } from '../init/index';
// import { sendFacebookAnalytics } from '../../sdks/facebook';
// import { sendAppBoyAnalytics } from '../../sdks/appBoy';
// import { sendGtmAnalytics } from '../../sdks/gtm';
// import { sendFirebaseAnalytics } from '../../sdks/firebase';
// import { sendAppFlyerAnalytics } from '../../sdks/appFlyer';

const sendAnalytics = async (eventName, analyticsObject, groups) => {
  const config = await getConfig();
  const initObject = await getinit();
  console.log(initObject, 'initObject');
  groups.map((groupItem) => {
    const group = config.groups[groupItem];
    if (group !== undefined) {
      group.map((analyticItem) => {
        const isExistInInit = initObject[analyticItem];
        if (isExistInInit) {
          switch (
            analyticItem
            // case 'facebook':
            //   sendFacebookAnalytics(eventName, analyticsObject);
            //   break;
            //     case 'appBoy':
            //       sendAppBoyAnalytics(eventName, analyticsObject);
            //       break;
            // case 'gtm':
            //   sendGtmAnalytics(eventName, analyticsObject);
            //   break;
            // case 'firebase':
            //   sendFirebaseAnalytics(eventName, analyticsObject);
            //   break;
            // case 'appFlyer':
            //   sendAppFlyerAnalytics(eventName, analyticsObject);
            //   break;
          ) {
          }
        }
      });
    }
  });
  console.log(
    config,
    'sendAnalyticssendAnalytics',
    eventName,
    analyticsObject,
    groups
  );
};

export default sendAnalytics;
