import * as React from 'react';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {DayTimes} from '../screens';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
  headerRight: () => (
    <View style={styles.header}>
      <Text style={styles.headerTitleStyle}>{getTitleText(route)}</Text>
      <TouchableOpacity onPress={navigation.toggleDrawer}>
        <View>
          <Icon name="menu" size={30} color="white" />
        </View>
      </TouchableOpacity>
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
  {name: 'dayTimes', label: 'זמני היום', component: DayTimes},
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
      options={{drawerLabel: item.label}}
    />
  );
});

export default function RootNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
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
    marginRight: 20,
  },
  imageStyle: {
    flex: 1,
    width,
  },
});
