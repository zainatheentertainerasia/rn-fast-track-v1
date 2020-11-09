import { createSelector } from 'reselect';

const selectTest = state => state.appReducer;

export const selectTestKey = createSelector(
  [selectTest],
  appReducer => appReducer.a.b.c
);

export const isTemplate = createSelector(
  [selectTest],
  appReducer => appReducer.isTemplate
);

export const selectExposeFunction = createSelector(
  [selectTest],
  appReducer => appReducer.exposeFunction
);

export const selectAppConfigs = createSelector(
  [selectTest],
  appReducer => appReducer.AppConfigs
);


export const selectEndPoints = createSelector(
  [selectTest],
  appReducer => appReducer.endPoints
);


export const selectAppLoading = createSelector(
  [selectTest],
  appReducer => appReducer.isLoading
);

export const selectSkipMode = createSelector(
  [selectTest],
  appReducer => appReducer.skipMode
);


export const selectAppErrorObject = createSelector(
  [selectTest],
  appReducer => appReducer.errorObject
);

export const selectAppSuccessObject = createSelector(
  [selectTest],
  appReducer => appReducer.successObject
);

export const selectDeviceInfo = createSelector(
  [selectTest],
  appReducer => appReducer.deviceInfo
);


export const selectIsVisibleDemographic = createSelector(
  [selectTest],
  appReducer => appReducer.isVisibleDemographic
);


export const selectAppWebView = createSelector(
  [selectTest],
  appReducer => appReducer.webViewObject
);


