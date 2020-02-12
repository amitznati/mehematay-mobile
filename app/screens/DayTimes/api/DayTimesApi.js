import BaseApi from '../../../sdk/BaseApi';
import selectors from './DayTimesSelectors';

export const ActionTypes = {
  UPDATE_DATA: 'UPDATE_DATA',
};
export default class DayTimesApi extends BaseApi {
  updateData = data => {
    this.dispatchStoreAction({
      type: ActionTypes.UPDATE_DATA,
      payload: data,
    });
  };

  getDataSelector = () => {
    return selectors.getDataSelector(this.store.getState());
  };
}
