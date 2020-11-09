import { OutletNotPersistedActionTypes } from './outletNotPersisted.types';

export const setOutletList = (OutletList) => ({
	type    : OutletNotPersistedActionTypes.SET_OUTLETNOTPERSISTED_LIST,
	OutletList : OutletList
});

export const setMapOutletList = (mapOutletList) => ({
	type    : OutletNotPersistedActionTypes.SET_OUTLETNOTPERSISTED_MAP_LIST,
	mapOutletList : mapOutletList
});
