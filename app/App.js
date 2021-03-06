import React from 'react';
import {Provider} from 'react-redux';
import {getStoreInstance, getInstance} from './sdk';
import EntryPoint from './Entrypoint';
import Spinner from './commonComponents/Spinner';

const store = getStoreInstance();
if (__DEV__) {
  window.mehematay = {
    sdkInstance: getInstance(),
    store,
  };
}
export default function App() {
  return (
    <Provider store={store}>
      <EntryPoint />
      <Spinner />
    </Provider>
  );
}
