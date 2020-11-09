import { OutletActionTypes } from './outlet.types';

export const setOutletList = (OutletList) => ({
	type    : OutletActionTypes.SET_OUTLET_LIST,
	OutletList : OutletList
});


export const setHomeSelectedOutlet = (outlet) => ({
	type    : OutletActionTypes.SET_HOME_SELECTED_OUTLET,
	outlet : outlet
});


export const setUserCurrentOutlet = (currentOutlet) => ({
	type    : OutletActionTypes.SET_CURRENT_OUTLET,
	currentOutlet : currentOutlet
});


export const setOutletValues = (data) => ({
	type    : OutletActionTypes.SET_OUTLET_VALUES,
	data : data
});


export const setMerchantData = (merchantData) => ({
	type    : OutletActionTypes.SET_MERCHANT_DATA,
	merchantData : merchantData
});

export const setSelectedFilter = (selectedFilters) => ({
	type    : OutletActionTypes.SET_SELECTED_FILTER,
	selectedFilters : selectedFilters
});

export const setSelectedFilterReset = () => ({
	type    : OutletActionTypes.SET_SELECTED_FILTER_RESET
});


export const setFavouriteList = (favouriteList) => ({
	type    : OutletActionTypes.SET_FAVOURITE_LIST,
	favouriteList : favouriteList
});
