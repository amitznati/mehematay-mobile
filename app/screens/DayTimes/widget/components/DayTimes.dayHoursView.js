import React from 'react';
import {StyleSheet, TouchableOpacity, View, Linking} from 'react-native';
import {Text} from '@ui-kitten/components';

export default function DayHoursView({dayTimes = []}) {
  const openDetails = async () => {
    await Linking.openURL('https://www.yeshiva.org.il/calendar/timeprinciples');
  };
  if (dayTimes.length) {
    dayTimes.find(t => t.key === 'dayHour').description = (
      <TouchableOpacity onPress={openDetails}>
        <Text style={{color: '#706F6C', fontFamily: 'Assistant-Light'}}>
          שעה זמנית לפי הגר"א מחושבת ע"י זמן זריחה עד זמן שקיעה לחלק ל 12
          שעות...
          <Text style={{color: '#3d61cd'}}>פרטים</Text>
        </Text>
      </TouchableOpacity>
    );
  }
  return dayTimes.map(dayTime => {
    return (
      <View style={styles.dayTimeWrap} key={dayTime.key}>
        <View style={styles.dayTimeTitleWrap}>
          <Text style={styles.dayTimeTitle}>{dayTime.title}</Text>
          {dayTime.description}
        </View>
        <Text style={styles.timeStyle}>{dayTime.time}</Text>
      </View>
    );
  });
}

const styles = StyleSheet.create({
  dayTimeWrap: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#8E3032',
  },
  dayTimeTitleWrap: {
    width: 200,
  },
  dayTimeTitle: {
    color: '#706F6C',
    fontFamily: 'Assistant-Bold',
    fontSize: 18,
    lineHeight: 18,
  },
  dayTimeDescription: {

  },
  timeStyle: {
    fontFamily: 'Assistant-Regular',
    textAlign: 'center',
    backgroundColor: '#8E3032',
    color: '#F3EDD0',
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 40,
    borderRadius: 13,
  },
});
