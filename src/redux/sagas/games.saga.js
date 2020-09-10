
import { takeLatest } from 'redux-saga/effects';
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
            .get(`/api/games/user/${action.payload}`)
            .catch(error => {
                    console.log(error);
            })

        yield put({ type: 'SET_GAMES', payload: response.data })


    } catch (error) {
        console.log('Error with get games:', error);
      }
}

function* logSaga() {
    yield takeLatest('LOG_GAME', logGame);
    yield takeLatest('GET_GAMES_BY_USER', getGamesByUser);
  }
  
  export default logSaga;