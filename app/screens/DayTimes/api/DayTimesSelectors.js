import {createSelector} from 'reselect';
import config from './DayTimesConfig';

const sliceSelector = state => state[config.sliceName];

export const getDayTimesSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.dayTimes;
  },
);

export const getSelectedDateSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.selectedDate;
  },
);

export const getSelectedCoordsSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.selectedCoords;
  },
);

export const getSeLocationNameSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.locationName;
  },
);

export const getSelectedLocationSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.selectedLocation;
  },
);

export const getLoadCurrentLocationTimesErrorSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.loadCurrentLocationTimesError;
  },
);

export const getNavigationDateSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.navigationDate;
  },
);

export default {
  getDayTimesSelector,
  getSelectedDateSelector,
  getSelectedCoordsSelector,
  getSeLocationNameSelector,
  getSelectedLocationSelector,
  getLoadCurrentLocationTimesErrorSelector,
  getNavigationDateSelector,
};
