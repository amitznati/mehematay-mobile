import Geolocation from '@react-native-community/geolocation';
import moment from 'moment';
import SimpleServices from '../../../sdk/services/SimpleServices';
import BaseApi from '../../../sdk/BaseApi';
import {getInstance} from '../../../sdk';
import selectors from './DayTimesSelectors';
export const ActionTypes = {
  LOAD_SUN_TIMES: 'LOAD_SUN_TIMES',
  SET_SELECTED_DATE: 'SET_SELECTED_DATE',
  SET_SELECTED_LOCATION: 'SET_SELECTED_LOCATION',
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
    this.serviceRequest(
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

  // toHHMMSS = sec => {
  //   const sec_num = parseInt(sec, 10); // don't forget the second param
  //   let hours = Math.floor(sec_num / 3600);
  //   let minutes = Math.floor((sec_num - hours * 3600) / 60);
  //   let seconds = sec_num - hours * 3600 - minutes * 60;
  //
  //   if (hours < 10) {
  //     hours = `0${hours}`;
  //   }
  //   if (minutes < 10) {
  //     minutes = `0${minutes}`;
  //   }
  //   if (seconds < 10) {
  //     seconds = `0${seconds}`;
  //   }
  //   return `${hours}:${minutes}:${seconds}`;
  // };

  onLoadSunTimesSuccess = res => {
    const payload = {...res.data.results};
    return this.getDayTimesPerAgra(payload);
  };

  getDayTimesPerAgra = res => {
    const addMinutes = (dt, minutes) => {
      return new Date(dt.getTime() + minutes * 60000);
    };
    const addHours = (dt, hours) => {
      return new Date(dt.getTime() + hours * 3600000);
    };
    const getDayHourDate = dayHourRatio => {
      return new Date(
        midnightDate.getTime() +
          dayHourRatio * 3.6e6 +
          new Date().getTimezoneOffset() * 60000,
      );
    };

    const midnightDate = new Date('2005-07-08T00:00:00+0000');
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
      retValWithTemplate.find(t => t.key === field).time = moment(
        retVal[field],
      ).format('HH:mm');
    });

    return retValWithTemplate;
  };

  onSelectLocation = async location => {
    this.setSelectedLocation(location);
    this.loadSunTimes(location.coords);
  };

  loadSunTimesCurrentLocation = async () => {
    const searchLocationApi = getInstance().SearchLocationApi;
    Geolocation.getCurrentPosition(
      res => {
        searchLocationApi.loadLocationName(res.coords).then(formattedName => {
          this.setSelectedLocation({formattedName, coords: res.coords});
          this.loadSunTimes(res.coords);
        });
      },
      error => {},
      {
        enableHighAccuracy: false,
        maximumAge: 2000,
      },
    );
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

  setSelectedLocation = selectedLocation => {
    this.dispatchStoreAction({
      type: ActionTypes.SET_SELECTED_LOCATION,
      payload: {selectedLocation},
    });
  };

  getSelectedDateSelector = () => {
    return selectors.getSelectedDateSelector(this.store.getState());
  };

  getSelectedLocationSelector = () => {
    return selectors.getSelectedLocationSelector(this.store.getState());
  };
}
