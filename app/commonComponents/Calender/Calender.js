import React from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import NextPrevNavigator from './../NextPrevNavigator';
import {Calendar} from 'react-native-calendars';
import CalenderDay from './Day';
import {Text} from '@ui-kitten/components';
import DayTimesDay from '../../screens/DayTimes/widget/components/DayTimes.Day';
import Svg, {Defs, Path, Use} from 'react-native-svg';
import CalenderPropsMapper from './Calender.propsMepper';

export default class Calender extends React.Component {
  constructor(props) {
    super(props);
    this.propsMepper = new CalenderPropsMapper(props);
    this.state = {
      calenderHeightAnimation: new Animated.Value(1),
      rotateAnimation: new Animated.Value(0),
      opacityAnimation: new Animated.Value(1),
      weekDaysDataAnimation: new Animated.Value(150),
    };
  }

  toggleCalender = () => {
    const {
      calenderHeightAnimation,
      rotateAnimation,
      opacityAnimation,
      weekDaysDataAnimation,
      isCalenderOpen,
    } = this.state;
    Animated.parallel([
      Animated.timing(calenderHeightAnimation, {
        toValue: isCalenderOpen ? 1 : 500,
        duration: 500,
      }),
      Animated.timing(rotateAnimation, {
        toValue: isCalenderOpen ? 0 : 1,
        duration: 500,
      }),
      Animated.timing(opacityAnimation, {
        toValue: isCalenderOpen ? 1 : 0,
        duration: 500,
      }),
      Animated.timing(weekDaysDataAnimation, {
        toValue: isCalenderOpen ? 150 : 0,
        duration: 500,
      }),
    ]).start(() => {
      this.setState({isCalenderOpen: !isCalenderOpen});
    });
  };

  DaysNames = () => {
    return (
      <View style={styles.weekDays}>
        {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map(day => {
          return (
            <Text key={day} style={styles.weekDaysDayInWeekText}>
              {day}
            </Text>
          );
        })}
      </View>
    );
  };

  WeekDays = ({selectedWeek}) => {
    const {onSelectDate} = this.propsMepper;
    return (
      <View style={styles.weekDays}>
        {selectedWeek.map(date => {
          const key = `${date.date.day}-${date.date.month}`;
          return <DayTimesDay key={key} {...date} onSelect={onSelectDate} />;
        })}
      </View>
    );
  };

  render() {
    const {DaysNames, WeekDays} = this;
    const {
      onSelectDate,
      weekNavigationProps,
      monthAndYearNavigationProps,
      navigationDate,
      selectedDate,
      selectedWeek,
    } = this.propsMepper.mapProps(this.props);
    const {
      rotateAnimation,
      weekDaysDataAnimation,
      opacityAnimation,
      calenderHeightAnimation,
    } = this.state;
    const RotateData = rotateAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['-90deg', '90deg'],
    });

    return (
      <View>
        <View style={styles.topWrapper}>
          <Animated.View
            style={{height: weekDaysDataAnimation, opacity: opacityAnimation}}>
            <View>
              <DaysNames />
              <WeekDays {...{selectedWeek}} />
              <NextPrevNavigator {...weekNavigationProps} />
            </View>
          </Animated.View>
        </View>
        <Animated.View style={{height: calenderHeightAnimation}}>
          <View style={styles.calendarWrapper}>
            <NextPrevNavigator {...monthAndYearNavigationProps.year} />
            <NextPrevNavigator {...monthAndYearNavigationProps.month} />
            <DaysNames />
          </View>
          <View>
            <Calendar
              current={navigationDate}
              horizontal
              pagingEnabled
              hideArrows={true}
              disableMonthChange={true}
              hideDayNames={true}
              headerStyle={{display: 'none'}}
              hideExtraDays={true}
              dayComponent={({date, state}) => {
                const selected =
                  date.day === selectedDate.getDate() &&
                  date.month === selectedDate.getMonth() + 1 &&
                  `${date.year}` === `${selectedDate.getFullYear()}`;
                return (
                  <CalenderDay
                    {...{
                      date,
                      state,
                      selected,
                      onSelect: date => {
                        this.toggleCalender();
                        onSelectDate(date);
                      },
                      fromCalender: true,
                    }}
                  />
                );
              }}
              style={{
                borderWidth: 0,
                height: 450,
                padding: 0,
              }}
              theme={{
                backgroundColor: 'rgba(255,255,255,0)',
                calendarBackground: 'rgba(255,255,255,0)',
                'stylesheet.calendar.main': {
                  week: {
                    marginTop: 7,
                    marginBottom: 7,
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                  },
                },
              }}
            />
          </View>
        </Animated.View>
        <View style={styles.openCalenderButtonView}>
          <TouchableOpacity
            style={styles.openCalenderButtonTouchable}
            onPress={this.toggleCalender}>
            <View style={styles.openCalenderButtonSVG}>
              <Svg width={170} height={39.211} viewBox="0 0 170.482 39.122">
                <Defs>
                  <Path
                    id="prefix__b"
                    fillRule="evenodd"
                    d="M159.326 0c-44.45 0-41.374 33.122-74.085 33.122C52.53 33.122 55.607 0 11.156 0h148.17z"
                  />
                </Defs>
                <Use fill="#552022" xlinkHref="#prefix__b" />
              </Svg>
              <Animated.View
                style={{
                  position: 'absolute',
                  transform: [{rotate: RotateData}],
                  left: 80,
                  bottom: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'FontAwesome5_Solid',
                    fontSize: 18,
                    lineHeight: 18,
                    color: '#F3EDD0',
                  }}>
                  
                </Text>
              </Animated.View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 400,
    height: 600,
  },
  topWrapper: {
    paddingHorizontal: 20,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
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
  weekDays: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    marginTop: 4,
  },
  weekDaysDayInWeekText: {
    fontFamily: 'Assistant-Regular',
    fontSize: 32,
    lineHeight: 32,
    color: '#F3EDD0',
  },
  calendarWrapper: {
    paddingHorizontal: 20,
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
    height: 40,
    width: 70,
    borderRadius: 50,
  },
  openCalenderButtonSVG: {
    position: 'absolute',
  },
});
