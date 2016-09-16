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

export const getTopAlbumsSuccess = (payload) => {
  return {
    type: types.GET_TOP_ALBUMS_SUCCESS,
    payload
  }
}


export const getTopAlbums = (artist) => {
  return (dispatch, getState) => {
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=e62624f493da5c6d7453f5e0be3d76d9&format=json&limit=4`)
      .then(res => {
        dispatch(getTopAlbumsSuccess(res.data.topalbums))
      })
  }
}

export const getAlbumIdsSuccess = (payload) => {
  return {
    type: types.GET_ALBUMIDS_SUCCESS,
    payload
  }
}

export const getAlbumIds = (artist) => {
  return (dispatch, getState) => {
    axios.get(`https://api.spotify.com/v1/search?q=${artist}&type=album&limit=4`)
      .then(res => {
        dispatch(getAlbumIdsSuccess(res.data.albums.items))
      })
      .then(res => {
        dispatch(getTracks())
      })
  }
}


export const getTracksSuccess = (payload) => {
  return {
    type: types.GET_TRACKS_SUCCESS,
    payload
  }
}

export const getTracks = () => {
  return (dispatch, getState) => {
    const ids = getState().artistProfile.albumIds;
    console.log(getState());
    ids.forEach((id) => {
      axios.get(`https://api.spotify.com/v1/albums/${id}`)
        .then((res) => dispatch(getTracksSuccess(res.data.tracks.items[0])))
    })
  }
}
