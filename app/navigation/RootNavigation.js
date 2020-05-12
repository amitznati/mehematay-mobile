import * as React from 'react';
import {Button, View, StyleSheet, Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Drawer as UIKittenDrawer} from '@ui-kitten/components';
import {useFonts} from '@use-expo/font';
import {AppLoading} from 'expo';
import {DayTimes} from '../screens';
import DayTimesMock from '../screens/DayTimes/widget/components/DayTimes.mock';
import PageWrapper from './PageWrapper';

const {width} = Dimensions.get('window');

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate('dayTimes')}
        title="זמני היום"
      />
    </View>
  );
}

const HomeWithHeader = ({navigation}) => {
  return <PageWrapper navigation={navigation} Page={HomeScreen} />;
};
const DayTimesPage = ({navigation}) => {
  return <PageWrapper navigation={navigation} Page={DayTimes} />;
};
const DayTimesMockPage = ({navigation}) => {
  return <PageWrapper navigation={navigation} Page={DayTimesMock} />;
};

const Drawer = createDrawerNavigator();

const DrawerContent = ({navigation, state}) => {
  const onSelect = index => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <UIKittenDrawer
      data={[{title: 'בית'}, {title: 'זמני היום'}, {title: 'זמני היום-mock'}]}
      selectedIndex={state.index}
      onSelect={onSelect}
    />
  );
};
let customFonts = {
  'Assistant-Light': require('../../assets/fonts/Assistant-Light.ttf'),
  'Assistant-Bold': require('../../assets/fonts/Assistant-Bold.ttf'),
  'Assistant-Regular': require('../../assets/fonts/Assistant-Regular.ttf'),
  'drugulinclm-bold-webfont': require('../../assets/fonts/drugulinclm-bold-webfont.ttf'),
  FontAwesome5_Solid: require('../../assets/fonts/FontAwesome5_Solid.ttf'),
};

export default function RootNavigation() {
  let [fontsLoaded] = useFonts(customFonts);

  return fontsLoaded ? (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen key="home" name="home" component={HomeWithHeader} />
      <Drawer.Screen key="dayTimes" name="dayTimes" component={DayTimesPage} />
      <Drawer.Screen
        key="dayTimesMock"
        name="dayTimesMock"
        component={DayTimesMockPage}
      />
    </Drawer.Navigator>
  ) : (
    <AppLoading />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
});
