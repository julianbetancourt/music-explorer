import axios from 'axios';
import * as types from './actionTypes';

export const toggleFilter = () => {
  return {
    type: types.TOGGLE_FILTER
  }
}

export const getArtists = (term) => {
  return (dispatch, getState) => {
    axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${term}&api_key=e62624f493da5c6d7453f5e0be3d76d9&format=json&limit=10`)
      .then(res => console.log(res.data.results.artistmatches))
  }
}
