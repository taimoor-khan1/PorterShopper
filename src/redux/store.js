import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import AuthReducer from './slice/auth';
import ErrorReducer from './slice/error';
import LoaderReducer from './slice/loader';
import Order from './slice/order';
import ProfileReducer from './slice/profile';
import AppState from './slice/appstate';
import YourbalanceReducer from './slice/yourbalance';
import notificationList from './slice/notification';
import ContentReducer from './slice/content';
import labelsReducer from './slice/labels';
import LanguagesReducer from './slice/Languages';
import PriceReducer from './slice/price';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Loader: LoaderReducer,
  Error: ErrorReducer,
  Profile: ProfileReducer,
  Order: Order,
  AppState: AppState,
  yourbalance: YourbalanceReducer,
  notificationList: notificationList,
  content: ContentReducer,
  labels: labelsReducer,
  languages: LanguagesReducer,
  Currency: PriceReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const persistor = persistStore(store);
