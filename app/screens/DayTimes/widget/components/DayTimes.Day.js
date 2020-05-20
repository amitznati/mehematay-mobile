import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from '@ui-kitten/components';
import Hebcal from 'hebcal';

export default function DayTimesDay({
  date,
  state,
  selected,
  onSelect = () => {},
  fromCalender = false,
}) {
  if (!date) {
    return null;
  }
  const isToday = someDate => {
    const today = new Date();
    return (
      someDate.getDate() === today.getDate() &&
      someDate.getMonth() === today.getMonth() &&
      someDate.getFullYear() === today.getFullYear()
    );
  };
  const thisDate = new Date(date.year, date.month - 1, date.day);
  thisDate.setHours(1);
  const heDate = new Hebcal.HDate(thisDate);
  const day = date.day;
  const disabled = state === 'disabled';
  const textStyle = [
    styles.weekDaysDayTouchableText,
    disabled ? styles.weekDaysDayTouchableTextDisabled : {},
    isToday(thisDate) ? styles.weekDaysDayTouchableTextTodayText : {},
  ];
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
}

const styles = StyleSheet.create({
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
  weekDaysDayTouchableTextTodayText: {
    color: '#234bc4',
  },
  weekDaysDayTouchableTextDisabled: {
    color: '#504f4e',
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
});
