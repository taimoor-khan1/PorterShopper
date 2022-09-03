import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import priceService from '../services/price.service';

const initialState = {
  CurrencyTypes: null,
};

export const getCurerencyTypes = createAsyncThunk(
  CONSTANTS.API_URLS.GET_CURRENCY_TYPE,
  async ({someValueOne = false, someValueTwo = false}, thunk) => {
    try {
      const response = await priceService.currencies();
      thunk.dispatch(currenctSlice.actions.saveCurrency(response.usd));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

const currenctSlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    saveCurrency: (state, action) => {
      state.CurrencyTypes = action.payload;
    },
  },
});

export const {saveCurrency} = currenctSlice.actions;
export default currenctSlice.reducer;
