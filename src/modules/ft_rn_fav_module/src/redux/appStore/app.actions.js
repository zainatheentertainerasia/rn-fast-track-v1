import { AppActionTypes } from './app.types';

export const setComsumeValues = (dataObj) => ({
	type    : AppActionTypes.SET_CONSUME_VALUES,
	dataObj : dataObj
});

export const setExposeFun = (exposeFunction) => ({
	type           : AppActionTypes.SET_EXPOSE_VALUES,
	exposeFunction : exposeFunction
});
