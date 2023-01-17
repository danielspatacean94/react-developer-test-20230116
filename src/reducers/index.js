import { combineReducers } from 'redux';
import users from './users';
import projects from './projects';

const rootReducer = combineReducers({
  users,
  projects,
});

export default rootReducer;
