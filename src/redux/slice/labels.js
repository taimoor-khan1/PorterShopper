import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCAzg57kOtDc22sXqjVvEVVH6EY2ImbnxA',
  authDomain: 'portercustomer-d8ee0.firebaseapp.com',
  databaseURL: 'https://portercustomer-d8ee0-default-rtdb.firebaseio.com',
  projectId: 'portercustomer-d8ee0',
  storageBucket: 'portercustomer-d8ee0.appspot.com',
  messagingSenderId: '559674016382',
  appId: '1:559674016382:ios:37b577ce1c7e55e6690e2f',
};

const initialState = {
  labels: {},
};

export const getLabels = createAsyncThunk('GET_LABELS', async ({}, thunk) => {
  try {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig).then(async () => {
        try {
          await database()
            .ref('1JwhhFIu33Av3k4bGbrlj5jrLU-KXVfthQZDBsnXuEGI')
            .on('value', dataSnapshot => {
              console.log('dataSnapshot', dataSnapshot.val());
              thunk.dispatch(
                getLabelSlice.actions.saveLabels(dataSnapshot.val()),
              );
            });
        } catch (error) {
          console.log(' get firebase error >', error);
        }
      });
    } else {
      try {
        await database()
          .ref('1JwhhFIu33Av3k4bGbrlj5jrLU-KXVfthQZDBsnXuEGI')
          .on('value', dataSnapshot => {
            // console.log('dataSnapshot', dataSnapshot.val());
            thunk.dispatch(
              getLabelSlice.actions.saveLabels(dataSnapshot.val()),
            );
          });
      } catch (error) {
        console.log(' get firebase error >', error);
      }
    }

    return response;
  } catch (error) {
    let err = utils.showResponseError(error);
    return err;
  }
});

export const getLabelSlice = createSlice({
  name: 'labels',
  initialState,
  reducers: {
    saveLabels: (state, action) => {
      // console.log('saveLabels =========>', action);
      state.labels = action.payload;
    },
  },
});
export default getLabelSlice.reducer;
