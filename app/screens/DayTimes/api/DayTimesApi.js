import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import SimpleServices from '../../../sdk/services/SimpleServices';
import BaseApi from '../../../sdk/BaseApi';
import selectors from './DayTimesSelectors';

export const ActionTypes = {
  UPDATE_DATA: 'UPDATE_DATA',
  LOAD_SUN_TIMES: 'LOAD_SUN_TIMES',
  SET_SELECTED_DATE: 'SET_SELECTED_DATE',
  SET_SELECTED_COORDS: 'SET_SELECTED_COORDS',
};
export default class DayTimesApi extends BaseApi {
  getSunTimesSelector = () => {
    return selectors.getSunTimesSelector(this.store.getState());
  };

  loadSunTimes = async (
    coords = this.getSelectedCoordsSelector(),
    date = this.getSelectedDateSelector(),
  ) => {
    this.serviceRequest(
      SimpleServices.loadSunTimes,
      {
        config: {
          lat: coords.latitude,
          lng: coords.longitude,
          formatted: 0,
          date: moment(date).format('YYYY-MM-DD'),
        },
      },
      ActionTypes.LOAD_SUN_TIMES,
      this.onLoadSunTimesSuccess,
    );
  };

  toHHMMSS = sec => {
    const sec_num = parseInt(sec, 10); // don't forget the second param
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  };

  onLoadSunTimesSuccess = res => {
    const payload = {...res.data.results};
    const dayLan = payload.day_length;
    const formatted = this.toHHMMSS(dayLan / 12);
    const retVal = {};
    retVal.dayHour = formatted;
    for (let time in payload) {
      retVal[time] = moment(payload[time]).format('HH:mm:ss');
    }
    return retVal;
  };

  loadSunTimesCurrentLocation = async () => {
    Geolocation.getCurrentPosition(res => {
      this.setSelectedCoords(res.coords);
      this.loadSunTimes(res.coords);
    });
  };

  onDateChange = async selectedDate => {
    this.setSelectedData(selectedDate);
    this.loadSunTimes(undefined, selectedDate);
  };

  setSelectedData = selectedDate => {
    this.dispatchStoreAction({
      type: ActionTypes.SET_SELECTED_DATE,
      payload: selectedDate,
    });
  };

  getSelectedDateSelector = () => {
    return selectors.getSelectedDateSelector(this.store.getState());
  };

  getSelectedCoordsSelector = () => {
    return selectors.getSelectedCoordsSelector(this.store.getState());
  };

  setSelectedCoords = coords => {
    this.dispatchStoreAction({
      type: ActionTypes.SET_SELECTED_COORDS,
      payload: coords,
    });
  };
}
