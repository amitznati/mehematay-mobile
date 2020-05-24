import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  NativeModules,
} from 'react-native';
import {Text} from '@ui-kitten/components';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');
const {StatusBarManager} = NativeModules;
const MyHeader = ({navigation, title}) => {
  console.log(title);
  return (
    <View style={styles.headerWrap}>
      <View style={styles.header}>
        <TouchableOpacity
          style={{paddingLeft: 20}}
          onPress={navigation.toggleDrawer}>
          <View>
            <Icon name="menu" size={30} color="#F3EDD0" />
          </View>
        </TouchableOpacity>
        <View style={styles.titleTextWrap}>
          <Text style={styles.headerTitleStyle}>{' מאימתי '}</Text>
          {title && <Text style={styles.titleText}>{title}</Text>}
        </View>
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

export default function PageWrapper({Page, navigation, title}) {
  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      locations={[0, 0.5, 0.6, 1]}
      colors={['#8E3032', '#552022', '#552022', '#8E3032']}
      style={styles.container}>
      <MyHeader {...{navigation, title}} />
      <View style={styles.pageWrap}>
        <Page {...{navigation}} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    paddingTop: (StatusBarManager && StatusBarManager.HEIGHT) || 24,
    zIndex: -1,
  },
  headerWrap: {
    width,
    height: 70,
  },
  titleTextWrap: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    //justifyContent: 'flex-end',
    //height: 70,
  },
  titleText: {
    fontFamily: 'Assistant-Light',
    fontSize: 24,
    lineHeight: 24,
    color: '#F3EDD0',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 5,
    textShadowColor: '#000',
    paddingTop: 4,
  },
  header: {
    backgroundColor: '#8E3032',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    paddingTop: 10,
    //zIndex: 1,
  },
  headerTitleStyle: {
    fontFamily: 'drugulinclm-bold-webfont',
    fontSize: 32,
    lineHeight: 32,
    color: '#F3EDD0',
    textShadowOffset: {width: 1, height: 2},
    textShadowRadius: 5,
    textShadowColor: '#000',
  },
  linearGradient: {
    width,
    height: 5,
    zIndex: 1,
  },
  pageWrap: {},
});
