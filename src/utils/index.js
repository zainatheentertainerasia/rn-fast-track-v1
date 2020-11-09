import path from 'path';

import {AsyncStorage} from 'react-native';

const relativePath = (location) => {
	const index = location.pathname.lastIndexOf('/');
	const loc = location.pathname.substr(0, index);
	return loc;
};

export async function setItem(key, data) {
  await AsyncStorage.setItem(key, data);
}

export function getItem(key) {
  const data = AsyncStorage.getItem(key);
  return data;
}

export function remove(key) {
  const data = AsyncStorage.removeItem(key);
  return data;
}


export { path, relativePath };
