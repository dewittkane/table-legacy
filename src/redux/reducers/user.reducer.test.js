import userReducer from './user.reducer.js';

describe('Testing User Reducer', () => {
    //initialization
    test('initial state is an object', () => {
        let testAction = {};
        let returnedState = userReducer(undefined, testAction)
        expect(returnedState).toEqual({})
    })

    test('SET_USER will set payload', () => {
        let testPayload = {
            username: "FOO",
            id: 1
        }
        let testAction = {
            type: 'SET_USER',
            payload: testPayload
        };
        let returnedState = userReducer({}, testAction)
        expect(returnedState).toEqual(testPayload)
    })

    test('UNSET_USER will unset the reducer', () => {
        let testAction = {
            type: 'UNSET_USER'
        }
        let returnedState = userReducer({username:"foo"}, testAction);
        expect(returnedState).toEqual({})
    })

    test('unexpected action proves default', () => {
        let testAction = {
            type: "FOO"
        }
        let returnedState = userReducer ({username:"foo"}, testAction);
        expect(returnedState).toEqual({username:"foo"})
    })
})