import { getItem as _get, setItem as _set, remove } from './index';

export const getItem = async (key) => {
  return _get(key)
    .then((value) => {
      try {
        const result = JSON.parse(value);
        return result;
      } catch (error) {
        return value;
      }
    })
    .catch(() => undefined);
};

export const setItem = async (key, value) => {
  if (typeof value === 'object') {
    await _set(key, JSON.stringify(value));
  } else {
    await _set(key, value);
  }
};

export const removeItem = async (key) => {
  return await remove(key);
};
