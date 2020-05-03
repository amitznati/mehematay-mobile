import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text, Icon} from '@ui-kitten/components';
import Svg, {Defs, Path, Use, G} from 'react-native-svg';

const {width} = Dimensions.get('window');

export default function DayTimesMock(props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.topWrapper}>
        <View style={styles.title}>
          <Text style={styles.titleText}>זמני היום</Text>
        </View>
        <View style={styles.locationButtonView}>
          <TouchableOpacity style={styles.locationButtonTouchable}>
            <Text style={styles.locationButtonText}>דימונה</Text>
            <Icon
              style={styles.locationButtonIcon}
              name="edit-location"
              pack="material"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.weekNavigation}>
          <TouchableOpacity>
            <Text style={styles.weekNavigationArrow}></Text>
          </TouchableOpacity>
          <Text style={styles.weekNavigationText}>יג-כ שבט תש"פ</Text>
          <TouchableOpacity>
            <Text style={styles.weekNavigationArrow}></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.weekDays}>
          {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map(day => {
            const selected = day === 'ב';
            const textStyle = styles.weekDaysDayTouchableText;
            const event = ['ב', 'ג'].includes(day);
            const eventStyle = selected
              ? styles.weekDaysEventCircleSelected
              : styles.weekDaysEventCircle;
            return (
              <TouchableOpacity key={day} style={styles.weekDaysDay}>
                <Text style={styles.weekDaysDayInWeekText}>{day}</Text>
                {selected && <View style={styles.weekDaysDayCircle} />}
                {event && <View style={eventStyle} />}
                <View style={styles.weekDaysDayTouchable}>
                  <Text style={textStyle}>יג</Text>
                  <Text style={textStyle}>18</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.openCalenderButtonView}>
        <TouchableOpacity activeOpacity={0.2} style={styles.openCalenderButtonTouchable}>
          <View style={styles.openCalenderButtonSVG}>
            <Svg
              width={170.482}
              height={39.122}
              viewBox="0 0 170.482 39.122"
              {...props}>
              <Defs>
                <Path
                  id="prefix__b"
                  fillRule="evenodd"
                  d="M159.326 0c-44.45 0-41.374 33.122-74.085 33.122C52.53 33.122 55.607 0 11.156 0h148.17z"
                />
              </Defs>
              <Use fill="#552022" xlinkHref="#prefix__b" />
              <G>
                <Path
                  fill="#F3EDD0"
                  fillRule="evenodd"
                  d="M76.964 12.51c.071-.19.161-.372.269-.542a1.02 1.02 0 011.479-.151c.48.453.928.927 1.389 1.4l4.898 5.03c.025.026.057.053.115.105.07-.085.141-.17.211-.25 0 0 2.987-3.076 5.98-6.145a1.08 1.08 0 011.889.515c.057.31-.017.629-.204.878-.314.361-.653.7-.986 1.038-.5.52-.999 1.032-1.505 1.545l-1.633 1.676-1.656 1.7c-.48.493-.954.992-1.447 1.466a1.029 1.029 0 01-1.37 0c-.396-.381-.779-.782-1.168-1.176-.55-.559-1.095-1.124-1.64-1.683-.5-.513-.998-1.032-1.504-1.545l-1.626-1.68-1.169-1.2a1.532 1.532 0 01-.326-.624c.004-.128.004-.24.004-.358z"
                />
              </G>
            </Svg>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.pageContent}>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  topWrapper: {
    paddingHorizontal: 20,
  },
  scrollView: {
    padding: 16,
    flex: 2,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 24,
  },
  titleText: {
    fontFamily: 'Assistant-Light',
    fontSize: 24,
    color: '#F3EDD0',
  },
  locationButtonView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  locationButtonTouchable: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3EDD0',
    paddingLeft: 16,
    borderRadius: 50,
  },
  locationButtonIcon: {
    height: 30,
    color: '#706F6C',
  },
  locationButtonText: {
    fontFamily: 'Assistant-Bold',
    fontSize: 16,
    color: '#706F6C',
  },
  weekNavigation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 30,
  },
  weekNavigationArrow: {
    fontFamily: 'FontAwesome5_Solid',
    fontSize: 30,
    fontWeight: 'normal',
    color: '#F3EDD0',
    lineHeight: 50,
  },
  weekNavigationText: {
    fontFamily: 'Assistant-Light',
    color: '#F3EDD0',
    fontSize: 24,
    lineHeight: 30,
  },
  weekDays: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDaysDay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 20,
  },
  weekDaysDayTouchable: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 16,
  },
  weekDaysDayTouchableText: {
    fontFamily: 'Assistant-Light',
    fontSize: 18,
    lineHeight: 18,
    color: '#706F6C',
  },
  weekDaysDayInWeekText: {
    fontFamily: 'Assistant-Regular',
    fontSize: 32,
    lineHeight: 42,
    color: '#F3EDD0',
  },
  weekDaysDayCircle: {
    height: 67,
    width: 67,
    backgroundColor: '#F3EDD0',
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
  },
  weekDaysEventCircle: {
    height: 9,
    width: 9,
    backgroundColor: '#F3EDD0',
    borderRadius: 50,
    position: 'absolute',
    bottom: 8,
  },
  weekDaysEventCircleSelected: {
    height: 9,
    width: 9,
    backgroundColor: '#60292A',
    borderRadius: 50,
    position: 'absolute',
    bottom: 10,
  },
  openCalenderButtonView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F3EDD0',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  openCalenderButtonTouchable: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 30,
    width: 70,
    borderRadius: 50,
  },
  openCalenderButtonSVG: {
    position: 'absolute',
  },
  pageContent: {
    height: 1000,
    width,
    backgroundColor: '#F3EDD0',
    //marginTop: 8,
    zIndex: -1,
  },
});
