import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import {
  MYORDER,
  ACCEPTED_ORDER,
  COMPLETED__ORDER,
  ORDERDETAILS,
} from '../ActionType';

import Axios from './../../network/index';

export const getMyOrder = response => {
  return async (dispatch, getState) => {
    console.log('My ORder API');
    const token = getState().Auth.AccessToken;

    if (token !== null) {
      let config = {
        headers: {
          Authorization: token,
        },
      };
      const onSuccess = ({data}) => {
        dispatch({
          type: MYORDER,
          Myorder: data.data.records,
        });

        response({success: 1, error: null});
      };
      const onFailure = error => {
        let errormsg = utils.showResponseError(error);
        response({success: 0, error: errormsg});
      };

      Axios.get(CONSTANTS.API_CALLS.GET_MY_ORDER, config)
        .then(onSuccess)
        .catch(onFailure);
    }
  };
};

export const ignoreORacceptOrder = (id, type, response) => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    if (token !== null) {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      let postData = {
        order_id: id,
        type: type,
      };

      const onSuccess = ({data}) => {
        response({success: 1, error: null});

        if (data.message === 'Order Accepted') {
          dispatch({
            type: ACCEPTED_ORDER,
            acceptedOrderData: data.data,
          });
        }
      };

      const onFailure = error => {
        let errormsg = utils.showResponseError(error);
        response({success: 0, error: errormsg});
      };

      Axios.post(CONSTANTS.API_CALLS.ORDER_ACCEPT_REJECT, postData, config)
        .then(onSuccess)
        .catch(onFailure);
    }
  };
};

export const addReviews = (orderid, userid, ratings, comment, response) => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    if (token !== null) {
      const config = {
        headers: {
          Authorization: token,
        },
      };

      let postData = {
        order_id: orderid,
        user_id: userid,
        rating: ratings,
        comments: comment,
      };

      const onSuccess = ({data}) => {
        response({success: 1, error: null});
        console.log('submmit reviews responce', data);
      };

      const onFailure = error => {
        let errormsg = utils.showResponseError(error);
        response({success: 0, error: errormsg});
      };

      Axios.post(CONSTANTS.API_CALLS.ADD_REVIEWS, postData, config)
        .then(onSuccess)
        .catch(onFailure);
    }
  };
};

export const onCOmpleteOrder = () => {
  return (dispatch, getState) => {
    dispatch({
      type: COMPLETED__ORDER,
    });
  };
};

export const getOrderDetails = (id, response) => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    let config = {
      params: {
        order_id: id,
      },
      headers: {
        Authorization: token,
      },
    };

    const onSuccess = ({data}) => {
      dispatch({
        type: ORDERDETAILS,
        Orderdetails: data.data,
      });

      response({success: 1, error: null});
    };

    const onFailure = error => {
      let errorMsg = utils.showResponseError(error);
      response({success: 0, error: errorMsg});
    };

    Axios.get(CONSTANTS.API_CALLS.ORDER_DETAILS, config)
      .then(onSuccess)
      .catch(onFailure);
  };
};
