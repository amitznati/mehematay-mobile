import React from 'react';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './navigation/RootNavigation';

import {ApplicationProvider} from '@ui-kitten/components';
import {mapping, light as lightTheme, dark as darkTheme} from '@eva-design/eva';

async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission',
        message: 'need to access location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
  }
}

export default class EntryPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLocationActive: false,
    };
  }
  componentDidMount(): void {
    requestCameraPermission().then(res => {
      this.setState({isLocationActive: res});
    });
  }

  render() {
    const {isLocationActive} = this.state;
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <NavigationContainer>
          {isLocationActive && <RootNavigation />}
        </NavigationContainer>
      </ApplicationProvider>
    );
  }
}
