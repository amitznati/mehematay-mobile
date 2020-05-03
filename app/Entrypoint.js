import React from 'react';
import {PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {mapping, light, dark} from '@eva-design/eva';

import {MaterialCommunityIconsPack} from './icons-packes/material-community-icons';
import {MaterialIconsPack} from './icons-packes/material-icons';
import RootNavigation from './navigation/RootNavigation';
import {ThemeContext} from './theme-context';

const themes = {light, dark};

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
      theme: 'light',
    };
  }
  // componentDidMount(): void {
  //   requestCameraPermission().then(res => {
  //     this.setState({isLocationActive: res});
  //   });
  // }

  toggleTheme = () => {
    const {theme} = this.state;
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    this.setState({theme: nextTheme});
  };

  render() {
    const {theme} = this.state;
    const currentTheme = themes[theme];
    return (
      <React.Fragment>
        <IconRegistry icons={[MaterialIconsPack, MaterialCommunityIconsPack]} />
        <ThemeContext.Provider value={{theme, toggleTheme: this.toggleTheme}}>
          <ApplicationProvider mapping={mapping} theme={currentTheme}>
            <NavigationContainer>
              <RootNavigation />
            </NavigationContainer>
          </ApplicationProvider>
        </ThemeContext.Provider>
      </React.Fragment>
    );
  }
}
