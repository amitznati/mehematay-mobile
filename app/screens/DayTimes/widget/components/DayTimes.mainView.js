import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Text, Icon, Layout, Modal} from '@ui-kitten/components';
import {Calender} from '../../../../commonComponents';
import SearchLocation from '../../../SearchLocation/widget/SearchLocation.connect';
import DayHoursView from './DayTimes.dayHoursView';

const {width} = Dimensions.get('window');

export default class DayTimesMockMainView extends React.Component {
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

  getRefreshControl = () => {
    const {loadSunTimesCurrentLocation} = this.props;
    return (
      <RefreshControl
        refreshing={false}
        onRefresh={loadSunTimesCurrentLocation}
      />
    );
  };

  SearchLocationModal = () => {
    const {searchLocationOpen} = this.state;
    return (
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
    );
  };

  render() {
    const {SearchLocationModal} = this;
    const {
      selectedDate,
      navigationDate,
      setNavigationDate,
      loadCurrentLocationTimesError,
      dayTimes,
      setSelectedDate,
      selectedLocation,
      selectedDateFormatted,
    } = this.props;
    return (
      <ScrollView
        style={styles.container}
        refreshControl={this.getRefreshControl()}>
        <SearchLocationModal />
        <View style={styles.topWrapper}>
          {/*<View style={styles.title}>*/}
          {/*  <Text style={styles.titleText}>זמני היום</Text>*/}
          {/*</View>*/}
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
            setSelectedDate,
            navigationDate,
            setNavigationDate,
            selectedDate,
            selectedLocation,
          }}
        />
        <View style={styles.pageContent}>
          <View style={styles.selectedDateWrap}>
            <Text style={styles.selectedDateText}>
              {selectedDateFormatted.formattedDate}
            </Text>
            <Text style={styles.selectedDateText}>
              {selectedDateFormatted.formattedDateHe}
            </Text>
          </View>
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
    paddingTop: 8,
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
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  selectedDateWrap: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  selectedDateText: {
    fontFamily: 'Assistant-Regular',
    fontSize: 16,
    lineHeight: 16,
    color: '#706F6C',
    paddingHorizontal: 10,
  },
});
