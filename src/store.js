import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const getMiddleware = () => {
  if(process.env.NODE_ENV === 'production') {
    return [thunk];
  }

  return [thunk, logger];
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
})
export default store;