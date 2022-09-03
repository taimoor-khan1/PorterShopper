import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import Axios from './../../network/index';

export const updateRiderStatus = response => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    console.log('getState(================', token);

    if (token !== null) {
      const options = {
        headers: {
          //   'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      };

      let status = {
        status: 'online',
      };

      const onSuccess = ({data}) => {
        response({success: 1, error: null});
      };

      const onFailure = error => {
        let errorMsg = utils.showResponseError(error);
        response({success: 0, error: errorMsg});
      };

      Axios.post(CONSTANTS.API_CALLS.UPDATE_PROFILE, status, options)
        .then(onSuccess)
        .catch(onFailure);
    }
  };
};

export const updateOrderStatus = (orderid, statusType, response) => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    console.log('update order status methood called ');

    if (token !== null) {
      const options = {
        headers: {
          //   'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      };

      let status = {
        order_id: orderid,
        status: statusType,
      };

      const onSuccess = ({data}) => {
        console.log(
          'Update order status api data========>>>>>>>>>>>>>>>>',
          data,
        );
        response({success: 1, error: null});
      };

      const onFailure = error => {
        let errorMsg = utils.showResponseError(error);
        console.log('on update order error===================', error);
        response({success: 0, error: errorMsg});
      };

      Axios.post(CONSTANTS.API_CALLS.UPDATE_ORDER_STATUS, status, options)
        .then(onSuccess)
        .catch(onFailure);
    }
  };
};
