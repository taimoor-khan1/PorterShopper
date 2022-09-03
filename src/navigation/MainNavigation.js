import React, {useEffect, useRef, useState} from 'react';
import {PermissionsAndroid, StyleSheet, View} from 'react-native';
import {Icon} from 'native-base';
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {requestUserPermission} from '../Firebase/NotificationServices';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import {COLORS, FONTFAMILY, SCREENS, SIZES} from '../constants';
import ErrorView from '../components/modals/ErrorView';
import Loader from '../components/modals/Loader';

import utils from '../utils';


// Screens import
import Faqs from '../screens/content/Faqs';
import Chat from '../screens/shopper/Chat/Chat';
import Settings from '../screens/shopper/Settings';
import CheckOut from '../screens/shopper/CheckOut';
import HelpAndSupport from '../screens/shopper/HelpAndSupport';

import ShoperLogin from '../screens/shopper/Auth/Login';
import ShoperPanel from '../screens/shopper/ShoperPanel';
import ShoperSignUp from '../screens/shopper/Auth/SignUp';
import Verification from '../screens/shopper/Verification';
import NewOrders from '../screens/shopper/Orders/NewOrders';
import Notifications from '../screens/shopper/Notifications';
import NewPassword from '../screens/shopper/Auth/NewPassword';
import FindRider from '../screens/shopper/FindRider/FindRider';
import OrdersDetail from '../screens/shopper/Orders/OrderDetail';
import OrderHistory from '../screens/shopper/Orders/OrderHistory';
import ForgotPassword from '../screens/shopper/Auth/ForgotPassword';
import TermsAndConditions from '../screens/content/TermsAndCondition';
import Profile from '../screens/shopper/Profile/Profile';

// Redux import
import {useSelector, useDispatch} from 'react-redux';
import {getNewOrders, OrderHistorySlice} from '../redux/slice/order';
import {NotificationListSlice} from '../redux/slice/notification';
import {profile} from '../redux/slice/profile';
import {getContents} from '../redux/slice/content';
import AboutUs from '../screens/content/AboutUs';
import {getLabels} from '../redux/slice/labels';
import {getLanguages} from '../redux/slice/Languages';

import {getCurerencyTypes} from '../redux/slice/price';


