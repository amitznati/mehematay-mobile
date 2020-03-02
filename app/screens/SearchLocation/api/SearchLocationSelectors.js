import {createSelector} from 'reselect';
import config from './SearchLocationConfig';

const sliceSelector = state => state[config.sliceName];

export const getLocationResultsSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.locationResults;
  },
);

export default {
  getLocationResultsSelector,
};
