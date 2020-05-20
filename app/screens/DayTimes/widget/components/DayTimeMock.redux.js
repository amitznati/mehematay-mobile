import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text, Icon, Layout, Modal} from '@ui-kitten/components';
import {Calender} from '../../../../commonComponents';
import SearchLocation from '../../../SearchLocation/widget/SearchLocation.connect';
import DayHoursView from './DayTimes.dayHoursView';

const {width} = Dimensions.get('window');

export default class DayTimesMockRedux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchLocationOpen: false,
    };
  }

  onSelectLocation = location => {
    const {onSelectLocation: parentOnSelectLocation} = this.props;
    parentOnSelectLocation(location);
    this.closeSearchLocation();
  };

  closeSearchLocation = () => {
    this.setState({searchLocationOpen: false});
  };

  render() {
    const {searchLocationOpen} = this.state;
    const {
      selectedDate,
      navigationDate,
      selectedWeek,
      weekNavigationProps,
      monthAndYearNavigationProps,
      loadCurrentLocationTimesError,
      dayTimes,
      onSelectDate,
      selectedLocation,
    } = this.props;
    return (
      <ScrollView style={styles.container}>
        <Modal
          backdropStyle={styles.backdrop}
          onBackdropPress={this.closeSearchLocation}
          visible={searchLocationOpen}>
          <Layout style={styles.modalContainer}>
            <SearchLocation
              onBack={this.closeSearchLocation}
              onSelect={this.onSelectLocation}
            />
          </Layout>
        </Modal>
        <View style={styles.topWrapper}>
          <View style={styles.title}>
            <Text style={styles.titleText}>זמני היום</Text>
          </View>
          <View style={styles.locationButtonView}>
            <TouchableOpacity
              style={styles.locationButtonTouchable}
              onPress={() => this.setState({searchLocationOpen: true})}>
              <Text style={styles.locationButtonText}>
                {loadCurrentLocationTimesError ||
                  (selectedLocation && selectedLocation.formattedName) ||
                  'no location'}
              </Text>
              <Icon
                style={styles.locationButtonIcon}
                name="edit-location"
                pack="material"
              />
            </TouchableOpacity>
          </View>
        </View>
        <Calender
          {...{
            selectedWeek,
            onSelectDate,
            weekNavigationProps,
            monthAndYearNavigationProps,
            navigationDate,
            selectedDate,
          }}
        />
        <View style={styles.pageContent}>
          <DayHoursView dayTimes={dayTimes} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    width: 400,
    height: 600,
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
    marginBottom: 6,
    marginTop: 4,
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
    height: 50,
    width: 70,
    borderRadius: 50,
  },
  openCalenderButtonSVG: {
    position: 'absolute',
  },
  pageContent: {
    minHeight: 300,
    width,
    backgroundColor: '#F3EDD0',
    padding: 20,
  },
});
