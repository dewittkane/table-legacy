const apiSearchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_API_SEARCH':
        return action.payload;
      case 'RESET_GAME_SEARCHS':
        return [];
      default:
        return state;
    }
  };
  
  // search will be on the redux state at:
  // state.apiSearch
  export default apiSearchReducer;