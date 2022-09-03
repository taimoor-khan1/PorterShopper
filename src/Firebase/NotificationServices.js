import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import {CONSTANTS} from '../constants';
import Firebase from '../Firebase/firebaseConfig';
import axios from 'axios';

export async function requestUserPermission(userToken, userId) {
  Firebase();
  // await messaging().registerDeviceForRemoteMessages();

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken(userToken, userId);
  }
}

const getFcmToken = async (userToken, userId) => {
  try {
    messaging()
      .getToken()
      .then(token => {
        // console.log('getFcmToken ========== >>>>>> ', token);
        SetFcmToken(token, userToken, userId);
      });
    messaging().onTokenRefresh(token => {
      SetFcmToken(token, userToken, userId);
    });
  } catch (error) {
    console.log('get fcmToken error ', error);
  }
};

const SetFcmToken = async (token, userToken, userId) => {
  if (userId !== undefined) {
    try {
      await database()
        .ref(CONSTANTS.FIREBASE.TOKEN)
        .child('Shopper')
        .child(userId.toString())
        .set(token)
        .then(() => {});
    } catch (error) {
      console.log('error SetFcmToken ====>', error);
    }
  }

  let config = {
    headers: {
      Authorization: userToken,
    },
  };
  let data = {
    device_token: token,
  };
  const onSuccess = ({data}) => {
    console.log('user fcm token save', data);
  };
  const onFailure = error => {
    console.log('user fcm token error', error);
  };
  axios
    .post(
      CONSTANTS.API_URLS.BASE2 + CONSTANTS.API_URLS.SAVE_USER_DEVICE_TOKEN,
      data,
      config,
    )
    .then(onSuccess)
    .catch(onFailure);
};
