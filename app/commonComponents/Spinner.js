import {connect} from 'react-redux';
import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

function SpinnerWidget({spinnerOn, spinnerOptions}) {
  return (
    <Spinner
      {...{
        visible: spinnerOn,
        textStyle: {color: '#FFF', fontSize: 24},
        ...spinnerOptions,
      }}
    />
  );
}
const mapStateToProps = store => {
  return {
    spinnerOn: store.general.spinnerOn.length > 0,
    spinnerOptions: store.general.spinnerOptions,
  };
};

export default connect(mapStateToProps)(SpinnerWidget);
