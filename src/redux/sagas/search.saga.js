
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

let cancel = '';
let apiKey = process.env.REACT_APP_BGA_CLIENT_ID

function* searchApi(action){
    try {

        if ( cancel ) {
            cancel.cancel('Canceling axios request because user typed another character');
        };

        cancel = axios.CancelToken.source();

        let response = yield axios
            .get(`
                https://api.boardgameatlas.com/api/search?name=${action.payload}&limit=5&fuzzy_match=true&client_id=${apiKey}`,
                { cancelToken: cancel.token }
            )
            .catch(error => {
                if ( axios.isCancel(error) || error ) {
                    console.log(error);
                }
            })

        yield put({ type: 'SET_SEARCH', payload: response.data.games })


    } catch (error) {
        console.log('Error with search:', error);
      }
}

function* searchSaga() {
    yield takeLatest('SEARCH', searchApi);
  }
  
  export default searchSaga;