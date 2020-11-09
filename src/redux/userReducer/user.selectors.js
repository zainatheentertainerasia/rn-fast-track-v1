import { createSelector } from 'reselect';

const selectUser = state => state.userReducer;

export const selectUserInfo= createSelector(
  [selectUser],
  userReducer => userReducer.userInfo
);

export const selectUserSessionToken =  createSelector(
  [selectUser],
  userReducer => userReducer.userSessionToken
)

export const selectUserToken =  createSelector(
  [selectUser],
  userReducer => userReducer.token
)