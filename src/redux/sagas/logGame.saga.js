
import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* logGame(action){
    try {
        yield axios
            .post(`/api/game`, action.payload)
            .catch(error => {
                    console.log('error posting game', error);
            })

    } catch (error) {
        console.log('Error with logging game:', error);
      }
}

function* logSaga() {
    yield takeLatest('LOG_GAME', logGame);
  }
  
  export default logSaga;