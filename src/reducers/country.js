import * as types from '../actions/actionTypes';
import initialState from './initialState';

const country = (state = initialState.country, action) => {
  switch (action.type) {
    case types.GET_COUNTRY:
      return action.artist;
    default:
      return state;
  }
}

export default country;
