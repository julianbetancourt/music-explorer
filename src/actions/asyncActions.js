import axios from 'axios';
import * as types from './actionTypes';

export const toggleFilter = () => {
  return {
    type: types.TOGGLE_FILTER
  }
}
