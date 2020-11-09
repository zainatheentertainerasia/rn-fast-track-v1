import { createSelector } from 'reselect';

const selectTest = state => state.locationReducer;

export const selectLocationReducer = createSelector(
  [selectTest],
  locationReducer => locationReducer
);

export const selectCurrentLocation = createSelector(
  [selectTest],
  locationReducer => locationReducer.currentLocation
);


export const selectLocation = createSelector(
  [selectTest],
  locationReducer => locationReducer.location
);

export const selectLocationList = createSelector(
  [selectTest],
  locationReducer => locationReducer.LocationList
);
