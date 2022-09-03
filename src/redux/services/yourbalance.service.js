import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const getBalance = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  let config = {
    headers: {
      Authorization: store.getState().Auth.accessToken,
    },
    params: {
      id: store.getState().Profile.profile.id,
    },
  };
  return axios
    .get(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GET_BALANCE, config)
    .then(onSuccess)
    .catch(onFailure);
};

const getCashOrderDetail = date => {
  const onSuccess = ({data}) => {
    console.log('getCashOrderDetail ===== ====== ', data);
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  let config = {
    headers: {
      Authorization: store.getState().Auth.accessToken,
    },
    params: {
      riderID: store.getState().Profile.profile.id,
      date: date,
    },
  };
  return axios
    .get(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GET_CASH_ORDER, config)
    .then(onSuccess)
    .catch(onFailure);
};

const getCardOrderDetail = date => {
  const onSuccess = ({data}) => {
    console.log('getCardOrderDetail ===== ====== ', data);

    return data;
  };

  const onFailure = error => {
    throw error;
  };

  let config = {
    headers: {
      Authorization: store.getState().Auth.accessToken,
    },
    params: {
      riderID: store.getState().Profile.profile.id,
      date: date,
    },
  };
  return axios
    .get(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.GET_CARD_ORDER, config)
    .then(onSuccess)
    .catch(onFailure);
};

const OrderService = {
  getBalance,
  getCashOrderDetail,
  getCardOrderDetail,
};
export default OrderService;
