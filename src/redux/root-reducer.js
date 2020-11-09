import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import appReducer from './appReducer/app.reducer';
import userReducer from './userReducer/user.reducer';
import homeReducer from './home/home.reducer';
import locationReducer from './location/location.reducer';
import outletReducer from './outlet/outlet.reducer';
import merchantReducer from './merchant/merchant.reducer';
import outletNotPersistedReducer from './outletNotPersisted/outletNotPersisted.reducer';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userReducer','homeReducer','locationReducer','outletReducer']
};

const rootReducer = combineReducers({
  appReducer: appReducer,
  userReducer:userReducer,
    homeReducer: homeReducer,
    locationReducer: locationReducer,
    outletReducer: outletReducer,
    merchantReducer:merchantReducer,
    outletNotPersistedReducer: outletNotPersistedReducer
});

export default persistReducer(persistConfig, rootReducer);
