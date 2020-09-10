import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getGameInstance(action){
    try {
        let response = yield axios
            .get(`/api/games/gameInstance/${action.payload}`)
            .catch(error => {
                    console.log(error);
            })
        console.log(response.data);

        yield put({ type: 'SET_GAME_INSTANCE', payload: response.data })


    } catch (error) {
        console.log('Error with getting game instance:', error);
      }
}

function* gameInstanceSaga() {
    yield takeLatest('GET_GAME_INSTANCE', getGameInstance);
  }
  
  export default gameInstanceSaga;