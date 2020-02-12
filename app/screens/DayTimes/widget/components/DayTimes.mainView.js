import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Layout, Text, Datepicker} from '@ui-kitten/components';
import Geolocation from '@react-native-community/geolocation';

export default function DayTimesMainView() {
  const [date, setDate] = React.useState(null);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  Geolocation.getCurrentPosition(res => {
    console.log(res);
  });

  const times = {
    sunset: '16:34:56',
    sunrise: '06:15:45',
    yakir: '',
  };

  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>יום רביעי י"ז שבט 12/02/2020</Text>
        <Text style={styles.text}>
          {date && date.toLocaleString('HE-he', options)}
        </Text>
        <Datepicker
          size="large"
          placeholder="Large"
          date={date}
          onSelect={setDate}
        />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  text: {
    textAlign: 'center',
  },
});
