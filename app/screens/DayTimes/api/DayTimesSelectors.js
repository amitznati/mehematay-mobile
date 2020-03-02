import {createSelector} from 'reselect';
import config from './DayTimesConfig';

const sliceSelector = state => state[config.sliceName];

export const getSunTimesSelector = createSelector(
  sliceSelector,
  slice => {
    return slice.sunTimes;
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

export default {
  getSunTimesSelector,
  getSelectedDateSelector,
  getSelectedCoordsSelector,
  getSeLocationNameSelector,
  getSelectedLocationSelector,
};
