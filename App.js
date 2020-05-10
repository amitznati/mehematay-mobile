import React from 'react';
import {Provider} from 'react-redux';
import {getStoreInstance, getInstance} from './app/sdk';
import EntryPoint from './app/Entrypoint';

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
      </Provider>
  );
}
