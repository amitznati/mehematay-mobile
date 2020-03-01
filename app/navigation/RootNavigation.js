import * as React from 'react';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Drawer as UIKittenDrawer, Text} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DayTimes, SearchLocation} from '../screens';

const {width} = Dimensions.get('window');
const headerBackground = require('../../assets/images/topBarBg.png');

const navigationOptions = ({navigation, route}) => ({
  title: null,
  headerBackground: () => {
    return (
      <Image
        style={styles.imageStyle}
        source={headerBackground}
        resizeMode="cover"
      />
    );
  },
  headerLeft: () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <View>
          <Icon name="menu" size={30} color="white" />
        </View>
      </TouchableOpacity>
      <Text style={styles.headerTitleStyle}>{getTitleText(route)}</Text>
    </View>
  ),
});

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => navigation.navigate('dayTimes')}
        title="Go to notifications"
      />
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
  {name: 'searchLocation', label: 'חפש מיקום', component: SearchLocation},
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
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <UIKittenDrawer
      data={[{title: 'בית'}, {title: 'זמני היום'}]}
      selectedIndex={state.index}
      onSelect={onSelect}
    />
  );
};

export default function RootNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      {navigationsList}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    color: '#ffffff',
    fontFamily: 'Lato-Light',
    fontSize: 20,
    marginLeft: 20,
  },
  imageStyle: {
    flex: 1,
    width,
  },
});
