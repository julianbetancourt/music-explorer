import * as types from '../actions/actionTypes';
import initialState from './initialState';

const filter = (state = initialState.filter, action) => {
  switch (action.type) {
    case types.TOGGLE_FILTER:
      return state === 'artist' ? 'country' : 'artist';
    default:
      return state;
  }
}

export default filter;
