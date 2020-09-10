const gamesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_GAMES':
        return action.payload;
      default:
        return state;
    }
  };
  
  // search will be on the redux state at:
  // state.games
  export default gamesReducer;