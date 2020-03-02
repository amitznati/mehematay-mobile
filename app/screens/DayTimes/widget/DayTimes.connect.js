import {connect} from 'react-redux';
import {getInstance} from '../../../sdk';
import DayTimesComponent from './DayTimes.component';

const sdkInstance = getInstance();
const dayTimesApi = sdkInstance.DayTimesApi;
const mapStateToProps = () => {
  return {
    sunTimes: dayTimesApi.getSunTimesSelector(),
    selectedDate: dayTimesApi.getSelectedDateSelector(),
    selectedLocation: dayTimesApi.getSelectedLocationSelector(),
  };
};

const mapDispatchToProps = () => ({
  loadSunTimesCurrentLocation: dayTimesApi.loadSunTimesCurrentLocation,
  onDateChange: dayTimesApi.onDateChange,
  onSelectLocation: dayTimesApi.onSelectLocation,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DayTimesComponent);
