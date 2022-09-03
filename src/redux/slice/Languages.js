import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
const initialState = {
  Languages: [],
  selectedLanguage: 'en',
  SelectedCurrency: {
    "Code": "en",
    "Currency": "usd",
    "Flag": "https://e1.pngegg.com/pngimages/934/992/png-clipart-world-flag-icons-round-usa-flag-art-thumbnail.png",
    "Language": "English",
    "key": "engilsh",
    "symbol": "$"
  },
};

const firebaseConfig = {
  apiKey: 'AIzaSyCAzg57kOtDc22sXqjVvEVVH6EY2ImbnxA',
  authDomain: 'portercustomer-d8ee0.firebaseapp.com',
  databaseURL: 'https://portercustomer-d8ee0-default-rtdb.firebaseio.com',
  projectId: 'portercustomer-d8ee0',
  storageBucket: 'portercustomer-d8ee0.appspot.com',
  messagingSenderId: '559674016382',
  appId: '1:559674016382:ios:37b577ce1c7e55e6690e2f',
};

export const getLanguages = createAsyncThunk(
  'Get_languages',
  async ({}, thunk) => {
    try {
      if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig).then(async () => {
          try {
            await database()
              .ref('languages')
              .on('value', dataSnapshot => {
                console.log('dataSnapshot', dataSnapshot.val());
                thunk.dispatch(
                  LanguagesSlice.actions.saveLanguages(dataSnapshot.val()),
                );
              });
          } catch (error) {
            console.log(' get firebase error >', error);
          }
        });
      } else {
        try {
          await database()
            .ref('languages')
            .on('value', dataSnapshot => {
              console.log('dataSnapshot', dataSnapshot.val());
              thunk.dispatch(
                LanguagesSlice.actions.saveLanguages(dataSnapshot.val()),
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
  },
);

export const LanguagesSlice = createSlice({
  name: 'Languages',
  initialState,
  reducers: {
    saveLanguages: (state, action) => {
      let languages = action.payload;
      state.Languages = languages;
    },
    updateSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    updateSelectedCurrency: (state, action) => {
      state.SelectedCurrency = action.payload;
    },
  },
});

export const {saveLanguages, updateSelectedLanguage , updateSelectedCurrency} = LanguagesSlice.actions;
export default LanguagesSlice.reducer;
