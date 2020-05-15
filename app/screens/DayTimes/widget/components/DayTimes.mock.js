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
import Timeline from 'react-native-timeline-flatlist';

const {width} = Dimensions.get('window');

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

export default function DayTimesMock() {
  const [isCalenderOpen, setIsCalenderOpen] = React.useState(false);
  const [calenderHeightAnimation] = React.useState(new Animated.Value(1));
  const [rotateAnimation] = React.useState(new Animated.Value(0));
  const [opacityAnimation] = React.useState(new Animated.Value(1));
  const [weekDaysDataAnimation] = React.useState(new Animated.Value(110));

  const toggleCalender = () => {
    Animated.parallel([
      Animated.timing(calenderHeightAnimation, {
        toValue: isCalenderOpen ? 1 : 320,
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

  const month = new Hebcal().months[0];
  const selectedDay = 15;
  const renderDay = day => {
    const selected = day === selectedDay;
    const textStyle = styles.weekDaysDayTouchableText;
    const event = [15, 16, 21].includes(day);
    const eventStyle = selected
      ? styles.weekDaysEventCircleSelected
      : styles.weekDaysEventCircle;
    return (
      <TouchableOpacity key={day} style={styles.weekDaysDay}>
        {selected && <View style={styles.weekDaysDayCircle} />}
        {event && <View style={eventStyle} />}
        <View style={styles.weekDaysDayTouchable}>
          <Text style={textStyle}>{Hebcal.gematriya(day)}</Text>
          <Text style={textStyle}>{day}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderWeek = week => {
    return (
      <View key={`week-${week}`} style={styles.weekDays}>
        {[0, 1, 2, 3, 4, 5, 6].map(day => {
          const dayIndex = week * 7 + day;
          return renderDay(month.days[dayIndex].day);
        })}
      </View>
    );
  };
  const CalenderDaysView = () => {
    return [0, 1, 2, 3].map(renderWeek);
  };
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
            const key = `dayInWeek-${day}`;
            return (
              <Text key={key} style={styles.weekDaysDayInWeekText}>
                {day}
              </Text>
            );
          })}
        </View>
        <Animated.View
          style={{height: weekDaysDataAnimation, opacity: opacityAnimation}}>
          <View>
            {renderWeek(2)}
            <NextPrevNavigator main={{mainValue: 'יג-כא שבט תש"פ'}} />
          </View>
        </Animated.View>
      </View>
      <Animated.View
        style={[styles.calendarWrapper, {height: calenderHeightAnimation}]}>
        <View>
          <NextPrevNavigator
            main={{
              mainValue: 'תש"פ',
              secondaryValue: '2020',
            }}
            next={{
              mainValue: 'תשפ"א',
              secondaryValue: '2021',
            }}
            prev={{
              mainValue: 'תשע"ט',
              secondaryValue: '2019',
            }}
          />
          <NextPrevNavigator
            main={{
              mainValue: 'שבט',
              secondaryValue: 'April',
            }}
            next={{
              mainValue: 'אדר',
              secondaryValue: 'May',
            }}
            prev={{
              mainValue: 'טבט',
              secondaryValue: 'March',
            }}
          />
          <CalenderDaysView />
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
      <View style={styles.pageContent}>
        <Timeline
          listViewContainerStyle={{paddingBottom: 16}}
          circleSize={20}
          circleColor="#8E3032"
          lineColor="#8E3032"
          timeContainerStyle={{minWidth: 52}}
          timeStyle={{
            fontFamily: 'Assistant-Regular',
            textAlign: 'center',
            backgroundColor: '#8E3032',
            color: '#F3EDD0',
            padding: 5,
            borderRadius: 13,
          }}
          titleStyle={{color: '#706F6C', fontFamily: 'Assistant-Bold'}}
          descriptionStyle={{color: '#706F6C', fontFamily: 'Assistant-Light'}}
          data={[
            {
              key: 'dayHour',
              title: 'שעה זמנית הגר"א',
              time: '01:08',
              description: (
                <TouchableOpacity>
                  <Text
                    style={{color: '#706F6C', fontFamily: 'Assistant-Light'}}>
                    שעה זמנית לפי הגר"א מחושבת ע"י זמן זריחה עד זמן שקיעה לחלק ל
                    12 שעות...
                    <Text style={{color: '#3d61cd'}}>פרטים</Text>
                  </Text>
                </TouchableOpacity>
              ),
            },
            {
              key: 'alotHashahar90',
              title: 'עלות השחר 90 דקות',
              time: '04:01',
            },
            {
              key: 'alotHashahar72',
              title: 'עלות השחרת 72 דקות',
              time: '04:21',
            },
            {
              key: 'misheyakir',
              title: 'זמן משיכיר',
              time: '04:47',
            },
            {
              key: 'sunrise',
              title: 'זריחה (הנץ)',
              time: '05:44',
            },
            {
              key: 'sofZmanShma',
              title: 'סוף זמן ק"ש',
              time: '09:10',
            },
            {
              key: 'sofZmanTfila',
              title: 'סוף זמן תפילה',
              time: '10:18',
            },
            {
              key: 'hazot',
              title: 'חצות היום והלילה',
              time: '12:36',
            },
            {
              key: 'minhaGdola',
              title: 'מנחה גדולה',
              time: '13:10',
            },
            {
              key: 'minhaKtana',
              title: 'מנחה קטנה',
              time: '16:36',
            },
            {
              key: 'plagMinha',
              title: 'פלג מנחה',
              time: '18:02',
            },
            {
              key: 'sunset',
              title: 'שקיעה',
              time: '19:28',
            },
            {
              key: 'tzetHakohavim',
              title: 'צאת הכוכים',
              time: '19:48',
            },
            {
              key: 'tzetHakohavimRT',
              title: 'צאת הכוכים ר"ת',
              time: '20:50',
            },
          ]}
        />
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
    //height: 1000,
    width,
    backgroundColor: '#F3EDD0',
    padding: 20,
  },
});
