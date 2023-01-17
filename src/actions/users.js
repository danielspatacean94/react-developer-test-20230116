import api from '../lib/api';

const shouldFetch = (options, store) => {
  if(options.refresh) {
    return true;
  }
  if(store.reading) {
    return false;
  }
  if(store.data) {
    return false;
  }

  if(store.readError) {
    return false;
  }

  return true;
};

export const readUsers = (options = {}) => async(dispatch, getStore) => {
  const {users} = getStore();

  if(!shouldFetch(options, users)) {
    return;
  }

  dispatch({type: 'USERS_READ_REQUEST'});

  try {
    const response = await api.getUsersDiff();

    if(response) {
      dispatch({
        type: 'USERS_READ_SUCCESS',
        data: response.data,
      });
    }
  } catch(err) {
    dispatch({
      type: 'USERS_READ_FAILURE',
      error: err,
    });
  }
};