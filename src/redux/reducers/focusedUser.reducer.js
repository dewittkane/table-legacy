const focusedUserReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_FOCUSED_USER':
        return action.payload;
      default:
        return state;
    }
  };
  
  // search will be on the redux state at:
  // state.focusedUser
  export default focusedUserReducer;