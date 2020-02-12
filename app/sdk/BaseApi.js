export default class BaseApi {
  constructor(store) {
    this.store = store;
  }

  dispatchStoreAction = action => {
    this.store.dispatch(action);
  };

  getServiceRequestType = type => `${type}_REQUEST`;
  getServiceSuccessType = type => `${type}_SUCCESS`;
  getServiceFailureType = type => `${type}_FAILURE`;

  serviceRequest = async (
    serviceMethod,
    payload,
    actionType,
    getSuccessPayload = res => {
      return res.data;
    },
    getErrorPayload = err => {
      return err;
    },
  ) => {
    const requestType = this.getServiceRequestType(actionType);
    const successType = this.getServiceSuccessType(actionType);
    const failureType = this.getServiceFailureType(actionType);
    this.dispatchStoreAction({type: requestType});
    try {
      const res = await serviceMethod({payload});
      const serviceRequestResponse = await Promise.resolve(
        getSuccessPayload(res),
      );
      actionType &&
        this.dispatchStoreAction({
          type: successType,
          payload: serviceRequestResponse,
        });
      return serviceRequestResponse;
    } catch (err) {
      const serviceRequestErr = await Promise.resolve(getErrorPayload(err));
      this.dispatchStoreAction({type: failureType, payload: serviceRequestErr});
      throw serviceRequestErr;
    }
  };
}
