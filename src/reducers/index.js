import { combineReducers } from 'redux';

import filter from './filter';
import searchArtists from './searchArtists';
import artistProfile from './artistProfile';

const rootReducer = combineReducers({
  filter,
  searchArtists,
  artistProfile
});

export default rootReducer;
