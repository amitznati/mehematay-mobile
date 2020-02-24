import SimpleServices from './SimpleServices';
import mocks from './mocks';

class MockAxios {
  get = (url, payload) => {
    switch (url) {
      case SimpleServices.getSunTimesUrl():
        return mocks.loadSunTimes;
      case SimpleServices.getLoadLocationNameUrl():
        return mocks.loadLocationName;
    }
  };
  post = (url, data, config) => {
    return {};
  };

  put = (url, data, config) => {
    return {};
  };

  delete = (url, data, config) => {
    return {};
  };
}

class MockService {
  constructor() {
    this.mockAxios = new MockAxios();
  }
  get = ({url, config}) => {
    return this.mockAxios.get(url, {params: {...config}});
  };

  post = ({url, data, config}) => {
    return this.mockAxios.post(url, data, config);
  };

  put = ({url, data, config}) => {
    return this.mockAxios.put(url, data, config);
  };

  delete = ({url, config}) => {
    return this.mockAxios.delete(url, config);
  };

  get ajax() {
    return {
      get: this.get,
      post: this.post,
      put: this.put,
      delete: this.delete,
    };
  }
}

export default new MockService();
