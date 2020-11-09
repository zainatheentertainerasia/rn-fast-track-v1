import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const middlewares = [];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middlewares)
));

export const persistor = persistStore(store);

export default { store, persistStore };
