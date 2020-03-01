import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Image, View} from 'react-native';
import {Layout, Text, Tab, TabBar, Button, Icon} from '@ui-kitten/components';
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
        <Text style={{textAlign: 'left'}}>{time}</Text>
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
    const {loadSunTimesCurrentLocation} = this.props;
    loadSunTimesCurrentLocation();
  }

  navigateToSearchLocation = () => {
    const {navigation, route} = this.props;
    route.params = {name: 'Amit'};
    navigation.navigate('searchLocation');
  };

  render() {
    const {sunTimes, selectedDate, onDateChange, selectedLocation} = this.props;
    return (
      <Layout style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.text}>יום שלישי ל' שבט תש"פ</Text>
          <Text style={styles.text}>
            {selectedDate && selectedDate.toLocaleDateString()}
          </Text>
          <Text style={styles.text}>
            {selectedLocation && selectedLocation.formattedName}
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
            labelStyle={{fontSize: 16, textAlign: 'left'}}
          />
          <Button
            style={styles.link}
            icon={style => (
              <Icon {...style} name="edit-location" pack="material" />
            )}
            onPress={this.navigateToSearchLocation}>
            שנה מיקום
          </Button>
          <TimeCard name="זריחה" time={sunTimes.sunrise} image={sunriseImage} />
          <TimeCard name="שקיעה" time={sunTimes.sunset} image={sunsetImage} />
          <TimeCard name="אורך היום" time={sunTimes.dayLength} />
          <TimeCard name="שעה זמנית" time={sunTimes.dayHour} />
          <Text category="h5">זמני היום לפי שיטת:</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 4,
    borderWidth: 0.8,
    borderColor: '#d6d7da',
    marginBottom: 8,
  },
  item: {
    textAlign: 'left',
  },
  sunImage: {
    width: 25,
    height: 25,
  },
  link: {
    marginBottom: 10,
    marginTop: 10,
  },
});
