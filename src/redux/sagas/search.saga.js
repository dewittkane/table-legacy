import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

let apiKey = process.env.REACT_APP_BGA_CLIENT_ID

function* searchApi(action){
    try {

        let response = yield axios
            .get(`
                https://api.boardgameatlas.com/api/search?name=${action.payload}&limit=4&fuzzy_match=true&client_id=${apiKey}`
            )

        yield put({ type: 'SET_API_SEARCH', payload: response.data.games })


    } catch (error) {
        console.log('Error with API search:', error);
      }
}

function* searchGames( action ) {
    try {
        const results = yield axios.get(`/api/games/search/${action.payload}`)
    
        yield put({type: 'SET_GAME_SEARCH', payload: results.data})
    
    } catch (error) {
        console.log('Game search request failed', error);
    }
}

//THIS WAS USED TO CACHE DATABASE
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
    yield takeLatest('SEARCH_API', searchApi);
    yield takeLatest('SEARCH_GAME', searchGames);
    // yield takeLatest('UPDATE_DB', updateDB)
  }
  
  export default searchSaga;