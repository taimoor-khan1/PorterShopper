import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';

const getNotifications = () => {
  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    console.log('getOrderHistory ==== ', error);

    throw error;
  };

  let config = {
    headers: {
      Authorization: store.getState().Auth.accessToken,
    },
  };
  return axios
    .get(CONSTANTS.API_URLS.BASE2 + CONSTANTS.API_URLS.NOTIFICATIONS, config)
    .then(onSuccess)
    .catch(onFailure);
};

const NotificationService = {
  getNotifications,
};
export default NotificationService;
