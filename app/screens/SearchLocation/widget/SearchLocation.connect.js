import {connect} from 'react-redux';
import {getInstance} from '../../../sdk';
import SearchLocationComponent from './SearchLocation.component';

const searchLocationApi = getInstance().SearchLocationApi;

const mapStateToProps = () => {
  return {
    locationResults: searchLocationApi.getLocationResultsSelector(),
  };
};

const mapDispatchToProps = () => ({
  searchLocation: searchLocationApi.searchLocation,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchLocationComponent);
