const gameInstanceReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_GAME_INSTANCE':
        return action.payload
      default:
        return state;
    }
  };
  
  // search will be on the redux state at:
  // state.gameInstance
  export default gameInstanceReducer;