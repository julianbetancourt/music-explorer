import { combineReducers } from 'redux';

import filter from './filter';
import searchArtists from './searchArtists';
import artistProfile from './artistProfile';
import country from './country';

const rootReducer = combineReducers({
  filter,
  searchArtists,
  artistProfile,
  country
});

export default rootReducer;
