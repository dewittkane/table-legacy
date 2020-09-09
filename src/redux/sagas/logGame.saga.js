
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* logGame(action){
    try {
        yield axios
            .post(`/api/game`, action.payload)
            .catch(error => {
                    console.log('error posting game', error);
            })

        yield put({ type: 'SET_SEARCH', payload: response.data.games })


    } catch (error) {
        console.log('Error with search:', error);
      }
}

function* searchSaga() {
    yield takeLatest('LOG_GAME', logGame);
  }
  
  export default searchSaga;