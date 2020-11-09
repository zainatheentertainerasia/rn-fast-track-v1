import { init, mongo, config, sendAnalytics, appboy } from './functions/index';

const analytics = {
	init,
	mongo,
	config,
	sendAnalytics,
	appboy
};

export default analytics;
