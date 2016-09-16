import * as types from '../actions/actionTypes';
import initialState from './initialState';

const track = (tracks) => {
  let newArr = [];
  tracks.forEach((t) => {
    newArr.push(t.id)
  })
  return newArr;
}



const artistProfile = (state = initialState.artistProfile, action) => {
  switch (action.type) {
    case types.GET_ARTIST_SUCCESS:
      const payload = action.payload
      const image = payload.image[4][Object.keys(payload.image[4])[0]];
      return {
        ...state,
        img: image,
        name: payload.name,
        description: payload.bio.summary,
        tags: payload.tags.tag,
        similar: payload.similar.artist
      }
    case types.GET_TOP_ALBUMS_SUCCESS:
      return {
        ...state,
        topAlbums: action.payload.album
      }
    case types.GET_ALBUMIDS_SUCCESS:
      console.log(track(action.payload));
      return {
        ...state,
        albumIds: track(action.payload),
        tracks: []
      }
    case types.GET_TRACKS_SUCCESS:
      return {
        ...state,
        tracks: [
          ...state.tracks,
          {
            trackName: action.payload.name,
            audio: new Audio(action.payload.preview_url)
          }
        ]
      }

    default:
      return state;
  }
}

export default artistProfile;
