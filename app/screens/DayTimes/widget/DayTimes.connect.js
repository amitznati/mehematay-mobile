import {connect} from 'react-redux';
import {getInstance} from '../../../sdk';
import DayTimesComponent from './DayTimes.component';

const dayTimesApi = getInstance().DayTimesApi;

const mapStateToProps = () => {
  return {
    sunTimes: dayTimesApi.getSunTimesSelector(),
    selectedDate: dayTimesApi.getSelectedDateSelector(),
    locationName: dayTimesApi.getSeLocationNameSelector(),
  };
};

const mapDispatchToProps = () => ({
  loadSunTimesCurrentLocation: dayTimesApi.loadSunTimesCurrentLocation,
  onDateChange: dayTimesApi.onDateChange,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DayTimesComponent);
