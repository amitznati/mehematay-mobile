import GetLocation from 'react-native-get-location';
import moment from 'moment-timezone';
import SimpleServices from '../../../sdk/services/SimpleServices';
import BaseApi from '../../../sdk/BaseApi';
import selectors from './DayTimesSelectors';
export const ActionTypes = {
  LOAD_SUN_TIMES: 'LOAD_SUN_TIMES',
  SET_SELECTED_DATE: 'SET_SELECTED_DATE',
  SET_SELECTED_LOCATION: 'SET_SELECTED_LOCATION',
  LOAD_CURRENT_LOCATION_TIMES_ERROR: 'LOAD_CURRENT_LOCATION_TIMES_ERROR',
  SET_NAVIGATION_DATE: 'SET_NAVIGATION_DATE',
};

const dayTimesTemplateObj = [
  {key: 'dayHour', title: 'שעה זמנית הגר"א'},
  {key: 'alotHashahar90', title: 'עלות השחר 90 דקות'},
  {key: 'alotHashahar72', title: 'עלות השחרת 72 דקות'},
  {key: 'misheyakir', title: 'זמן משיכיר'},
  {key: 'sunrise', title: 'זריחה (הנץ)'},
  {key: 'sofZmanShma', title: 'סוף זמן ק"ש'},
  {key: 'sofZmanTfila', title: 'סוף זמן תפילה'},
  {key: 'hazot', title: 'חצות היום והלילה'},
  {key: 'minhaGdola', title: 'מנחה גדולה'},
  {key: 'minhaKtana', title: 'מנחה קטנה'},
  {key: 'plagMinha', title: 'פלג מנחה'},
  {key: 'sunset', title: 'שקיעה'},
  {key: 'tzetHakohavim', title: 'צאת הכוכים'},
  {key: 'tzetHakohavimRT', title: 'צאת הכוכים ר"ת'},
];
export default class DayTimesApi extends BaseApi {
  getDayTimesSelector = () => {
    return selectors.getDayTimesSelector(this.store.getState());
  };

  loadSunTimes = async (coords, date = this.getSelectedDateSelector()) => {
    await this.serviceRequest(
      SimpleServices.loadSunTimes,
      {
        config: {
          lat: coords.latitude, // 31.0579367
          lng: coords.longitude, // 35.0389234
          formatted: 0,
          date: moment(date).format('YYYY-MM-DD'),
        },
      },
      ActionTypes.LOAD_SUN_TIMES,
      this.onLoadSunTimesSuccess,
    );
  };

  onLoadSunTimesSuccess = res => {
    const payload = {...res.data.results};
    return this.getDayTimesPerAgra(payload);
  };

  getDayTimesPerAgra = res => {
    const location = this.getSelectedLocationSelector();
    const addMinutes = (dt, minutes) => {
      return new Date(dt.getTime() + minutes * 60000);
    };
    const addHours = (dt, hours) => {
      return new Date(dt.getTime() + hours * 3600000);
    };
    const getDayHourDate = dayHourRatio => {
      return new Date(
        1120780800000 +
          dayHourRatio * 3600000 +
          new Date().getTimezoneOffset() * 60000,
      );
    };
    const {sunrise, sunset} = res;
    const retVal = {};
    retVal.sunrise = new Date(sunrise);
    retVal.sunset = new Date(sunset);
    const dayHourRatio = (retVal.sunset - retVal.sunrise) / 1000 / 60 / 60 / 12;
    retVal.dayHour = getDayHourDate(dayHourRatio);
    retVal.alotHashahar90 = addMinutes(retVal.sunrise, dayHourRatio * -90);
    retVal.alotHashahar72 = addMinutes(retVal.sunrise, dayHourRatio * -72);
    retVal.misheyakir = addMinutes(retVal.sunrise, dayHourRatio * -50);
    retVal.sofZmanShma = addHours(retVal.sunrise, dayHourRatio * 3);
    retVal.sofZmanTfila = addHours(retVal.sunrise, dayHourRatio * 4);
    retVal.hazot = addHours(retVal.sunrise, dayHourRatio * 6);
    retVal.minhaGdola = addMinutes(retVal.hazot, dayHourRatio * 30);
    retVal.minhaKtana = addHours(retVal.sunset, dayHourRatio * -2.5);
    retVal.plagMinha = addHours(retVal.sunset, dayHourRatio * -1.25);
    retVal.tzetHakohavim = addMinutes(retVal.sunset, dayHourRatio * 18);
    retVal.tzetHakohavimRT = addMinutes(retVal.sunset, dayHourRatio * 72);
    const retValWithTemplate = JSON.parse(JSON.stringify(dayTimesTemplateObj));
    Object.keys(retVal).forEach(field => {
      retValWithTemplate.find(t => t.key === field).time = moment(retVal[field])
        .tz(location.timezone)
        .format('HH:mm');
    });

    return retValWithTemplate;
  };

  onSelectLocation = async location => {
    this.setSelectedLocation(location);
    await this.loadSunTimes(location.coords);
  };

  loadSunTimesCurrentLocation = async () => {
    this.startSpinner('loadSunTimesCurrentLocation');
    this.setSelectedDate(new Date());
    GetLocation.getCurrentPosition({enableHighAccuracy: true, timeout: 15000})
      .then(res => {
        this.APIsInstances.SearchLocationApi.getCityLocationByCoords(res).then(
          this.onSelectLocation,
        );
        this.stopSpinner('loadSunTimesCurrentLocation');
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
        this.dispatchStoreAction({
          type: ActionTypes.LOAD_CURRENT_LOCATION_TIMES_ERROR,
          payload: error,
        });
        this.stopSpinner('loadSunTimesCurrentLocation');
      });
  };

  getLoadCurrentLocationTimesErrorSelector = () => {
    return selectors.getLoadCurrentLocationTimesErrorSelector(
      this.store.getState(),
    );
  };

  onDateChange = async selectedDate => {
    this.setSelectedDate(selectedDate);
    const location = this.getSelectedLocationSelector();
    if (location && location.coords) {
      await this.loadSunTimes(location.coords, selectedDate);
    }
  };

  setSelectedDate = selectedDate => {
    this.dispatchStoreAction({
      type: ActionTypes.SET_SELECTED_DATE,
      payload: selectedDate,
    });
  };

  setNavigationDate = navigationDate => {
    this.dispatchStoreAction({
      type: ActionTypes.SET_NAVIGATION_DATE,
      payload: navigationDate,
    });
  };

  setSelectedLocation = selectedLocation => {
    this.dispatchStoreAction({
      type: ActionTypes.SET_SELECTED_LOCATION,
      payload: {selectedLocation},
    });
  };

  getSelectedDateSelector = () => {
    return selectors.getSelectedDateSelector(this.store.getState());
  };

  getNavigationDateSelector = () => {
    return selectors.getNavigationDateSelector(this.store.getState());
  };

  getSelectedLocationSelector = () => {
    return selectors.getSelectedLocationSelector(this.store.getState());
  };
}
