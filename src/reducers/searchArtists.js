import * as types from '../actions/actionTypes';
import initialState from './initialState';

const searchArtists = (state = initialState.searchArtists, action) => {
  switch (action.type) {
    case types.GET_SEARCH:
      return action.artists;
    default:
      return state;
  }
}

export default searchArtists;
