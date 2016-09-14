import * as types from '../actions/actionTypes';
import initialState from './initialState';

const artistProfile = (state = initialState.artistProfile, action) => {
  switch (action.type) {
    case types.GET_ARTIST:
      return action.artist;
    default:
      return state;
  }
}

export default artistProfile;
