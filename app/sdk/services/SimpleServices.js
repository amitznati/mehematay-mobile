import BaseService from './BaseService';

class SimpleServices {
  constructor() {
    this.serviceBase = BaseService;
  }

  getDummyPostsUrl = id => {
    return `https://my-json-server.typicode.com/typicode/demo/posts${
      id ? '/' + id : ''
    }`;
  };

  getSunTimesUrl = () => {
    return 'https://api.sunrise-sunset.org/json';
  };

  getDummyPosts = () => {
    return this.serviceBase.ajax.get({url: this.getDummyPostsUrl()});
  };

  getPostById = ({payload}) => {
    return this.serviceBase.ajax.get({url: this.getDummyPostsUrl(payload.id)});
  };

  loadSunTimes = ({config}) => {
    const url = this.getSunTimesUrl();
    return this.serviceBase.ajax.get({url, config});
  };
}

export default new SimpleServices();
