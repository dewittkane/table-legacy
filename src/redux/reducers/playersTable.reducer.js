let startingPlayer = {
    username: "dewitt",
    players_name: '',
    score: '',
    is_winner: false
  }

const playersTableReducer = (state = [startingPlayer], action) => {
    switch (action.type) {
      case 'ADD_PLAYER':
        return [...state, action.payload];
      case 'EDIT_PLAYER':
        return [...state, action.payload]
      default:
        return state;
    }
  };
  
  // search will be on the redux state at:
  // state.playersTable
  export default playersTableReducer;