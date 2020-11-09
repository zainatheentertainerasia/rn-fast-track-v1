import { createSelector } from 'reselect';

const selectTest = state => state.homeReducer;

export const selectHomeCategory = createSelector(
  [selectTest],
  homeReducer => homeReducer.category
);

export const selectHomeSection = createSelector(
  [selectTest],
  homeReducer => homeReducer.homeSection
);


export const isTemplate = createSelector(
  [selectTest],
  homeReducer => homeReducer.isTemplate
);

export const selectExposeFunction = createSelector(
  [selectTest],
  homeReducer => homeReducer.exposeFunction
);
