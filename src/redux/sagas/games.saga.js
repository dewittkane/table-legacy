
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* logGame(action){
    try {
        yield axios
            .post(`/api/games`, action.payload)

        yield put({ type: 'SET_NEW_GAME' })

        yield put({ type: 'GET_YOUR_GAMES' })

    } catch (error) {
        console.log('Error with logging game:', error);
      }
}

function* getTheirGames(action){
    try {
        let response = yield axios
            .get(`/api/games/myGamesAgainst/${action.payload}`)

        console.log(response.data);

        yield put({ type: 'SET_GAMES', payload: response.data })


    } catch (error) {
        console.log('Error with getting their games:', error);
      }
}

function* getYourGames(){
    try {
        let response = yield axios
            .get(`/api/games/myGames`)
        console.log(response.data);
        yield put({ type: 'SET_GAMES', payload: response.data })

    } catch (error) {
        console.log('Error with getting your games:', error);
      }
}

function* deleteGame(action){
    try {
        yield axios.delete(`/api/games/${action.payload}`)

        yield put({ type: 'GET_YOUR_GAMES' })

    } catch (error) {
        console.log('Error with deleting game:', error);
      }
}

function* editGame(action){
    try {
        yield axios.put(`/api/games/${action.payload.game_instance_id}`, action.payload)

        yield put({type: 'GET_GAME_INSTANCE', payload: action.payload.game_instance_id})

        

    } catch (error) {
        console.log('Error with editing game:', error);
      }
}


function* logSaga() {
    yield takeLatest('LOG_GAME', logGame);
    yield takeLatest('GET_THEIR_GAMES', getTheirGames);
    yield takeLatest('GET_YOUR_GAMES', getYourGames);
    yield takeLatest('DELETE_GAME', deleteGame);
    yield takeLatest('EDIT_GAME', editGame);
  }
  
  export default logSaga;