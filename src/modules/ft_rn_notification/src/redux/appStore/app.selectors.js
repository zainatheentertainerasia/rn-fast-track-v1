import { createSelector } from 'reselect';

const selectTest = state => state.appReducer;

export const selectTestKey = createSelector(
  [selectTest],
  appReducer => appReducer.test
);

export const isTemplate = createSelector(
  [selectTest],
  appReducer => appReducer.isTemplate
);

export const selectExposeFunction = createSelector(
  [selectTest],
  appReducer => appReducer.exposeFunction
);
