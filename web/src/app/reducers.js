import { combineReducers } from 'redux';

function reducer(state = {}, action) {
  console.log(action);
  return state;
}

export default combineReducers({
  reducer,
});
