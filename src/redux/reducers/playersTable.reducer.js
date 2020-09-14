const playersTableReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TABLE':
        return action.payload
      case 'SET_TABLE_TO_EDIT':
        return action.payload.map(player => (
          player.hasOwnProperty('users_id') ? {...player, id: player.users_id} : player
        ))
      case 'ADD_PLAYER':
        return [...state, action.payload];
      case 'REMOVE_PLAYER':
        let newState = [...state];
        newState.splice(action.payload, 1)
        return newState;
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