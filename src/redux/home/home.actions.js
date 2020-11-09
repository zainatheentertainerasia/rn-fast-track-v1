import { HomeActionTypes } from './home.types';

export const setHomeSection = (homeSection) => ({
	type    : HomeActionTypes.SET_HOME_SECTION,
	homeSection : homeSection
});


export const setHomeCategory = (category) => ({
	type    : HomeActionTypes.SET_HOME_CATEGORY,
	category : category
});


export const setHomeValues = (data) => ({
	type    : HomeActionTypes.SET_HOME_VALUES,
	data : data
});
