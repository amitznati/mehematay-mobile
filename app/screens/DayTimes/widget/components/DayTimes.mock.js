import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Text, Icon} from '@ui-kitten/components';
import Svg, {Defs, Path, Use} from 'react-native-svg';
import Hebcal from 'hebcal';

import {Calendar} from 'react-native-calendars';
import {add} from 'react-native-reanimated';

const {width} = Dimensions.get('window');
const monthsArray = [
  'Jan',
  'Fab',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Auc',
  'Nov',
  'Dec',
];
const monthsArrayHe = [
  'ניסן',
  'אייר',
  'סיון',
  'תמוז',
  'אב',
  'אלול',
  'תשרי',
  'חשון',
  'כסלו',
  'טבט',
  'שבט',
  'אדר',
];
const NextPrevNavigator = ({main, next, prev}) => {
  const Side = ({side, mainValue, secondaryValue, clickAction}) => {
    const isNext = side === 'next';
    return (
      <TouchableOpacity
        onPress={clickAction}
        style={styles.switchMonthViewSideWrap}>
        {isNext && <Text style={styles.weekNavigationArrow}></Text>}
        <View style={styles.switchMonthViewTextWrap}>
          {mainValue && (
            <Text style={styles.switchMonthViewSideText}>{mainValue}</Text>
          )}
          {secondaryValue && (
            <Text
              style={[
                styles.switchMonthViewSideText,
                styles.switchMonthViewSideTextSecondary,
              ]}>
              {secondaryValue}
            </Text>
          )}
        </View>
        {!isNext && <Text style={styles.weekNavigationArrow}></Text>}
      </TouchableOpacity>
    );
  };

  const MainValue = ({mainValue, secondaryValue, clickAction}) => {
    return (
      <TouchableOpacity
        style={styles.switchMonthViewTextWrap}
        onPress={clickAction}>
        {mainValue && (
          <Text style={styles.weekNavigationText}>{mainValue}</Text>
        )}
        {secondaryValue && (
          <Text
            style={[styles.weekNavigationText, styles.weekNavigationTextEn]}>
            {secondaryValue}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.switchMonthView}>
      <Side {...next} side="next" />
      <MainValue {...main} />
      <Side {...prev} side="prev" />
    </View>
  );
};

const getMonthAndYearNavigationProps = (
  navigationDate,
  navigateAction = () => {},
) => {
  const heDate = new Hebcal.HDate(
    new Date(
      navigationDate.getFullYear(),
      navigationDate.getMonth(),
      navigationDate.getDate(),
    ),
  );
  console.log(navigationDate.getMonth());
  console.log(heDate);
  return {
    month: {
      next: {
        mainValue: monthsArrayHe[heDate.month === 12 ? 0 : heDate.month],
        secondaryValue:
          monthsArray[
            navigationDate.getMonth() + 1 === 12
              ? 0
              : navigationDate.getMonth() + 1
          ],
        clickAction: () => navigateAction({type: 'month', side: 'next'}),
      },
      main: {
        mainValue: monthsArrayHe[heDate.month - 1],
        secondaryValue: monthsArray[navigationDate.getMonth()],
        clickAction: () => navigateAction({type: 'month', side: 'main'}),
      },
      prev: {
        mainValue: monthsArrayHe[heDate.month === 1 ? 11 : heDate.month - 2],
        secondaryValue:
          monthsArray[
            navigationDate.getMonth() === 0 ? 11 : navigationDate.getMonth() - 1
          ],
        clickAction: () => navigateAction({type: 'month', side: 'prev'}),
      },
    },
    year: {
      next: {
        mainValue: Hebcal.gematriya(heDate.year + 1),
        secondaryValue: navigationDate.getFullYear() + 1,
        clickAction: () => navigateAction({type: 'year', side: 'next'}),
      },
      main: {
        mainValue: Hebcal.gematriya(heDate.year),
        secondaryValue: navigationDate.getFullYear(),
        clickAction: () => navigateAction({type: 'year', side: 'main'}),
      },
      prev: {
        mainValue: Hebcal.gematriya(heDate.year - 1),
        secondaryValue: navigationDate.getFullYear() - 1,
        clickAction: () => navigateAction({type: 'year', side: 'prev'}),
      },
    },
  };
};

const getSelectedWeek = (navigationDate, selectedDay) => {
  const sunday = new Date(navigationDate);
  sunday.setDate(sunday.getDate() - navigationDate.getDay());
  return [0, 1, 2, 3, 4, 5, 6].map(day => {
    const next = new Date(sunday);
    next.setDate(sunday.getDate() + day);
    const selected =
      next.getDate() === selectedDay.getDate() &&
      next.getMonth() === selectedDay.getMonth() &&
      next.getFullYear() === selectedDay.getFullYear();
    return {
      date: {
        day: next.getDate(),
        year: next.getFullYear(),
        month: next.getMonth(),
      },
      selected,
    };
  });
};

const getWeekNavigationProps = (selectedWeek, navigateAction) => {
  const fromDay = selectedWeek[0].date;
  const toDay = selectedWeek[6].date;
  const heFromDate = new Hebcal.HDate(
    new Date(fromDay.year, fromDay.month - 1, fromDay.day),
  );
  const heToDate = new Hebcal.HDate(
    new Date(toDay.year, toDay.month - 1, toDay.day),
  );
  const toDayHe = Hebcal.gematriya(heToDate.day);
  const fromDayHe = Hebcal.gematriya(heFromDate.day);
  const monthNameHe = monthsArrayHe[heFromDate.month];
  const monthName = monthsArray[fromDay.month];
  const yearHe = Hebcal.gematriya(heFromDate.year);
  const year = fromDay.year;
  const heStr = `${fromDayHe}-${toDayHe} ${monthNameHe} ${yearHe}`;
  const enStr = `${year} ${monthName} ${toDay.day}-${fromDay.day}`;
  return {
    main: {
      mainValue: heStr,
      secondaryValue: enStr,
    },
    next: {
      clickAction: () => navigateAction({type: 'week', side: 'next'}),
    },
    prev: {
      clickAction: () => navigateAction({type: 'week', side: 'prev'}),
    },
  };
};

const renderDay = ({date, state, selected, onSelect = () => {}}) => {
  if (!date) {
    return null;
  }
  const thisDate = new Date(date.year, date.month, date.day);
  const heDate = new Hebcal.HDate(
    new Date(date.year, date.month - 1, date.day),
  );
  const day = date.day;
  const textStyle = [styles.weekDaysDayTouchableText];
  const event = [15, 16, 21, 18].includes(day);
  const eventStyle = selected
    ? styles.weekDaysEventCircleSelected
    : styles.weekDaysEventCircle;
  return (
    <TouchableOpacity
      onPress={() => onSelect(thisDate)}
      key={day}
      style={styles.weekDaysDay}>
      {selected && <View style={styles.weekDaysDayCircle} />}
      <View style={styles.weekDaysDayTouchable}>
        <Text style={textStyle}>{Hebcal.gematriya(heDate.day)}</Text>
        <Text style={textStyle}>{day}</Text>
      </View>
      {event && <View style={eventStyle} />}
    </TouchableOpacity>
  );
};

export default function DayTimesMock() {
  const [isCalenderOpen, setIsCalenderOpen] = React.useState(false);
  const [calenderHeightAnimation] = React.useState(new Animated.Value(1));
  const [rotateAnimation] = React.useState(new Animated.Value(0));
  const [opacityAnimation] = React.useState(new Animated.Value(1));
  const [weekDaysDataAnimation] = React.useState(new Animated.Value(110));
  const [navigationDate, setNavigationDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const toggleCalender = () => {
    Animated.parallel([
      Animated.timing(calenderHeightAnimation, {
        toValue: isCalenderOpen ? 1 : 450,
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
        toValue: isCalenderOpen ? 110 : 0,
        duration: 500,
      }),
    ]).start(() => {
      setIsCalenderOpen(!isCalenderOpen);
    });
  };

  const onSelectDate = date => {
    setSelectedDate(date);
    setNavigationDate(date);
    if (isCalenderOpen) {
      toggleCalender();
    }
  };

  const navigateAction = ({type, side}) => {
    let addYear = 0;
    let addMonth = 0;
    let addDays = 0;
    const addToType = () => {
      if (side === 'main') {
        return 0;
      }
      return side === 'next' ? 1 : -1;
    };
    if (type === 'year') {
      addYear = addToType();
    } else if (type === 'month') {
      addMonth = addToType();
    } else if (type === 'week') {
      addDays = addToType() * 7;
    }
    const newDate = new Date(
      navigationDate.getFullYear() + addYear,
      navigationDate.getMonth() + addMonth,
      navigationDate.getDate() + addDays,
    );
    setNavigationDate(newDate);
  };
  const selectedWeek = getSelectedWeek(navigationDate, selectedDate);
  const monthAndYearNavigationProps = getMonthAndYearNavigationProps(
    navigationDate,
    navigateAction,
  );

  const RotateData = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '90deg'],
  });
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
        <View style={styles.weekDays}>
          {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map(day => {
            return (
              <Text key={day} style={styles.weekDaysDayInWeekText}>
                {day}
              </Text>
            );
          })}
        </View>
        <Animated.View
          style={{height: weekDaysDataAnimation, opacity: opacityAnimation}}>
          <View>
            <View style={styles.weekDays}>
              {selectedWeek.map(date =>
                renderDay({...date, onSelect: setSelectedDate}),
              )}
            </View>
            <NextPrevNavigator
              {...getWeekNavigationProps(selectedWeek, navigateAction)}
            />
          </View>
        </Animated.View>
      </View>
      <Animated.View style={{height: calenderHeightAnimation}}>
        <View style={styles.calendarWrapper}>
          <NextPrevNavigator {...monthAndYearNavigationProps.year} />
          <NextPrevNavigator {...monthAndYearNavigationProps.month} />
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
              const onSelect = selectedDate => {
                onSelectDate(
                  new Date(
                    selectedDate.getFullYear(),
                    selectedDate.getMonth() - 1,
                    selectedDate.getDate(),
                  ),
                );
              };
              return renderDay({
                date,
                state,
                selected,
                onSelect,
              });
            }}
            style={{
              borderWidth: 0,
              height: 450,
              padding: 0,
            }}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
              backgroundColor: 'rgba(255,255,255,0)',
              calendarBackground: 'rgba(255,255,255,0)',
              padding: 0,
              'stylesheet.calendar.main': {
                week: {
                  marginTop: 7,
                  marginBottom: 7,
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  padding: 0,
                },
              },
              // textSectionTitleColor: '#F3EDD0',
              // selectedDayBackgroundColor: '#F3EDD0',
              // selectedDayTextColor: '#8E3032',
              // todayTextColor: '#00adf5',
              // dayTextColor: '#F3EDD0',
              // textDisabledColor: '#36393b',
              // dotColor: '#00adf5',
              // selectedDotColor: '#8E3032',
              // arrowColor: 'orange',
              // disabledArrowColor: '#d9e1e8',
              // monthTextColor: 'blue',
              // indicatorColor: 'blue',
              // textDayFontFamily: 'monospace',
              // textMonthFontFamily: 'monospace',
              // textDayHeaderFontFamily: 'monospace',
              // textDayFontWeight: '300',
              // textMonthFontWeight: 'bold',
              // textDayHeaderFontWeight: '300',
              // textDayFontSize: 18,
              // textMonthFontSize: 18,
              // textDayHeaderFontSize: 18,
            }}
            markedDates={{
              '2020-05-16': {selected: true, marked: true},
              '2020-05-17': {marked: true},
              '2020-05-18': {marked: true},
              '2020-05-19': {disabled: true},
            }}
          />
        </View>
      </Animated.View>
      <View style={styles.openCalenderButtonView}>
        <TouchableOpacity
          style={styles.openCalenderButtonTouchable}
          onPress={toggleCalender}>
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
      <View style={styles.pageContent} />
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
  weekNavigation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 30,
    marginTop: 8,
  },
  weekNavigationArrow: {
    fontFamily: 'FontAwesome5_Solid',
    fontSize: 30,
    color: '#F3EDD0',
    lineHeight: 50,
  },
  weekNavigationText: {
    fontFamily: 'Assistant-Light',
    color: '#F3EDD0',
    fontSize: 24,
    lineHeight: 30,
  },
  weekNavigationTextEn: {
    fontSize: 18,
    lineHeight: 18,
  },
  weekDays: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    marginTop: 4,
  },
  weekDaysDay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  weekDaysDayTouchable: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //marginTop: 4,
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
    lineHeight: 32,
    color: '#F3EDD0',
  },
  weekDaysDayCircle: {
    height: 56,
    width: 56,
    backgroundColor: '#F3EDD0',
    borderRadius: 50,
    position: 'absolute',
    bottom: -8,
  },
  weekDaysEventCircle: {
    height: 8,
    width: 8,
    backgroundColor: '#F3EDD0',
    borderRadius: 50,
    position: 'absolute',
    bottom: -4,
  },
  weekDaysEventCircleSelected: {
    height: 8,
    width: 8,
    backgroundColor: '#60292A',
    borderRadius: 50,
    position: 'absolute',
    bottom: -4,
  },
  calendarWrapper: {
    paddingHorizontal: 20,
  },
  switchMonthView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  switchMonthViewSideWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchMonthViewLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchMonthViewRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchMonthViewTextWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  switchMonthViewSideText: {
    fontFamily: 'Assistant-Light',
    color: '#706F6C',
    fontSize: 18,
    lineHeight: 20,
    paddingHorizontal: 4,
  },
  switchMonthViewSideTextSecondary: {
    fontSize: 14,
  },
  calendarDaysView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDaysWeekRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  calendarDaysDay: {
    backgroundColor: '#F3EDD0',
    width: 50,
    height: 50,
    borderRadius: 50,
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
    height: 50,
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
    padding: 20,
  },
});
