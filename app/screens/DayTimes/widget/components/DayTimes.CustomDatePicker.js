import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Datepicker, Text, NativeDateService} from '@ui-kitten/components';

const i18n = {
  dayNames: {
    short: ['רא', 'שנ', 'של', 'רב', 'חמ', 'שי', 'שב'],
    long: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  },
  monthNames: {
    short: [
      'ינו',
      'פבר',
      'מרץ',
      'אפר',
      'מאי',
      'יונ',
      'יול',
      'אוג',
      'ספט',
      'אוק',
      'נוב',
      'דצמ',
    ],
    long: [
      'ינואר',
      'פברואר',
      'מרץ',
      'אפריל',
      'מאי',
      'יוני',
      'יולי',
      'אוגוסט',
      'ספטמבר',
      'אוקטובר',
      'נובמבר',
      'דצמבר',
    ],
  },
};

const dateService = new NativeDateService('en', {i18n});

const DayCell = ({date}, style) => {
  const Hebcal = require('hebcal');
  return (
    <View style={[styles.dayContainer, style.container]}>
      <Text style={style.text}>{`${date.getDate()}`}</Text>
      <Text style={[style.text, styles.value]}>
        {`${Hebcal.gematriya(Hebcal.HDate(date).day)}`}
      </Text>
    </View>
  );
};
export default function CustomDatePicker({refProp, ...props}) {
  return (
    <Datepicker
      {...props}
      placement="left"
      ref={refProp}
      renderDay={DayCell}
      dateService={dateService}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  value: {
    fontSize: 12,
    fontWeight: '400',
  },
});
