
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* logGame(action){
    try {
        yield axios
            .post(`/api/games`, action.payload)
            .catch(error => {
                    console.log('error posting game', error);
            })

    } catch (error) {
        console.log('Error with logging game:', error);
      }
}

function* getTheirGames(action){
    try {
        let response = yield axios
            .get(`/api/games/myGamesAgainst/${action.payload}`)
            .catch(error => {
                    console.log(error);
            })
        console.log(response.data);

        yield put({ type: 'SET_GAMES', payload: response.data })


    } catch (error) {
        console.log('Error with getting their games:', error);
      }
}

function* getYourGames(action){
    try {
        let response = yield axios
            .get(`/api/games/myGames`)
            .catch(error => {
                    console.log(error);
            })
        console.log(response.data);
        yield put({ type: 'SET_GAMES', payload: response.data })


    } catch (error) {
        console.log('Error with getting your games:', error);
      }
}

function* deleteGame(action){
    try {
        yield axios
            .delete(`/api/games/${action.payload}`)
            .catch(error => {
                    console.log('error deleting game', error);
            })

    } catch (error) {
        console.log('Error with deleting game:', error);
      }
}
function* logSaga() {
    yield takeLatest('LOG_GAME', logGame);
    yield takeLatest('GET_THEIR_GAMES', getTheirGames);
    yield takeLatest('GET_YOUR_GAMES', getYourGames);
    yield takeLatest('DELETE_GAME', deleteGame);
  }
  
  export default logSaga;