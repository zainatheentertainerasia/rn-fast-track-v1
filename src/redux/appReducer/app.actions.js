import { AppActionTypes } from './app.types';

export const setComsumeValues = (dataObj) => ({
	type    : AppActionTypes.SET_CONSUME_VALUES,
	dataObj : dataObj
});

export const setExposeFun = (exposeFunction) => ({
	type           : AppActionTypes.SET_EXPOSE_VALUES,
	exposeFunction : exposeFunction
});

export const setSkipMode = (value) => ({
	type           : AppActionTypes.SET_SKIP_MODE,
	value : value
});


export const setAppConfigs = (data) => ({
	type           : AppActionTypes.SET_APP_CONFIGS,
	data : data
});

export const setAppLoading = (data) => ({
	type           : AppActionTypes.SET_APP_LOADING,
	data : data
});


export const setErrorObject = (data) => ({
	type           : AppActionTypes.SET_APP_ERROR,
	data : data
});

export const setWebViewObject = (data) => ({
	type           : AppActionTypes.SET_APP_WEBVIEW,
	data : data
});


export const setDismissDemographic = (data) => ({
	type           : AppActionTypes.SET_DISMISS_DEMOGRAPHIC,
	data : data
});


export const setDemographicVisible = (data) => ({
	type           : AppActionTypes.SET_IS_DEMOGRAPHIC_VISIBLE,
	data : data
});


