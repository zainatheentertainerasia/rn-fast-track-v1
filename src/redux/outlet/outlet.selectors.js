import { createSelector } from 'reselect';

const selectTest = state => state.outletReducer;

export const selectOutletReducer = createSelector(
  [selectTest],
  outletReducer => outletReducer
);

export const selectCurrentOutlet = createSelector(
  [selectTest],
  outletReducer => outletReducer.currentOutlet
);


export const selectOutlet = createSelector(
  [selectTest],
  outletReducer => outletReducer.outlet
);

export const selectMerchantData = createSelector(
  [selectTest],
  outletReducer => outletReducer.merchantData
);

export const selectSelectedFilter = createSelector(
  [selectTest],
  outletReducer => outletReducer.selectedFilters
);


export const selectFavouriteList = createSelector(
  [selectTest],
  outletReducer => outletReducer.favouriteList
);
