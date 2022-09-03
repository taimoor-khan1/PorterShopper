import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CONSTANTS} from '../../constants';
import utils from '../../utils';
import profileService from '../services/profile.service';

const initialState = {
  profile: null,
};

export const profile = createAsyncThunk(
  CONSTANTS.API_URLS.GET_PROFILE,
  async ({someValueOne = false, someValueTwo = false}, thunk) => {
    try {
      const response = await profileService.profile();
      thunk.dispatch(profileSlice.actions.saveProfile(response.data.records));
      return response;
    } catch (error) {
      let err = utils.showResponseError(error);
      return err;
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveProfile: (state, action) => {
      let profileData = action.payload;
      state.profile = profileData;
    },
  },
});

// const {reducer} = profileSlice;
// export default reducer;

export const {saveProfile} = profileSlice.actions;
export default profileSlice.reducer;
