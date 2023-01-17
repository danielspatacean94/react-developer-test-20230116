const initialState = {
  data:      null,
  reading:   false,
  readError: null,
};

export default (store = initialState, action) => {
  switch(action.type) {
    // ------------------------------------ read ------------------------------------
    case 'PROJECTS_READ_REQUEST':
      return {
        ...store,
        reading:     true,
        readError:   null,
      };

    case 'PROJECTS_READ_SUCCESS':
      return {
        ...store,
        reading:    false,
        readError:  null,
        data:       action.data,
      };

    case 'PROJECTS_READ_FAILURE':
      return {
        ...store,
        reading:   false,
        readError: action.error,
      };

    // ------------------------------------ create ------------------------------------
    // ------------------------------------ delete ------------------------------------
    // ------------------------------------ update ------------------------------------
    default:
      return store;
  }
};
