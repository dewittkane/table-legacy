const userSearchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_USER_SEARCH':
        return action.payload;
      case 'RESET_USER_SEARCH':
        return [];
      default:
        return state;
    }
  };
  
  // search will be on the redux state at:
  // state.userSearch
  export default userSearchReducer;