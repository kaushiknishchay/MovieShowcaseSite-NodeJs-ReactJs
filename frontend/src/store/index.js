import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers/index';
import rootSagas from '../sagas';


const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
  // whitelist: ['auth'],
  // blacklist: ['auth'],
};

const sagaMiddleware = createSagaMiddleware();

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  pReducer,
  composeWithDevTools((process.env.NODE_ENV !== 'production')
    ? applyMiddleware(sagaMiddleware, logger)
    : applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);

export default store;
