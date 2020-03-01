import {ActionTypes} from './SearchLocationApi';
const initialState = {
  locationResults: [],
  selectedLocation: {},
};
const SUCCESS = '_SUCCESS';
const reducer = (state = initialState, action) => {
  let newState = {...state};
  const payload = action && action.payload;
  const type = action && action.type;
  switch (type) {
    case `${ActionTypes.SEARCH_LOCATION}${SUCCESS}`:
      newState = {
        ...state,
        locationResults: [...payload],
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
