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

  getDummyPosts = () => {
    return this.serviceBase.ajax.get({url: this.getDummyPostsUrl()});
  };

  getPostById = ({payload}) => {
    return this.serviceBase.ajax.get({url: this.getDummyPostsUrl(payload.id)});
  };
}

export default new SimpleServices();
