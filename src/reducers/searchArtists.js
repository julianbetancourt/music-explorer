import * as types from '../actions/actionTypes';
import initialState from './initialState';

const searchArtists = (state = initialState.searchArtists, action) => {
  switch (action.type) {
    case types.GET_ARTISTS_SUCCESS:
      return action.artists;
    default:
      return state;
  }
}


export default searchArtists;
