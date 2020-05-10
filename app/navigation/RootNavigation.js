import * as React from 'react';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Drawer as UIKittenDrawer, Text} from '@ui-kitten/components';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFonts} from '@use-expo/font';
import { AppLoading } from 'expo';
import {DayTimes} from '../screens';
import DayTimesMock from '../screens/DayTimes/widget/components/DayTimes.mock';

const {width} = Dimensions.get('window');

const MyHeader = ({scene, previous, navigation}) => {
  return (
    <View
      style={{
        width,
        height: 70,
        //paddingTop: 10
      }}>
      <View
        style={{
          backgroundColor: '#8E3032',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 70,
            paddingTop: 10,
        }}>
        <TouchableOpacity
          style={{paddingLeft: 20}}
          onPress={navigation.toggleDrawer}>
          <View>
            <Icon name="menu" size={30} color="#F3EDD0" />
          </View>
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: 'drugulinclm-bold-webfont',
            fontSize: 32,
            lineHeight: 50,
            color: '#F3EDD0',
            textShadowOffset: {width: 1, height: 2},
            textShadowRadius: 5,
            textShadowColor: '#000',
          }}>
          {` מאימתי `}
        </Text>
        <View style={{width: 50}} />
      </View>
      <LinearGradient
        locations={[0, 1]}
        colors={['rgba(0,0,0,0.29)', 'rgba(71,71,71,0)']}
        style={styles.linearGradient}
      />
    </View>
  );
};

const pageWithHeader = (Page, navigation) => {
  return (
      <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          locations={[0, 0.5, 0.6, 1]}
          colors={['#8E3032', '#552022', '#552022', '#8E3032']}
          style={styles.container}>
            <MyHeader {...{navigation}} />
            <Page />
      </LinearGradient>
  );
};

const HomeWithHeader = ({scene, previous, navigation}) => {
  return pageWithHeader(HomeScreen, navigation);
};

const DayTimesWithHeader = ({scene, previous, navigation}) => {
  return pageWithHeader(DayTimes, navigation);
};

const DayTimesMockWithHeader = ({navigation}) => {
  return pageWithHeader(DayTimesMock, navigation);
};

const navigationOptions = ({navigation, route}) => ({
  header: MyHeader,
  headerMode: 'float',
});

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Button
        style={styles.shadow}
        onPress={() => navigation.navigate('dayTimes')}
        title="זמני היום"
      />
      <Text
        style={{
          paddingTop: 30,
          fontFamily: 'drugulinclm-bold-webfont',
          fontSize: 48,
        }}>
        עמית זנטי
      </Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

const routeConfig = [
  {name: 'Home', label: 'בית', component: HomeScreen},
  {
    name: 'dayTimes',
    label: 'זמני היום',
    component: DayTimes,
    // unmountOnBlur: true,
  },
  {name: 'DayTimesMock', label: 'זמני היום-mock', component: DayTimesMock},
];
const getTitleText = route => {
  const routeItem = routeConfig.find(r => r.name === route.name);
  return 'מאימתי' + ' - ' + routeItem.label;
};

const navigationsList = routeConfig.map(item => {
  const NewStack = createStackNavigator();
  function NewStackScreen() {
    return (
      <NewStack.Navigator>
        <NewStack.Screen
          name={item.name}
          component={item.component}
          options={navigationOptions}
        />
      </NewStack.Navigator>
    );
  }
  return (
    <Drawer.Screen
      key={item.name}
      name={item.name}
      component={NewStackScreen}
      options={{drawerLabel: item.label, unmountOnBlur: item.unmountOnBlur}}
    />
  );
});

const DrawerContent = ({navigation, state}) => {
  const onSelect = index => {
    console.log(state.routeNames);
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
    'FontAwesome5_Solid': require('../../assets/fonts/FontAwesome5_Solid.ttf'),

};

export default function RootNavigation() {
    let [fontsLoaded] = useFonts(customFonts);

  return fontsLoaded ? (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen key="home" name="home" component={HomeWithHeader} />
      <Drawer.Screen
        key="dayTimes"
        name="dayTimes"
        component={DayTimesWithHeader}
      />
      <Drawer.Screen
        key="dayTimesMock"
        name="dayTimesMock"
        component={DayTimesMockWithHeader}
      />
    </Drawer.Navigator>
  ) : <AppLoading />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Lato-Regular',
    paddingHorizontal: 20,
  },
  headerTitleStyle: {
    color: '#F3EDD0',
    fontFamily: 'Lato-Light',
    fontSize: 20,
    marginLeft: 20,
  },
  imageStyle: {
    flex: 1,
    width,
  },
  linearGradient: {
    width,
    height: 5,
  },
});
