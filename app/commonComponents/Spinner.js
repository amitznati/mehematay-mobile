import {connect} from 'react-redux';
import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

function SpinnerWidget({spinnerOn, spinnerOptions}) {
  if (!spinnerOn) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#F3EDD0" />
    </View>
  );
}
const mapStateToProps = store => {
  return {
    spinnerOn: store.general.spinnerOn.length > 0,
    spinnerOptions: store.general.spinnerOptions,
  };
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(206,206,206,0.47)',
  },
  horizontal: {},
});

export default connect(mapStateToProps)(SpinnerWidget);
