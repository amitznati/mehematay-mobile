import {connect} from 'react-redux';
import {getInstance} from '../../../sdk';
import DayTimesComponent from './DayTimes.component';

const sdkInstance = getInstance();
const dayTimesApi = sdkInstance.DayTimesApi;
const searchLocationApi = sdkInstance.SearchLocationApi;
const mapStateToProps = () => {
  return {
    sunTimes: dayTimesApi.getSunTimesSelector(),
    selectedDate: dayTimesApi.getSelectedDateSelector(),
    selectedLocation: searchLocationApi.getSelectedLocationSelector(),
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
