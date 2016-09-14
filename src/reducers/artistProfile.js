import * as types from '../actions/actionTypes';
import initialState from './initialState';

const artistProfile = (state = initialState.artistProfile, action) => {
  switch (action.type) {
    case types.GET_ARTIST_SUCCESS:
      const payload = action.payload
      const image = payload.image[4][Object.keys(payload.image[4])[0]];
      return {
        img: image,
        name: payload.name,
        description: payload.bio.summary,
        tags: payload.tags.tag,
        similar: payload.similar.artist
      }
    default:
      return state;
  }
}

export default artistProfile;
