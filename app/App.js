import React from 'react';
import {Provider} from 'react-redux';
import {getStoreInstance} from './sdk';
import EntryPoint from './Entrypoint';

const store = getStoreInstance();
export default function App() {
  return (
    <Provider store={store}>
      <EntryPoint />
    </Provider>
  );
}
