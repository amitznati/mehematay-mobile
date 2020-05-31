import React from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  VirtualizedList,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import NextPrevNavigator from './../NextPrevNavigator';
import {Text} from '@ui-kitten/components';
import Day from './Day';
import Svg, {Defs, Path, Use} from 'react-native-svg';
import ScrollSelectModal from '../ScrollSelectModal';

const {width} = Dimensions.get('window');

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
    return (
      <View style={styles.weekDays}>
        {selectedWeek.map(data => {
          return <Day {...data} />;
        })}
      </View>
    );
  };

  MyCalender = () => {
    const {calenderWeeks = []} = this.props;
    const {WeekDays} = this;
    return calenderWeeks.map((week, index) => {
      return (
        <View key={`calenderWeek-${index}`} style={styles.calendarWrapper}>
          <WeekDays selectedWeek={week} />
        </View>
      );
    });
  };

  YearCalender = () => {
    const {yearMonths: data} = this.props;
    return (
      <SafeAreaView style={styles.modalContainer}>
        <VirtualizedList
          ref={this.scrollView_ref}
          onLayout={() =>
            this.scrollView_ref.current.scrollToIndex({
              index: 4,
              animated: false,
            })
          }
          data={data}
          initialNumToRender={3}
          renderItem={({item}) => item.item}
          keyExtractor={item => `${item.id}`}
          getItemCount={() => data.length}
          getItem={(_data, index) => {
            return {
              id: data[index].key,
              title: data[index].title,
            };
          }}
          getItemLayout={(_data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
        />
      </SafeAreaView>
    );
  };

  YearSelectModal = () => {
    const {yearSelectModalProps} = this.props;
    return (
      <ScrollSelectModal
        closeModal={this.closeYearsModal}
        {...yearSelectModalProps}
        modalOpen={this.state.yearsModalOpen}
        onSelect={this.onSelectYear}
      />
    );
  };

  MonthSelectModal = () => {
    const {monthSelectModalProps} = this.props;
    return (
      <ScrollSelectModal
        closeModal={this.closeMonthModal}
        {...monthSelectModalProps}
        modalOpen={this.state.monthsModalOpen}
        onSelect={this.onSelectMonth}
      />
    );
  };

  ExpandCalenderIcon = ({RotateData}) => {
    return (
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
            style={[
              styles.openCalenderIcon,
              {transform: [{rotate: RotateData}]},
            ]}>
            <Text style={styles.openCalenderIconText}></Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      DaysNames,
      WeekDays,
      YearSelectModal,
      MonthSelectModal,
      MyCalender,
      ExpandCalenderIcon,
    } = this;
    const {
      weekNavigationProps,
      monthAndYearNavigationProps,
      selectedWeek,
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
              <WeekDays {...{selectedWeek}} />
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
            <MyCalender />
          </View>
        </Animated.View>
        <View style={styles.openCalenderButtonView}>
          <ExpandCalenderIcon RotateData={RotateData} />
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
  calenderWeekWrap: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  openCalenderIcon: {
    position: 'absolute',
    left: 80,
    bottom: 10,
  },
  openCalenderIconText: {
    fontFamily: 'FontAwesome5_Solid',
    fontSize: 18,
    lineHeight: 18,
    color: '#F3EDD0',
  },
  openCalenderButtonSVG: {
    position: 'absolute',
  },
});
