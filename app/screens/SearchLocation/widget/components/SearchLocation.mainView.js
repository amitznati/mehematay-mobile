import React from 'react';
import {ScrollView, StyleSheet, View, KeyboardAvoidingView} from 'react-native';
import {Layout, Text, Card} from '@ui-kitten/components';
import {IconButton} from '../../../../commonComponents';
import SearchInput from './SearchLocation.searchInput';

export default function SearchLocationView(props) {
  const {locationResults, searchLocation, onBack, onSelect} = props;

  const onSelectLocation = location => {
    onSelect(location);
  };

  const renderLocationItem = location => {
    return (
      <Card
        key={location.formattedName}
        style={styles.locationContainer}
        onPress={() => onSelectLocation(location)}>
        <Text style={styles.locationText}>{location.formattedName}</Text>
      </Card>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={-300}>
      <IconButton
        name="arrow-left-circle-outline"
        pack="material-community"
        size={50}
        wrapperProps={{
          onPress: () => onBack(),
          style: styles.iconViewStyle,
        }}
      />
      <SearchInput onSearch={searchLocation} />
      <ScrollView keyboardShouldPersistTaps="always">
        {locationResults.map(renderLocationItem)}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingLeft: 8,
    paddingRight: 8,
  },
  iconViewStyle: {
    alignSelf: 'flex-end',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  locationText: {
    fontSize: 20,
  },
});
