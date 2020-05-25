import React from 'react';
import Hebcal from 'hebcal';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import NextPrevNavigator from './../NextPrevNavigator';
import {Calendar} from 'react-native-calendars';
import CalenderDay from './Day';
import {Text} from '@ui-kitten/components';
import Day from './Day';
import Svg, {Defs, Path, Use} from 'react-native-svg';
import ScrollSelectModal from '../ScrollSelectModal';
import {monthsArrayHe, monthsArray} from '../constants';

export default class Calender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calenderHeightAnimation: new Animated.Value(1),
      rotateAnimation: new Animated.Value(0),
      opacityAnimation: new Animated.Value(1),
      weekDaysDataAnimation: new Animated.Value(180),
      yearsModalOpen: false,
      monthsModalOpen: false,
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
        toValue: isCalenderOpen ? 1 : 550,
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
        toValue: isCalenderOpen ? 180 : 0,
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

  WeekDays = ({selectedWeek, holidays, selectedLocation}) => {
    const {onSelectDate} = this.props;
    return (
      <View style={styles.weekDays}>
        {selectedWeek.map(date => {
          const key = `${date.date.day}-${date.date.month}`;
          return (
            <Day
              key={key}
              {...date}
              onSelect={onSelectDate}
              holidays={holidays}
              selectedLocation={selectedLocation}
            />
          );
        })}
      </View>
    );
  };

  openYearsSelectModal = () => {
    this.setState({yearsModalOpen: true});
  };

  closeYearsModal = () => {
    this.setState({yearsModalOpen: false});
  };

  openMonthSelectModal = () => {
    this.setState({monthsModalOpen: true});
  };

  closeMonthModal = () => {
    this.setState({monthsModalOpen: false});
  };

  onSelectYear = item => {
    this.closeYearsModal();
    this.props.onSelectYear(item.id);
  };

  onSelectMonth = item => {
    this.closeMonthModal();
    this.props.onSelectMonth(item.id);
  };

  YearSelectModal = () => {
    const {navigationDate} = this.props;
    const years = Hebcal.range(
      navigationDate.getFullYear() - 100,
      navigationDate.getFullYear() + 100,
    );
    const yearText = year => {
      const heYear = Hebcal.gematriya(
        new Hebcal.HDate(new Date(year, 1, 1)).year,
      );
      return `${year} ${heYear}`;
    };

    const data = years.map(year => ({key: year, title: yearText(year)}));
    return (
      <ScrollSelectModal
        closeModal={this.closeYearsModal}
        data={data}
        modalOpen={this.state.yearsModalOpen}
        onSelect={this.onSelectYear}
        defaultIndex={years.indexOf(navigationDate.getFullYear())}
      />
    );
  };

  MonthSelectModal = () => {
    const {navigationDate} = this.props;
    const months = Hebcal.range(0, 11).map(monthIndex => {
      const date = new Date(navigationDate);
      date.setMonth(monthIndex);
      date.setDate(1);
      const heDate = new Hebcal.HDate(date);
      return {
        key: monthIndex,
        title: `${monthsArray[monthIndex]} ~ ${
          monthsArrayHe[heDate.month - 1]
        }`,
      };
    });
    return (
      <ScrollSelectModal
        closeModal={this.closeMonthModal}
        data={months}
        modalOpen={this.state.monthsModalOpen}
        onSelect={this.onSelectMonth}
        defaultIndex={navigationDate.getMonth()}
      />
    );
  };

  render() {
    const {DaysNames, WeekDays, YearSelectModal, MonthSelectModal} = this;
    const {
      onSelectDate,
      weekNavigationProps,
      monthAndYearNavigationProps,
      navigationDate,
      selectedDate,
      selectedWeek,
      holidays,
      selectedLocation,
    } = this.props;
    const {
      rotateAnimation,
      weekDaysDataAnimation,
      opacityAnimation,
      calenderHeightAnimation,
      yearsModalOpen,
      monthsModalOpen,
    } = this.state;
    const RotateData = rotateAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['-90deg', '90deg'],
    });

    return (
      <View>
        {yearsModalOpen && <YearSelectModal />}
        {monthsModalOpen && <MonthSelectModal />}
        <View style={styles.topWrapper}>
          <Animated.View
            style={{height: weekDaysDataAnimation, opacity: opacityAnimation}}>
            <View>
              <DaysNames />
              <WeekDays {...{selectedWeek, holidays, selectedLocation}} />
              <NextPrevNavigator {...weekNavigationProps} />
            </View>
          </Animated.View>
        </View>
        <Animated.View style={{height: calenderHeightAnimation}}>
          <View style={styles.calendarWrapper}>
            <NextPrevNavigator
              {...monthAndYearNavigationProps.year}
              main={{
                ...monthAndYearNavigationProps.year.main,
                clickAction: this.openYearsSelectModal,
              }}
            />
            <NextPrevNavigator
              {...monthAndYearNavigationProps.month}
              main={{
                ...monthAndYearNavigationProps.month.main,
                clickAction: this.openMonthSelectModal,
              }}
            />
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
                      holidays,
                      selectedLocation,
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
  yearsModalItemWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  yearsModalItemText: {
    fontFamily: 'Assistant-Light',
    fontSize: 24,
    lineHeight: 30,
    color: '#8E3032',
  },
  backdrop: {
    backgroundColor: 'rgba(66,65,62,0.5)',
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
    marginBottom: 10,
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
