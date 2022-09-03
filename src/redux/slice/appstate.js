import {createSlice} from '@reduxjs/toolkit';

export const AppStateSlice = createSlice({
  name: 'loader',
  initialState: {AppState: null},
  reducers: {
    setAppState: (state, action) => {
      state.AppState = action.payload;
    },
  },
});

export const {setAppState} = AppStateSlice.actions;
export default AppStateSlice.reducer;
