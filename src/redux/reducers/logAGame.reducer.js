const LogAGameReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_NEW_GAME':
        return {date_played: new Date(), creator_notes: ''}
      case 'SET_GAME':
        return action.payload;
      case 'SET_DATE':
        return {...state, date_played: action.payload};
      case 'SET_NOTE':
        return {...state, creator_notes: action.payload};
      case 'SET_GAME_TO_EDIT':
        return action.payload;
      default:
        return state;
    }
  };
  
  // search will be on the redux state at:
  // state.logAGame
  export default LogAGameReducer;