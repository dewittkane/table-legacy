import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import gameSearch from './gameSearch.reducer';
import playersTable from './playersTable.reducer';
import logAGame from './logAGame.reducer';
import games from './games.reducer';
import gameInstance from './gameInstance.reducer';
import userSearch from './userSearch.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  gameSearch,
  playersTable,
  logAGame,
  games,
  gameInstance,
  userSearch
});

export default rootReducer;
