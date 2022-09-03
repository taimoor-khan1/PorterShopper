import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import yourBalanceService from '../services/yourbalance.service';

const initialState = {
  getBalance: null,
  cashOrderDetail: [],
  cardOrderDetail: [],
};

export const getBalance = createAsyncThunk(
  CONSTANTS.API_URLS.GET_BALANCE,
  async ({someValueOne = false, someValueTwo = false}, thunk) => {
    try {
      const response = await yourBalanceService.getBalance();
      thunk.dispatch(yourBanlceSlice.actions.getbalance(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

export const getCashOrderDetail = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CASH_ORDER,
  async ({date}, thunk) => {
    try {
      const response = await yourBalanceService.getCashOrderDetail(date);
      thunk.dispatch(yourBanlceSlice.actions.getCashOrderDetail(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);
export const getCardOrderDetail = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CARD_ORDER,
  async ({date}, thunk) => {
    try {
      const response = await yourBalanceService.getCardOrderDetail(date);
      thunk.dispatch(yourBanlceSlice.actions.getCardOrderDetail(response.data));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

const yourBanlceSlice = createSlice({
  name: 'yourBanlceSlice',
  initialState,
  reducers: {
    getbalance: (state, action) => {
      let balanceInfo = action.payload;
      state.getBalance = balanceInfo;
    },
    getCashOrderDetail: (state, action) => {
      let cashOrder = action.payload;
      state.cashOrderDetail = cashOrder;
    },
    getCardOrderDetail: (state, action) => {
      let cardOrder = action.payload;
      state.cardOrderDetail = cardOrder;
    },
  },
  extraReducers: {
    [getCashOrderDetail.fulfilled]: (state, action) => {
      if (action.payload === 'No Record Found!') state.cashOrderDetail = [];
    },
    [getCardOrderDetail.fulfilled]: (state, action) => {
      if (action.payload === 'No Record Found!') state.cardOrderDetail = [];
    },
  },
});

export const {getbalance} = yourBanlceSlice.actions;
export default yourBanlceSlice.reducer;
