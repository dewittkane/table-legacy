
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

function* getGamesByUser(action){
    try {
        let response = yield axios
            .get(`/api/games/myGamesAgainst/3`)
            .catch(error => {
                    console.log(error);
            })
        console.log(response.data);
        yield put({ type: 'SET_GAMES', payload: response.data })


    } catch (error) {
        console.log('Error with get games:', error);
      }
}

function* logSaga() {
    yield takeLatest('LOG_GAME', logGame);
    yield takeLatest('GET_GAMES', getGamesByUser);
  }
  
  export default logSaga;