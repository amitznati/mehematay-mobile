import {ActionTypes} from './DayTimesApi';
const navigationDate = new Date();
navigationDate.setHours(6);
const initialState = {
  selectedDate: new Date(),
  dayTimes: [],
  locationName: '',
  loadCurrentLocationTimesError: '',
  navigationDate,
};
const SUCCESS = '_SUCCESS';
const reducer = (state = initialState, action) => {
  let newState = {...state};
  const payload = action && action.payload;
  const type = action && action.type;
  switch (type) {
    case ActionTypes.LOAD_SUN_TIMES:
      newState = {
        ...state,
        dayTimes: [...payload],
        loadCurrentLocationTimesError: '',
      };
      break;
    case ActionTypes.SET_SELECTED_DATE:
      newState = {
        ...state,
        selectedDate: payload,
        loadCurrentLocationTimesError: '',
      };
      break;
    case ActionTypes.SET_SELECTED_LOCATION:
      newState = {
        ...state,
        ...payload,
        loadCurrentLocationTimesError: '',
      };
      break;
    case ActionTypes.LOAD_CURRENT_LOCATION_TIMES_ERROR:
      const {code, message} = payload;
      newState = {
        ...state,
        loadCurrentLocationTimesError: `code: ${code}, message: ${message}`,
      };
      break;
    case ActionTypes.SET_NAVIGATION_DATE:
      newState = {
        ...state,
        navigationDate: payload,
        loadCurrentLocationTimesError: '',
      };
      break;
    default:
      return newState;
  }
  return newState;
};

export default reducer;
