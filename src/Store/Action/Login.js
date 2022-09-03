import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

import Axios from '../../network/index';
import {ACCESSTOKEN, LOGIN, LOGOUT} from '../ActionType';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';

export const LoginUser = (email, password, response) => {
  return async (dispatch, getState) => {
    var postData = {email: email, password: password};
    console.log(postData);

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    const onSuccess = ({data}) => {
      console.log('success ========== >>>>>>>>> ', data);

      dispatch({
        type: ACCESSTOKEN,
        token: data.data.token,
      });

      saveDataToStorage(data.data.token);

      // if user is not verified then 2 else 1
      if (data.status === 2) {
        response({success: 2, error: null});
      } else {
        response({success: 1, error: null});
      }
    };
    const onFailure = error => {
      let errorMsg = utils.showResponseError(error);
      response({success: 0, error: errorMsg});
    };
    Axios.post(CONSTANTS.API_CALLS.LOGIN, formData)
      .then(onSuccess)
      .catch(onFailure);
  };
};

export const VerifyOtpAndLogin = (email, otp, response) => {
  return async (dispatch, getState) => {
    var postData = {email: email, otp: otp};

    console.log('VerifyOtpAndLogin =========== <<<>>>>>> ', postData);

    const onSuccess = ({data}) => {
      dispatch({
        type: ACCESSTOKEN,
        token: data.data.token,
      });

      saveDataToStorage(data.data.token);

      response({success: 1, error: null});
    };

    const onFailure = error => {
      let errorMsg = utils.showResponseError(error);
      response({success: 0, error: errorMsg});
    };

    Axios.post(CONSTANTS.API_CALLS.VERIFY_OTP, postData)
      .then(onSuccess)
      .catch(onFailure);
  };
};

const saveDataToStorage = userData => {
  AsyncStorage.setItem('user', JSON.stringify(userData));
};

export const Authorization = data => {
  return async (dispatch, getState) => {
    dispatch({
      type: ACCESSTOKEN,
      token: data,
    });
  };
};

export const Logout = data => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;

    const onSuccess = ({data}) => {
      if (data.message === 'Successfully logged out') {
        dispatch({
          type: ACCESSTOKEN,
          token: null,
        });

        // RemoveFCMToken(user.id);
        removeDataFromStorage();
      }
    };

    const onFailure = error => {
      console.log(
        'Logout ==============>>>>>>>>>>>>> ',
        utils.showResponseError(error),
      );
    };

    Axios.get(CONSTANTS.API_CALLS.SIGN_OUT, {
      headers: {
        Authorization: token,
      },
    })
      .then(onSuccess)
      .catch(onFailure);
  };
};

const removeDataFromStorage = userData => {
  AsyncStorage.removeItem('user');
};

const RemoveFCMToken = async userId => {
  if (userId !== undefined) {
    try {
      await database()
        .ref(CONSTANTS.FIREBASE.TOKEN)
        .child(userId.toString())
        .set('')
        .then(() => console.log('Remove FCM Token.'));
    } catch (error) {
      console.log('error ====>', error);
    }
  }
};

// Google Login Here
export const GoogleLoginUser = (data, responsee) => {
  let name = data.displayName;
  let email = data.email;
  let socialToken = data.uid;

  var postData = {email: email, name: name, social_token: socialToken};

  return (dispatch, getState) => {
    Axios.post(`${CONSTANTS.API_CALLS.GOOGLE_LOGIN_URL}`, postData)
      .then(response => {
        // console.log('responseeeeeeee==>>>>', response.data.data);
        dispatch({
          type: LOGIN,
          Login: response.data.data,
        });
        dispatch({
          type: ACCESSTOKEN,
          token: response.data.data.token,
        });
        saveDataToStorage(response.data.data.token);

        // if user is not verified then 2 else 1
        if (data.status === 2) {
          responsee({success: 2, error: null});
        } else {
          responsee({success: 1, error: null});
        }
      })
      .catch(error => {
        let errorMsg = utils.showResponseError(error);
        responsee({success: 0, error: errorMsg});
      });
  };
};

// Facebook Login Here
export const FacebookLoginUser = (data, responsee) => {
  console.log('facebook data ====================>');
  let name = data.displayName;
  let email = data.email;
  let socialToken = data.uid;

  var postData = {email: email, name: name, social_token: socialToken};

  return (dispatch, getState) => {
    Axios.post(`${CONSTANTS.API_CALLS.FACEOOK_LOGIN_URL}`, postData)
      .then(response => {
        // console.log('responseeeeeeee==>>>>', response.data.data);
        dispatch({
          type: LOGIN,
          Login: response.data.data,
        });
        dispatch({
          type: ACCESSTOKEN,
          token: response.data.data.token,
        });
        saveDataToStorage(response.data.data.token);

        // if user is not verified then 2 else 1
        if (data.status === 2) {
          responsee({success: 2, error: null});
        } else {
          responsee({success: 1, error: null});
        }
      })
      .catch(error => {
        let errorMsg = utils.showResponseError(error);
        responsee({success: 0, error: errorMsg});
      });
  };
};

// Apple Login Here
export const AppleLoginUser = (data, responsee) => {
  console.log('facebook data ====================>');
  let name = data.displayName;
  let email = data.email;
  let socialToken = data.uid;

  var postData = {email: email, name: name, social_token: socialToken};

  return (dispatch, getState) => {
    Axios.post(`${CONSTANTS.API_CALLS.APPLE_LOGIN_URL}`, postData)
      .then(response => {
        // console.log('responseeeeeeee==>>>>', response.data.data);
        dispatch({
          type: LOGIN,
          Login: response.data.data,
        });
        dispatch({
          type: ACCESSTOKEN,
          token: response.data.data.token,
        });
        saveDataToStorage(response.data.data.token);

        // if user is not verified then 2 else 1
        if (data.status === 2) {
          responsee({success: 2, error: null});
        } else {
          responsee({success: 1, error: null});
        }
      })
      .catch(error => {
        let errorMsg = utils.showResponseError(error);
        responsee({success: 0, error: errorMsg});
      });
  };
};
