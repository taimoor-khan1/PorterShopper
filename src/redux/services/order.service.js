import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const getOrderHistory = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    console.log('error ==================> getOrderHistory', error);

    throw error;
  };

  let config = {
    headers: {
      Authorization: store.getState().Auth.accessToken,
    },
    params: {
      vendorID: store.getState().Profile.profile.grocery.id,
    },
  };

  return axios
    .get(
      CONSTANTS.API_URLS.BASE2 + CONSTANTS.API_URLS.GET_ORDER_HISTORY,
      config,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const getNewOrders = async () => {
  const onSuccess = ({data}) => {
    // console.log('res =======getNewOrders ==== ', data);

    return data;
  };

  const onFailure = error => {
    console.log('error =======getNewOrders ==== ', error.response);

    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE2 + CONSTANTS.API_URLS.NEW_ORDERS, {
      headers: {
        Authorization: store.getState().Auth.accessToken,
      },
      params: {
        vendorID: store.getState().Profile.profile.grocery.id,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const getOrder = () => {
  const onSuccess = ({data}) => {
    // console.log('response======== getOrder ', JSON.stringify(data));
    return data;
  };

  const onFailure = error => {
    console.log('error =============> getOrder:  ', error);
    throw error;
  };

  let config = {
    headers: {
      Authorization: store.getState().Auth.accessToken,
    },
    params: {
      vendorID: store.getState().Profile.profile.grocery.id,
    },
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE2 + CONSTANTS.API_URLS.GET_ORDER, config)
    .then(onSuccess)
    .catch(onFailure);
};

const orderAccept = () => {
  const formData = new FormData();
  formData.append('order_id', 1);
  formData.append('shopper_id', 29);

  const onSuccess = ({data}) => {
    console.log('response======== orderAccept ', JSON.stringify(data));
    return data;
  };

  const onFailure = error => {
    console.log('error =============> orderAccept  ', error);
    throw error;
  };

  let config = {
    headers: {
      Authorization: store.getState().Auth.accessToken,
    },
  };
  let body = {
    order_id: 1,
    shopper_id: 29,
  };

  console.log('config===', config);
  console.log(`${CONSTANTS.API_URLS.BASE2 + CONSTANTS.API_URLS.ACCEPT_ORDER}`);

  return axios
    .post(
      `${CONSTANTS.API_URLS.BASE2 + CONSTANTS.API_URLS.ACCEPT_ORDER}`,
      body,
      config,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const OrderService = {
  getOrderHistory,
  getOrder,
  orderAccept,
  getNewOrders,
};

export default OrderService;
