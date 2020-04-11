import {ActionTypes} from './DayTimesApi';
const initialState = {
  selectedDate: new Date(),
  dayTimes: [],
  locationName: '',
};
const SUCCESS = '_SUCCESS';
const reducer = (state = initialState, action) => {
  let newState = {...state};
  const payload = action && action.payload;
  const type = action && action.type;
  switch (type) {
    case `${ActionTypes.LOAD_SUN_TIMES}${SUCCESS}`:
      newState = {
        ...state,
        dayTimes: [...payload],
      };
      break;
    case ActionTypes.SET_SELECTED_DATE:
      newState = {
        ...state,
        selectedDate: payload,
      };
      break;
    case ActionTypes.SET_SELECTED_LOCATION:
      newState = {
        ...state,
        ...payload,
      };
      break;
    default:
      return newState;
  }
  return newState;
};

export default reducer;
