import DayTimesApi from './api/DayTimesApi';
import DayTimesReducer from './api/DayTimesReducer';
import DayTimesConfig from './api/DayTimesConfig';

export const widget = {
  api: DayTimesApi,
  reducer: DayTimesReducer,
  config: DayTimesConfig,
};

export default widget;
