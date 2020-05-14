import React from 'react';
import {StyleSheet, ScrollView, Image, View} from 'react-native';
import {Layout, Text, Button, Icon, Modal} from '@ui-kitten/components';
import CustomDatePicker from './DayTimes.CustomDatePicker';
import SearchLocation from '../../../SearchLocation/widget/SearchLocation.connect';
import DayHoursView from './DayTimes.dayHoursView';
import HeDate from 'hebcal';

// const BottomTabBar = () => {
//   const [index, setIndex] = React.useState(0);
//
//   return (
//     <SafeAreaView style={{marginBottom: 8}}>
//       <TabBar selectedIndex={index} onSelect={setIndex}>
//         <Tab title={'הגר"א'} />
//         <Tab title={'מ"א'} />
//         <Tab title={'ר"ת'} />
//       </TabBar>
//     </SafeAreaView>
//   );
// };

const TimeCard = ({title, time, image}) => {
  return (
    <View style={styles.card}>
      <View style={{flex: 2}}>
        <Text>{title}</Text>
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
      searchLocationOpen: false,
    };
    this.dateRef = React.createRef();
  }
  componentDidMount(): void {
    const {loadSunTimesCurrentLocation} = this.props;
    loadSunTimesCurrentLocation();
  }

  closeSearchLocationModal = () => {
    this.setState({searchLocationOpen: false});
  };

  onSelectLocation = location => {
    this.closeSearchLocationModal();
    this.props.onSelectLocation(location);
  };

  renderDayTimes = () => {
    const {dayTimes} = this.props;
    const toRender = [];
    for (let i = 0; i < dayTimes.length; i++) {
      toRender.push(<TimeCard {...dayTimes[i]} />);
    }
    return toRender;
  };

  getHeDateString = () => {
    const dates = [
      'ניסן',
      'אייר',
      'סיון',
      'תמוז',
      'אב',
      'אלול',
      'תישרי',
      'חשון',
      'כסלו',
      'טבט',
      'שבט',
      'אדר',
    ];
    const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const {selectedDate} = this.props;
    const hebDate = HeDate.HDate(selectedDate);
    const year = HeDate.gematriya(hebDate.year);
    const month = dates[hebDate.month - 1];
    const date = HeDate.gematriya(hebDate.day);
    const day = days[selectedDate.getDay()];
    return `יום ${day} ${date} ${month} ${year}`;
  };

  render() {
    const {
      dayTimes,
      selectedDate,
      onDateChange,
      selectedLocation,
      loadCurrentLocationTimesError,
    } = this.props;
    const {searchLocationOpen} = this.state;
    return (
      <View style={styles.container}>
        <Modal
          backdropStyle={styles.backdrop}
          onBackdropPress={this.closeSearchLocationModal}
          visible={searchLocationOpen}>
          <Layout style={styles.modalContainer}>
            <SearchLocation
              onBack={this.closeSearchLocationModal}
              onSelect={this.onSelectLocation}
            />
          </Layout>
        </Modal>
        {loadCurrentLocationTimesError && (
          <View>
            <Text>loadCurrentLocationTimesError</Text>
            <Text>{loadCurrentLocationTimesError}</Text>
          </View>
        )}
        <View style={styles.scrollView}>
          <Text style={styles.text}>{this.getHeDateString()}</Text>
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
            onPress={() => this.setState({searchLocationOpen: true})}>
            שנה מיקום
          </Button>
          <DayHoursView {...{dayTimes}} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 385,
  },
  scrollView: {
    padding: 16,
    flex: 2,
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
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 400,
    height: 600,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
