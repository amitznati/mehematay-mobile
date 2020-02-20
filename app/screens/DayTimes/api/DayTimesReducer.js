import {ActionTypes} from './DayTimesApi';
import moment from 'moment';
const initialState = {
  selectedDate: new Date(),
  sunTimes: {},
};
const SUCCESS = '_SUCCESS';
const reducer = (state = initialState, action) => {
  let newState = {...state};
  const payload = action && action.payload;
  const type = action && action.type;
  switch (type) {
    case ActionTypes.UPDATE_DATA:
      newState = {
        ...state,
        data: {...payload},
      };
      break;
    case `${ActionTypes.LOAD_SUN_TIMES}${SUCCESS}`:
      newState = {
        ...state,
        sunTimes: {...payload},
      };
      break;
    case ActionTypes.SET_SELECTED_COORDS:
      newState = {
        ...state,
        selectedCoords: payload,
      };
      break;
    case ActionTypes.SET_SELECTED_DATE:
      newState = {
        ...state,
        selectedDate: payload,
      };
      break;
    default:
      return newState;
  }
  return newState;
};

export default reducer;
