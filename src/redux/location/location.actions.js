import { LocationActionTypes } from './location.types';

export const setLocationList = (LocationList) => ({
	type    : LocationActionTypes.SET_LOCATION_LIST,
	LocationList : LocationList
});


export const setHomeSelectedLocation = (location) => ({
	type    : LocationActionTypes.SET__HOME_SELECTED_LOCATION,
	location : location
});


export const setUserCurrentLocation = (currentLocation) => ({
	type    : LocationActionTypes.SET_CURRENT_LOCATION,
	currentLocation : currentLocation
});


export const setLocationValues = (data) => ({
	type    : LocationActionTypes.SET_LOCATION_VALUES,
	data : data
});
