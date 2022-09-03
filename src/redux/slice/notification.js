import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import NotificationServices from '../services/Notification.service';

const initialState = {
  NotificationList: [],
};

export const NotificationListSlice = createAsyncThunk(
  CONSTANTS.API_URLS.NOTIFICATIONS,
  async ({someValueOne = false, someValueTwo = false}, thunk) => {
    try {
      const response = await NotificationServices.getNotifications();
      thunk.dispatch(
        notificationSlice.actions.getNotificationList(response.data),
      );
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

const notificationSlice = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    getNotificationList: (state, action) => {
      let NotificationList = action.payload;
      state.NotificationList = NotificationList;
    },
  },
});

// const {reducer} = profileSlice;
// export default reducer;

export const {getOrderHistory} = notificationSlice.actions;
export default notificationSlice.reducer;
