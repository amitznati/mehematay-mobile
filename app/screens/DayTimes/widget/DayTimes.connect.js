import {connect} from 'react-redux';
import {getInstance} from '../../../sdk';
import DayTimesComponent from './DayTimes.component';

const sdkInstance = getInstance();
const dayTimesApi = sdkInstance.DayTimesApi;
const mapStateToProps = () => {
  return {
    dayTimes: dayTimesApi.getDayTimesSelector(),
    selectedDate: dayTimesApi.getSelectedDateSelector(),
    selectedLocation: dayTimesApi.getSelectedLocationSelector(),
    loadCurrentLocationTimesError: dayTimesApi.getLoadCurrentLocationTimesErrorSelector(),
    navigationDate: dayTimesApi.getNavigationDateSelector(),
  };
};

const mapDispatchToProps = () => ({
  loadSunTimesCurrentLocation: dayTimesApi.loadSunTimesCurrentLocation,
  onDateChange: dayTimesApi.onDateChange,
  onSelectLocation: dayTimesApi.onSelectLocation,
  setSelectedDate: dayTimesApi.onDateChange,
  setNavigationDate: dayTimesApi.setNavigationDate,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DayTimesComponent);
