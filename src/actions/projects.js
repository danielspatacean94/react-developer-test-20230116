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

export const readProjects = (options = {}) => async(dispatch, getStore) => {
  const {projects} = getStore();

  if(!shouldFetch(options, projects)) {
    return;
  }

  dispatch({type: 'PROJECTS_READ_REQUEST'});

  try {
    const response = await api.getProjectsDiff();

    if(response) {
      dispatch({
        type: 'PROJECTS_READ_SUCCESS',
        data: response.data,
      });
    }
  } catch(err) {
    dispatch({
      type: 'PROJECTS_READ_FAILURE',
      error: err,
    });
  }
};