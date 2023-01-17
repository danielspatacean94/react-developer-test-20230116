import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    thunk, // so that we can dispatch functions => more cleaner code.
    logger,
  ],
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;