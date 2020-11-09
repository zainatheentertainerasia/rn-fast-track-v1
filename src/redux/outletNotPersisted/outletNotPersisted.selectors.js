import { createSelector } from 'reselect';

const selectTest = state => state.outletNotPersistedReducer;

export const selectOutletList = createSelector(
  [selectTest],
  outletNotPersistedReducer => outletNotPersistedReducer.OutletList
);


export const selectMapOutletList = createSelector(
  [selectTest],
  outletNotPersistedReducer => outletNotPersistedReducer.mapOutletList
);

