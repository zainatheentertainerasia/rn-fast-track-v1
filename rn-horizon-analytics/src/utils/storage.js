import { AsyncStorage } from 'react-native';

export async function setItem(key, data) {
  try {
    if (typeof data === 'string') {
      await AsyncStorage.setItem(key, data);
    } else if (typeof data === 'number') {
      await AsyncStorage.setItem(key, data.toString());
    } else {
      alert(key + '  ' + data + ' It should be in string');
    }
  } catch (error) {
    console.log(error);
  }
}

export function getItem(key) {
  try {
    const data = AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function remove(key) {
  const data = AsyncStorage.removeItem(key);
  return data;
}
