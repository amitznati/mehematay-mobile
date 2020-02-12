import {connect} from 'react-redux';
import {getInstance} from '../../../sdk';
import WidgetTemplateComponent from './WidgetTemplate.component';

const widgetTemplateApi = getInstance().WidgetTemplateApi;

const mapStateToProps = () => {
  return {
    data: widgetTemplateApi.getDataSelector(),
  };
};

const mapDispatchToProps = () => ({
  updateData: widgetTemplateApi.updateData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WidgetTemplateComponent);
