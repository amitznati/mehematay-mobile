import React from 'react';
import {I18nManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {mapping} from '@eva-design/eva';

import {MaterialCommunityIconsPack} from './icons-packes/material-community-icons';
import {MaterialIconsPack} from './icons-packes/material-icons';
import RootNavigation from './navigation/RootNavigation';
import {ThemeContext, dark, light} from './theme';

const themes = {light, dark};
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
export default class EntryPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLocationActive: false,
      theme: 'light',
    };
  }

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
