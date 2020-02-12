import {ActionTypes} from './WidgetTemplateApi';
const initialState = {
  toDos: [],
  editToDo: '',
};
// const SUCCESS = '_SUCCESS';
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
    default:
      return newState;
  }
  return newState;
};

export default reducer;
