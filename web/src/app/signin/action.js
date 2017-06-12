import { postRequest, API_ERROR } from 'lib/apiCall';

export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';

export function login(username, password) {
  return dispatch => postRequest('/signin', { username, password })
    .then(data => dispatch({ type: SIGNIN_SUCCESS, payload: data }))
    .catch(err => dispatch({ type: API_ERROR, payload: err }));
}
