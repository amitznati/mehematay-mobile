import React from 'react';
import SearchLocationInput from './DayTimes.SearchLocationInput';
import {ScrollView, StyleSheet} from 'react-native';
import {Layout} from '@ui-kitten/components';
import {IconButton} from '../../../../commonComponents';

export default function SearchLocationView(props) {
  return (
    <Layout style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <IconButton
          name="arrow-left-circle-outline"
          pack="material-community"
          size={40}
          wrapperProps={{
            onPress: () => props.navigation.goBack(),
            style: {margin: 5},
          }}
        />
        <SearchLocationInput />
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
});