export default function MainNavigation() {
  const mNav = useRef();
  const dispatcher = useDispatch();
  const [Apploading, setAppLoading] = useState(true);
  const Stack = createSharedElementStackNavigator();
  const AccessToken = useSelector(state => state.Auth.accessToken);
  const language = useSelector(state => state.languages.selectedLanguage);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatcher(getLabels(''));
      dispatcher(getCurerencyTypes(''));

      dispatcher(getLanguages(''));
      getUserAccessToken();
    }
    return () => (isMounted = false);
  }, [AccessToken]);





  /* GET ACCESS TOKEN FROM ASYNCSTORAGE */
  const getUserAccessToken = async () => {
    // const value = await AsyncStorage.getItem(CONSTANTS.CACHE_KEYS.DEFAULT_USER);
    // const accessToken = JSON.parse(value);
    if (AccessToken !== null && AccessToken !== undefined) {
      await dispatcher(profile(false, false))
        .unwrap()
        .then(async res => {
          dispatcher(getNewOrders(''));
          dispatcher(getContents(false, false));
          /* Request Permission for Push Notifications */
          requestUserPermission(AccessToken, res.data.records.id);
          await dispatcher(OrderHistorySlice(false, false))
            .unwrap()
            .then(async res => {
              await dispatcher(NotificationListSlice(false, false))
                .unwrap()
                .then(res => {
                  setAppLoading(false);
                })
                .catch(e => {
                  console.log('notification error ===== >>>>>> ', e);
                  // removeAccessToken();
                  // mNav?.current?.dispatch(resetAction);
                });
            })
            .catch(e => {
              console.log('OrderHistorySlice error ===== >>>>>> ', e);

              // removeAccessToken();
              // mNav?.current?.dispatch(resetAction);
            });
          // dispatcher(getOrderSlice(false, false));
          // dispatcher(acceptOrderSlice(false, false));
        })
        .catch(e => {
          console.log('get profile error ===== >>>>>> ', e);

          // removeAccessToken();
          // mNav?.current?.dispatch(resetAction);
        });
    } else {
      setTimeout(() => {
        setAppLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      {Apploading ? (
        <View style={{flex: 1}}>
          <Loader visible={true} />
        </View>
      ) : (
        <NavigationContainer ref={mNav}>
          <Stack.Navigator
            screenOptions={{
              headerShown: true,
              headerStyle: {
                backgroundColor: COLORS.primary.navy,
              },
              headerTitleStyle: {
                color: COLORS.normal.white,
                fontFamily: FONTFAMILY.Medium,
                fontSize: SIZES.body18,
                marginLeft: -SIZES.twentyFive,
              },
              headerLeft: () => (
                <MyTouchableOpacity
                  onPress={() => {
                    mNav.current.goBack();
                  }}>
                  <Icon
                    name={'chevron-left'}
                    type={FONTFAMILY.Entypo}
                    style={{
                      color: COLORS.normal.white,
                      fontSize: SIZES.twentyFive,
                      marginLeft: SIZES.ten,
                    }}
                  />
                </MyTouchableOpacity>
              ),
              headerTitleAlign: 'left',
            }}>
            {AccessToken === null ? (
              <>
                <Stack.Screen
                  name={SCREENS.Login}
                  component={ShoperLogin}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name={SCREENS.SignUp}
                  component={ShoperSignUp}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name={SCREENS.ForgotPassword}
                  component={ForgotPassword}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={SCREENS.NewPassword}
                  component={NewPassword}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={SCREENS.Verification}
                  component={Verification}
                  options={{
                    headerShown: false,
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name={SCREENS.Panel}
                  component={ShoperPanel}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={SCREENS.NewOrders}
                  options={{headerShown: false}}
                  component={NewOrders}
                />

                <Stack.Screen
                  name={SCREENS.OrdersDetail}
                  component={OrdersDetail}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={SCREENS.OrderHistory}
                  component={OrderHistory}
                  options={{
                    title: utils.getLabelText(
                      'NavigationHeader',
                      language,
                      'history',
                    ),
                  }}
                />
                <Stack.Screen
                  name={SCREENS.HelpAndSupport}
                  component={HelpAndSupport}
                  options={{
                    title: utils.getLabelText(
                      'NavigationHeader',
                      language,
                      'help',
                    ),
                  }}
                />

                <Stack.Screen
                  name={SCREENS.Notifications}
                  component={Notifications}
                  options={{
                    title: utils.getLabelText(
                      'NavigationHeader',
                      language,
                      'notification',
                    ),
                  }}
                />

                <Stack.Screen
                  name={SCREENS.AboutUs}
                  component={AboutUs}
                  options={{
                    title: utils.getLabelText(
                      'NavigationHeader',
                      language,
                      'about',
                    ),
                  }}
                />
                <Stack.Screen
                  name={SCREENS.TermsAndConditions}
                  component={TermsAndConditions}
                  options={{
                    title: utils.getLabelText(
                      'NavigationHeader',
                      language,
                      'terms',
                    ),
                  }}
                />
                <Stack.Screen
                  name={SCREENS.Faqs}
                  component={Faqs}
                  options={{
                    title: utils.getLabelText(
                      'NavigationHeader',
                      language,
                      'help',
                    ),
                  }}
                />
                <Stack.Screen
                  name={SCREENS.Settings}
                  component={Settings}
                  options={{
                    title: utils.getLabelText(
                      'NavigationHeader',
                      language,
                      'setting',
                    ),
                  }}
                />
                {/* <Stack.Screen
                  name={SCREENS.Home}
                  component={FindRider}
                  options={{headerShown: false}}
                /> */}
                <Stack.Screen
                  name={SCREENS.CheckOut}
                  component={CheckOut}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={SCREENS.Chat}
                  component={Chat}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={SCREENS.Profile}
                  component={Profile}
                  options={{headerShown: false}}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}

      {/* Loader */}
      <Loader />

      {/* ErrorView */}
      <ErrorView />
    </>
  );
}

const styles = StyleSheet.create({});
