import React from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import {Text} from '@ui-kitten/components';
import Hebcal from 'hebcal';
import {monthsArrayHe} from '../constants';

const isToday = someDate => {
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

const getEventText = (events = [], heDate) => {
  const newEvent = events.filter(
    e => (heDate.il && !e.CHUL_ONLY) || !heDate.il,
  );
  const eventText = newEvent.find(ev => ev.desc[2] !== 'ערב שבת');
  let text = eventText && eventText.desc[2];
  if (text === 'שבת') {
    text = heDate.getSedra('h').join(' ');
  }
  if (text && text.includes('ראש חודש')) {
    text = text.replace(
      'ראש חודש',
      `${monthsArrayHe[heDate.next().month - 1]} `,
    );
  }
  return text;
};

export default function CalenderDay({
  date,
  selected,
  onSelect = () => {},
  holidays,
  selectedLocation,
  isVisible,
}) {
  if (!date) {
    return null;
  }
  const thisDate = new Date(date.year, date.month - 1, date.day);
  thisDate.setHours(1);
  const heDate = new Hebcal.HDate(thisDate);
  if (selectedLocation && selectedLocation.coords) {
    heDate.setLocation(
      selectedLocation.coords.latitude,
      selectedLocation.coords.longitude,
    );
  }
  const day = date.day;
  const textStyle = [
    styles.weekDaysDayTouchableText,
    isToday(thisDate) ? styles.weekDaysDayTouchableTextTodayText : {},
    !isVisible ? styles.noneVisible : {},
  ];
  const events = holidays[heDate.toString()];
  const eventText = getEventText(events, heDate);
  const eventStyle = [
    styles.weekDaysEventText,
    selected ? styles.weekDaysEventTextSelected : {},
    isToday(thisDate) ? styles.weekDaysDayTouchableTextTodayText : {},
  ];
  return (
    <TouchableOpacity
      onPress={() => isVisible && onSelect(thisDate)}
      key={day}
      style={styles.weekDaysDay}>
      {selected && isVisible && (
        <View
          style={[
            styles.weekDaysDayCircle,
            eventText ? styles.weekDaysDayCircleEvent : {},
          ]}
        />
      )}
      <View style={styles.weekDaysDayTouchable}>
        <Text style={textStyle}>{Hebcal.gematriya(heDate.day)}</Text>
        <Text style={textStyle}>{day}</Text>
      </View>
      {eventText && isVisible && (
        <View style={styles.weekDaysEventWrap}>
          <Text style={eventStyle}>{eventText}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  weekDaysDay: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 16,
  },
  weekDaysDaySelected: {
    backgroundColor: '#F3EDD0',
  },
  weekDaysDayTouchable: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    height: 60,
    width: 60,
    backgroundColor: '#F3EDD0',
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
  },
  weekDaysDayCircleEvent: {
    height: 70,
    width: 70,
    bottom: -10,
  },
  weekDaysEventCircle: {
    height: 8,
    width: 8,
    backgroundColor: '#F3EDD0',
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
  },
  weekDaysEventCircleSelected: {
    height: 8,
    width: 8,
    backgroundColor: '#60292A',
    borderRadius: 50,
    position: 'absolute',
    bottom: -4,
  },
  weekDaysEventWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  weekDaysEventText: {
    fontFamily: 'Assistant-Light',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 12,
    color: '#c4c3be',
    position: 'absolute',
    width: 50,
  },
  weekDaysEventTextSelected: {
    color: '#60292A',
  },
  noneVisible: {
    color: 'rgba(96,41,42,0)'
  }
});
