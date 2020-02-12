import {connect} from 'react-redux';
import {getInstance} from '../../../sdk';
import DayTimesComponent from './DayTimes.component';

const dayTimesApi = getInstance().DayTimesApi;

const mapStateToProps = () => {
  return {
    data: dayTimesApi.getDataSelector(),
  };
};

const mapDispatchToProps = () => ({
  updateData: dayTimesApi.updateData,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DayTimesComponent);
