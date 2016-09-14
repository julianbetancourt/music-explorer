import axios from 'axios';
import * as types from './actionTypes';

export const toggleFilter = () => {
  return {
    type: types.TOGGLE_FILTER
  }
}

export const getArtistsSuccess = (artists) => {
  return {
    type: types.GET_ARTISTS_SUCCESS,
    artists
  }
}

export const getArtists = (term) => {
  return (dispatch, getState) => {
    axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${term}&api_key=e62624f493da5c6d7453f5e0be3d76d9&format=json&limit=14`)
      .then(res => {
        dispatch(getArtistsSuccess(res.data.results.artistmatches.artist))
      })
  }
}

export const getArtistSuccess = (payload) => {
  return {
    type: types.GET_ARTIST_SUCCESS,
    payload
  }
}

export const getArtist = (artist) => {
  return (dispatch, getState) => {
    axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=e62624f493da5c6d7453f5e0be3d76d9&format=json`)
      .then(res => {
        dispatch(getArtistSuccess(res.data.artist))
      })
  }
}
