import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Image, View} from 'react-native';
import {Layout, Text, Tab, TabBar} from '@ui-kitten/components';
import CustomDatePicker from './DayTimes.CustomDatePicker';
const sunriseImage = require('../../../../../assets/images/sunrise-v1_24x17.png');
const sunsetImage = require('../../../../../assets/images/sunset-v1_24x17RED.png');
const BottomTabBar = () => {
  const [index, setIndex] = React.useState(0);

  return (
    <SafeAreaView style={{marginBottom: 8}}>
      <TabBar selectedIndex={index} onSelect={setIndex}>
        <Tab title={'הגר"א'} />
        <Tab title={'מ"א'} />
        <Tab title={'ר"ת'} />
      </TabBar>
    </SafeAreaView>
  );
};

const TimeCard = ({name, time, image}) => {
  return (
    <View style={styles.card}>
      <View style={{flex: 2}}>
        <Text>{name}</Text>
      </View>
      <View style={{flex: 1}}>
        <Text style={{textAlign: 'right'}}>{time}</Text>
      </View>
      {image && (
        <View style={{flex: 1}}>
          <Image source={image} style={styles.sunImage} />
        </View>
      )}
    </View>
  );
};

export default class DayTimesMainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
    this.dateRef = React.createRef();
  }
  componentDidMount(): void {
    console.log('mount');
    const {loadSunTimesCurrentLocation} = this.props;
    loadSunTimesCurrentLocation();
  }

  componentWillUnmount(): void {
    console.log('unmount');
  }

  render() {
    const {sunTimes, selectedDate, onDateChange} = this.props;
    // const DateTitle = date => {
    //   console.log(date);
    //   return `date is ${date}`;
    // };
    return (
      <Layout style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>יום רביעי י"ז שבט 12/02/2020</Text>
          <Text style={styles.text}>
            {selectedDate && selectedDate.toLocaleString()}
          </Text>
          <CustomDatePicker
            refProp={this.dateRef}
            size="large"
            placeholder="בחר תאריך"
            date={selectedDate}
            onSelect={d => {
              onDateChange(d);
              this.dateRef.current.blur();
            }}
            label="שנה תאריך"
            labelStyle={{fontSize: 16, textAlign: 'right'}}
          />
          <TimeCard name="זריחה" time={sunTimes.sunrise} image={sunriseImage} />
          <TimeCard name="שקיעה" time={sunTimes.sunset} image={sunsetImage} />
          <TimeCard name="שעה זמנית" time={sunTimes.dayHour} />
          <Text category="h5">לפי שיטת:</Text>
          <BottomTabBar />
          <TimeCard name="הנץ" time="06:34" />
          <TimeCard name="עלות השחר" time="06:34" />
          <TimeCard name="זמן טלית ותפילין" time="17:34" />
          <TimeCard name="סוף זמן קריאת שמע" time="06:34" />
          <TimeCard name="סוף זמן תפילה" time="17:34" />
          <TimeCard name="חצות היום והלילה" time="06:34" />
          <TimeCard name="מנחה גדולה" time="06:34" />
          <TimeCard name="מנחה קטנה" time="17:34" />
          <TimeCard name="פלג המנחה" time="06:34" />
          <TimeCard name="שקיעת החמה" time="17:34" />
          <TimeCard name="צאת הכוכבים" time="17:34" />
        </ScrollView>
      </Layout>
    );
  }
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
  card: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#d6d7da',
    marginBottom: 8,
  },
  item: {
    textAlign: 'right',
  },
  sunImage: {
    width: 25,
    height: 25,
  },
});
