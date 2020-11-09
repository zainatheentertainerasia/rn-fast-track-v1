import { store } from './store';
import ModuleJson from '../Module.json';

import _ from 'lodash';
import path from 'path';

export const onSetComsumeValues = async (data) => {
	const comsume = ModuleJson.consume;
	const x = comsume.map(async (consumeItem) => {
		const actionpath = '.' + path.resolve(consumeItem.reducerActionPath.replace(/redux/g, ''));
		let { setComsumeValues } = await import('' + actionpath);
		const picked_consume_object = _.pick(data, consumeItem.keys);
		store.dispatch(setComsumeValues(picked_consume_object));
	});
	await Promise.all(x);
	return x;
};
