
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appReducer from './appStore/app.reducer';


const persistConfig = {
  key: 'ft_rn_fav_module',
  storage,
  whitelist: []
};

const rootReducer = combineReducers({
  appReducer: appReducer,
});

export default persistReducer(persistConfig, rootReducer);
