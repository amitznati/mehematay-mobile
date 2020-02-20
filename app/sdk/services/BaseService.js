import axios from 'axios';

class BaseService {
  get = ({url, config}) => {
    return axios.get(url, {params: {...config}});
  };

  post = ({url, data, config}) => {
    return axios.post(url, data, config);
  };

  put = ({url, data, config}) => {
    return axios.put(url, data, config);
  };

  delete = ({url, config}) => {
    return axios.delete(url, config);
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

export default new BaseService();
