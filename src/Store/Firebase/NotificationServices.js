import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import {CONSTANTS} from '../../constants';
import Firebase from './firebaseConfig';
import Axios from '../../network';

// export async function requestUserPermission(userToken, userId) {
//   // console.log(
//   //   'method start=========================+++>>>>>>>>',
//   //   userToken,
//   //   '======**************************',
//   //   userId,
//   // );
//   Firebase();
//   await messaging().registerDeviceForRemoteMessages();

//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     getFcmToken(userToken, userId);
//   }
// }

const getFcmToken = async (userToken, userId) => {
  try {
    messaging()
      .getToken()
      .then(token => {
        console.log('========== >>>>>> ', token);
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
  // const Token = useSelector(state => state.Auth.AccessToken);

  if (userId !== undefined) {
    try {
      await database()
        .ref(CONSTANTS.FIREBASE.TOKEN)
        .child(userId.toString())
        .set(token)
        .then(() => {});
    } catch (error) {
      console.log('error ====>', error);
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
  Axios.post(CONSTANTS.API_CALLS.SAVE_USER_DEVICE_TOKEN, data, config)
    .then(onSuccess)
    .catch(onFailure);
};

// const SetFcmToken = async (token, id) => {
//   console.log('set fcm token ==========>', id);

// };
