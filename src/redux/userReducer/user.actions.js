import { UserActionTypes } from './user.types';

export const setComsumeValues = (dataObj) => ({
	type    : UserActionTypes.SET_CONSUME_VALUES,
	dataObj : dataObj
});

export const setExposeFun = (exposeFunction) => ({
	type           : UserActionTypes.SET_EXPOSE_VALUES,
	exposeFunction : exposeFunction
});


export const setUser = (data) => ({
	type           : UserActionTypes.SET_USER,
	data : data
});

export const setToken = (data) =>({
	type : UserActionTypes.SET_TOKEN,
	data:data
})

export const setUserValues = (data) =>({
	type : UserActionTypes.SET_USER_VALUES,
	data:data
})


