import { setItem, getItem } from '../../utils/storage';

const setconfig = async (configObject) => {
	const configObjectStructure = {
		groups : {}
	};
	const configObjectData = {
		...configObjectStructure,
		...configObject
	};

	await setItem('config', JSON.stringify(configObjectData));
	console.log('Config', configObjectData);
};

export const getConfig = async () => {
	let configObject = await getItem('config');
	if (configObject == null) {
		configObject = {};
	} else {
		configObject = JSON.parse(configObject);
	}
	return configObject;
};

export default setconfig;
