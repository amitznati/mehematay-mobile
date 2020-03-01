import BaseService from './BaseService';
import MockService from './MockService';
import commonConfig from '../config';

class SimpleServices {
  constructor() {
    this.serviceBase = commonConfig.useMocks ? MockService : BaseService;
  }

  getSunTimesUrl = () => {
    return 'https://api.sunrise-sunset.org/json';
  };

  getLoadLocationNameUrl = () => {
    return 'https://api.opencagedata.com/geocode/v1/json';
  };

  loadSunTimes = ({config}) => {
    const url = this.getSunTimesUrl();
    return this.serviceBase.ajax.get({url, config});
  };

  loadLocationName = ({config}) => {
    config.key = `${commonConfig.OPEN_CAGE_API_KEY}`;
    const url = this.getLoadLocationNameUrl();
    return this.serviceBase.ajax.get({url, config});
  };

  searchLocation = ({config}) => {
    config.key = `${commonConfig.OPEN_CAGE_API_KEY}`;
    const url = this.getLoadLocationNameUrl();
    return this.serviceBase.ajax.get({url, config});
  };
}

export default new SimpleServices();
