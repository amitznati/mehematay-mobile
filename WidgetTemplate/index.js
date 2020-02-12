import WidgetTemplateApi from './api/WidgetTemplateApi';
import WidgetTemplateReducer from './api/WidgetTemplateReducer';
import WidgetTemplateConfig from './api/WidgetTemplateConfig';

export const widget = {
  api: WidgetTemplateApi,
  reducer: WidgetTemplateReducer,
  config: WidgetTemplateConfig,
};

export default widget;
