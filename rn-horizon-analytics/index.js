import { init, mongo, config, sendAnalytics, appboy } from './src/functions/index';
const analytics = {
  init,
  mongo,
  config,
  sendAnalytics,
  appboy
};

export default analytics;