import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import OrderServices from '../services/order.service';

const initialState = {
  OrderHistory: [],
  newOrders: [],
  orderData: null,
};

export const OrderHistorySlice = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ORDER_HISTORY,
  async ({someValueOne = false, someValueTwo = false}, thunk) => {
    try {
      const response = await OrderServices.getOrderHistory();
      thunk.dispatch(orderSlice.actions.getOrderHistory(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

export const getOrderSlice = createAsyncThunk(
  CONSTANTS.API_URLS.GET_ORDER,
  async ({someValueOne = false, someValueTwo = false}, thunk) => {
    try {
      const response = await OrderServices.getOrder();
      thunk.dispatch(orderSlice.actions.saveNewOrderData(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

export const acceptOrderSlice = createAsyncThunk(
  CONSTANTS.API_URLS.ACCEPT_ORDER,
  async ({someValueOne = false, someValueTwo = false}, thunk) => {
    try {
      const response = await OrderServices.orderAccept();
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

export const getNewOrders = createAsyncThunk(
  CONSTANTS.API_URLS.NEW_ORDERS,
  async ({dummyData}, thunk) => {
    try {
      const response = await OrderServices.getNewOrders();
      thunk.dispatch(orderSlice.actions.saveNewOrders(response.data));
      return thunk.fulfillWithValue(response);
    } catch (error) {
      let err = utils.showResponseError(error);
      throw err;
    }
  },
);

const orderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    getOrderHistory: (state, action) => {
      let orderHistory = action.payload;
      state.OrderHistory = orderHistory;
    },
    saveNewOrders: (state, action) => {
      state.newOrders = action.payload.filter(
        i => i.order_status !== 'pending',
      );
    },
    saveNewOrderData: (state, action) => {
      state.orderData = action.payload;
    },
    onRejectOrder: (state, action) => {
      state.orderData = null;
    },
  },
});

export const {getOrderHistory, onRejectOrder} = orderSlice.actions;
export default orderSlice.reducer;
