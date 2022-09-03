import axios from 'axios';
import {CONSTANTS} from '../../constants';
import {store} from '../store';
import database from '@react-native-firebase/database';

const login = (email, password) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGIN, formData)
    .then(onSuccess)
    .catch(onFailure);
};

const verifyOtpAndLogin = (email, otp) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('otp', otp);

  const onSuccess = ({data}) => {
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .post(
      `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.VERIFY_OTP}`,
      formData,
    )
    .then(onSuccess)
    .catch(onFailure);
};

const logout = (accessToken, userId) => {
  const onSuccess = async ({data}) => {
    await database()
      .ref(CONSTANTS.FIREBASE.TOKEN)
      .child('Shopper')
      .child(userId.toString())
      .set('')
      .then(() => {
        console.log('token removed from for user with ID : === >>>> ', userId);
      });
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  return axios
    .get(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.LOGOUT, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const deactivate = (accessToken, userId) => {
  const onSuccess = async ({data}) => {
    await database()
      .ref(CONSTANTS.FIREBASE.TOKEN)
      .child('Shopper')
      .child(userId.toString())
      .set('')
      .then(() => {
        console.log('token removed from for user with ID : === >>>> ', userId);
      });
    return data;
  };

  const onFailure = error => {
    throw error;
  };

  const data = {
    userID: userId,
  };

  return axios
    .post(CONSTANTS.API_URLS.BASE2 + CONSTANTS.API_URLS.DEACTIVATE, data, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then(onSuccess)
    .catch(onFailure);
};

const authService = {
  login,
  logout,
  deactivate,
  verifyOtpAndLogin,
};
export default authService;
