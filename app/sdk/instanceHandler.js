import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import widgets from './widgets';
import baseReducer from './baseReducer';

let storeInstance;
const createStoreInstance = () => {
  const reducerMap = {};
  widgets.forEach(widget => {
    reducerMap[widget.config.sliceName] = widget.reducer;
  });
  reducerMap.general = baseReducer;
  return createStore(
    combineReducers(reducerMap),
    __DEV__ && composeWithDevTools(),
  );
};
export const getStoreInstance = () => {
  if (!storeInstance) {
    storeInstance = createStoreInstance();
  }
  return storeInstance;
};

let instance;
const createInstance = () => {
  const apis = {};
  widgets.forEach(widget => {
    const api = widget.api;
    apis[widget.config.apiName] = new api(getStoreInstance(), apis);
  });
  return apis;
};

export const getInstance = () => {
  if (!instance) {
    instance = createInstance();
  }
  return instance;
};

export default {
  getStoreInstance,
  getInstance,
};
