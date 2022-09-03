import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import authService from '../services/auth.service';
import database from '@react-native-firebase/database';

const initialState = {
  accessToken: null,
};

export const login = createAsyncThunk(
  CONSTANTS.API_URLS.LOGIN,
  async ({email, password}, thunk) => {
    try {
      const response = await authService.login(email, password);
      if (response.status === 1)
        thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      return thunk.rejectWithValue(err);
    }
  },
);

export const verifyOtpAndLogin = createAsyncThunk(
  CONSTANTS.API_URLS.VERIFY_OTP,
  async ({email, otp}, thunk) => {
    try {
      const response = await authService.verifyOtpAndLogin(email, otp);
      thunk.dispatch(authSlice.actions.saveAccessToken(response.data.token));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      return thunk.rejectWithValue(err);
    }
  },
);

export const logout = createAsyncThunk(
  CONSTANTS.API_URLS.LOGOUT,
  async ({accessToken, userID}, thunk) => {
    try {
      const response = await authService.logout(accessToken, userID);
      thunk.dispatch(authSlice.actions.removeAccessToken());
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      console.log('err logout', err);
      utils.errorAlert(err);
      return thunk.rejectWithValue(err);
    }
  },
);

export const deactivateAccount = createAsyncThunk(
  CONSTANTS.API_URLS.DEACTIVATE,
  async ({accessToken, userID}, thunk) => {
    try {
      const response = await authService.deactivate(accessToken, userID);
      thunk.dispatch(authSlice.actions.removeAccessToken());
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      console.log('err logout', err);
      utils.errorAlert(err);
      return thunk.rejectWithValue(err);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAccessToken: (state, action) => {
      let accessToken = action.payload;
      state.accessToken = accessToken;
      saveAccessTokenToStorage(accessToken);
    },
    removeAccessToken: (state, action) => {
      console.log('working');
      state.accessToken = null;
      removeAccessTokenFromStorage();
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {},
    [login.rejected]: (state, action) => {},
    [verifyOtpAndLogin.fulfilled]: (state, action) => {},
    [verifyOtpAndLogin.rejected]: (state, action) => {},
    [logout.fulfilled]: (state, action) => {},
    [logout.rejected]: (state, action) => {},
  },
});

const saveAccessTokenToStorage = accessToken => {
  console.log('saveAccessTokenToStorage called');
  AsyncStorage.setItem(
    CONSTANTS.CACHE_KEYS.DEFAULT_USER,
    JSON.stringify(accessToken),
  );
};

const removeAccessTokenFromStorage = () => {
  AsyncStorage.removeItem(CONSTANTS.CACHE_KEYS.DEFAULT_USER);
};

export const {saveAccessToken, removeAccessToken} = authSlice.actions;
export default authSlice.reducer;
