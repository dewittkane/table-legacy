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

function* searchGames() {

    try {
        const results = yield axios.get(`/api/games/search/${action.payload}`)
    
        yield put({type: 'SET_USER_SEARCH', payload: results.data})
    
    } catch (error) {
        console.log('User search request failed', error);
    }

}
// function* updateDB() {
//     let response = yield axios
//     .get(`
//         https://api.boardgameatlas.com/api/search?limit=100&client_id=${apiKey}&order_by=popularity&`
//     )
//     .catch(error => {
//         console.log(error);
//     })

//     yield axios.post('/api/games/updateDatabase', response.data);
// }

function* searchSaga() {
    yield takeLatest('SEARCH', searchApi);
    yield takeLatest('SEARCH_GAME', searchGames);
    // yield takeLatest('UPDATE_DB', updateDB)
  }
  
  export default searchSaga;