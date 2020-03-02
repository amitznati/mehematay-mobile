import BaseApi from '../../../sdk/BaseApi';
import selectors from './SearchLocationSelectors';
import SimpleServices from '../../../sdk/services/SimpleServices';

export const ActionTypes = {
  SEARCH_LOCATION: 'SEARCH_LOCATION',
  SET_SELECTED_LOCATION: 'SET_SELECTED_LOCATION',
  LOAD_LOCATION_NAME: 'LOAD_LOCATION_NAME',
};
export default class SearchLocationApi extends BaseApi {
  searchLocation = async searchInput => {
    this.serviceRequest(
      SimpleServices.searchLocation,
      {
        config: {
          q: searchInput,
          language: 'he',
        },
      },
      ActionTypes.SEARCH_LOCATION,
      this._onSuccessSearchLocation,
    );
  };

  _onSuccessSearchLocation(res) {
    const results = res && res.data && res.data.results;
    if (!results) {
      return [];
    }
    return results.map(location => ({
      formattedName: location.formatted,
      coords: {
        longitude: location.geometry.lng,
        latitude: location.geometry.lat,
      },
    }));
  }

  loadLocationName = async coords => {
    const {latitude, longitude} = coords;
    const formattedName = await this.serviceRequest(
      SimpleServices.loadLocationName,
      {
        config: {
          q: `${latitude}, ${longitude}`,
          language: 'he',
          pretty: 1,
        },
      },
      ActionTypes.LOAD_LOCATION_NAME,
      this.onLoadLocationNameSuccess,
    );
    return formattedName;
  };

  onLoadLocationNameSuccess = res => {
    return (
      res &&
      res.data &&
      res.data.results &&
      res.data.results[0] &&
      res.data.results[0].formatted
    );
  };

  getLocationResultsSelector = () => {
    return selectors.getLocationResultsSelector(this.store.getState());
  };
}
