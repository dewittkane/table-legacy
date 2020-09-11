const playersTableReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TABLE':
        return action.payload
      case 'ADD_PLAYER':
        return [...state, action.payload];
      case 'TOGGLE_WIN':
        return state.map((player, i) => (
            i === action.payload ? {...player, is_winner: !player.is_winner} : player
        ))
      case 'EDIT_SCORE':
        return state.map((player, i) => (
            i === action.payload.index ? {...player, score: action.payload.score } : player
        ))
      default:
        return state;
    }
  };
  
  // search will be on the redux state at:
  // state.playersTable
  export default playersTableReducer;