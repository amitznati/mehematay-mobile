import BaseApi from '../../../sdk/BaseApi';
import selectors from './SearchLocationSelectors';
import SimpleServices from '../../../sdk/services/SimpleServices';

export const ActionTypes = {
  SEARCH_LOCATION: 'SEARCH_LOCATION',
  SET_SELECTED_LOCATION: 'SET_SELECTED_LOCATION',
  LOAD_LOCATION_NAME: 'LOAD_LOCATION_NAME',
};
export default class SearchLocationApi extends BaseApi {
  searchLocation = async (searchInput, updateStore = true) => {
    return this.serviceRequest(
      SimpleServices.searchLocation,
      {
        config: {
          q: searchInput,
          language: 'he',
        },
      },
      updateStore && ActionTypes.SEARCH_LOCATION,
      this._onSuccessSearchLocation,
    );
  };

  _onSuccessSearchLocation(res) {
    const results = res && res.data && res.data.results;
    if (!results) {
      return [];
    }
    return results
      .filter(loc => loc.components._type === 'city')
      .map(loc => ({
        formattedName: loc.components.city,
        timezone: loc.annotations.timezone.name,
        coords: {
          longitude: loc.geometry.lng,
          latitude: loc.geometry.lat,
        },
      }));
  }

  getCityLocationByCoords = async coords => {
    const {latitude, longitude} = coords;
    const locationCity = await this.serviceRequest(
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
    // const cityLocation = await this.searchLocation(locationCity, false);
    return locationCity;
  };

  onLoadLocationNameSuccess = res => {
    const results = res && res.data && res.data.results;
    if (!results) {
      return [];
    }
    const loc = results[0];
    return {
      formattedName: loc.components.city || loc.components.town,
      timezone: loc.annotations.timezone.name,
      coords: {
        longitude: loc.geometry.lng,
        latitude: loc.geometry.lat,
      },
    };
  };

  getLocationResultsSelector = () => {
    return selectors.getLocationResultsSelector(this.store.getState());
  };
}
