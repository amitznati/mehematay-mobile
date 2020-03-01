import SearchLocationApi from './api/SearchLocationApi';
import SearchLocationReducer from './api/SearchLocationReducer';
import SearchLocationConfig from './api/SearchLocationConfig';

export const widget = {
  api: SearchLocationApi,
  reducer: SearchLocationReducer,
  config: SearchLocationConfig,
};

export default widget;
