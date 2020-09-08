const searchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SEARCH':
        return action.payload;
      default:
        return state;
    }
  };
  
  // search will be on the redux state at:
  // state.search
  export default searchReducer;