import * as React from 'react';
import {Button, View, StyleSheet, Dimensions} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Drawer as UIKittenDrawer} from '@ui-kitten/components';
import {DayTimes} from '../screens';
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

const Drawer = createDrawerNavigator();

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
      <Drawer.Screen key="home" name="home" component={HomeWithHeader} />
      <Drawer.Screen key="dayTimes" name="dayTimes" component={DayTimesPage} />
    </Drawer.Navigator>
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
