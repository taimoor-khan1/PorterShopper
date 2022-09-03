import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ToastAndroid,
  Platform,
} from 'react-native';
import axios from 'axios';
import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import ScreenHeader from '../../../components/ScreenHeader';
import Firebase from '../../../Firebase/firebaseConfig';
import {hide, show} from '../../../redux/slice/loader';
import utils from '../../../utils';
import {
  getNewOrders,
  getOrderSlice,
  onRejectOrder,
} from '../../../redux/slice/order';
import {
  STYLES,
  COLORS,
  FONTS,
  FONTFAMILY,
  SIZES,
  SCREENS,
  CONSTANTS,
  width,
} from './../../../constants';

export default function ShoperPanel({navigation}) {
  const dispatcher = useDispatch();
  const [exitApp, setExitApp] = useState(0);
  const ReducerData = useSelector(state => state);
  const Profile = ReducerData.Profile.profile;
  const accessToken = ReducerData.Auth.accessToken;
  const {newOrders, orderData} = useSelector(state => state.Order);
  const [newOrderList, setNewOrderList] = useState(newOrders);
  const [isorderAccept, setIsOrderAccept] = useState(false);
  const language = useSelector(state => state.languages.selectedLanguage);

  useEffect(() => {
    setNewOrderList(newOrders);
  }, [newOrders]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });

  useEffect(() => {
    notificationListener();
  }, []);

  /*  ************************** FIREBASE NOTIFICATIION ************************ */
  const notificationListener = async () => {
    await Firebase();
    messaging().setBackgroundMessageHandler(rm => {
      console.log('messaging().setBackgroundMessageHandler ==== >>>>> ', rm);
    });

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(rm => {
      console.log('Notification caused app to open from quit state:', rm);
      CheckNotification(rm?.data);
    });

    // Check foreground
    messaging().onMessage(async rm => {
      console.log('received in forground >>>> ', rm);
      CheckNotification(rm?.data);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(rm => {
        console.log('Notification caused app to open from quit state:', rm);
        CheckNotification(rm?.data);
      })
      .catch(error => {
        console.log('getInitialNotification ======> ', error);
      });
  };

  const CheckNotification = data => {
    switch (data?.trigger_type) {
      case 'new_order':
        getNewOrdersData();
        break;
      case 'order_accepted':
        dispatcher(getNewOrders(''));
        navigation.navigate(SCREENS.NewOrders);
        break;
      case 'payment_confirmation':
        dispatcher(getNewOrders(''));
        navigation.navigate(SCREENS.NewOrders);
        break;

      default:
        break;
    }
  };

  const getNewOrdersData = async () => {
    await dispatcher(getOrderSlice(''));
  };

  const acceptOrder = async item => {
    const onSuccess = async ({data}) => {
      // console.log('order accept response: ', data);
      setIsOrderAccept(true);
      await dispatcher(getNewOrders(''));
      dispatcher(hide());
    };

    const onFailure = error => {
      dispatcher(hide());
      console.log(error.response);

      let err = utils.showResponseError(error);
      showSimpleMessage('danger', {
        message: err,
      });
    };

    const data = {
      order_id: orderData?.order?.id,
      grocery_id: Profile.grocery.id,
    };

    dispatcher(show());

    axios
      .post(
        `${CONSTANTS.API_URLS.BASE2}${CONSTANTS.API_URLS.ORDER_ACCEPT}`,
        data,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const rejectOrder = async () => {
    const onSuccess = ({data}) => {
      // console.log('order reject response: ', data);
      dispatcher(onRejectOrder());
      setIsOrderAccept(false);
      dispatcher(hide());
    };

    const onFailure = error => {
      console.log('order decline error: ', error.response);
      let err = utils.showResponseError(error);
      utils.errorAlert(err);
      dispatcher(hide());
    };

    const data = {
      order_id: orderData?.order?.id,
      cancel_by: Profile.grocery.id,
    };

    dispatcher(show());

    axios
      .post(
        `${CONSTANTS.API_URLS.BASE2}${CONSTANTS.API_URLS.ORDER_REJECT}`,
        data,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const PanelCategory = ({iconName, name, iconType, onPress, acceptOrder}) => {
    return (
      <TouchableOpacity
        style={[
          STYLES.shadow,
          {
            marginTop: SIZES.twentyFive,
            borderRadius: SIZES.ten * 1.2,
            paddingHorizontal: SIZES.twentyFive,
            paddingVertical: SIZES.ten,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: acceptOrder ? 'red' : COLORS.normal.white,
          },
        ]}
        activeOpacity={0.7}
        onPress={onPress}>
        <Icon
          type={iconType}
          name={iconName}
          style={{
            color: acceptOrder ? COLORS.normal.white : COLORS.normal.brownGrey,
            // color: COLORS.primary.navy,
            fontSize: SIZES.twenty * 1.5,
          }}
        />

        <Text
          style={[
            FONTS.mediumFont18,
            {
              color: acceptOrder
                ? COLORS.normal.white
                : COLORS.normal.brownGrey,
              marginStart: SIZES.ten,
            },
          ]}>
          {name}
        </Text>

        {acceptOrder ? (
          <View
            style={{
              backgroundColor: COLORS.normal.white,
              height: SIZES.twenty * 1.6,
              width: SIZES.twenty * 1.6,
              borderRadius: SIZES.twenty * 1.6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[FONTS.regularFont14]}>{newOrderList.length}</Text>
          </View>
        ) : (
          <Icon
            type={FONTFAMILY.Entypo}
            name={'chevron-small-right'}
            style={{
              color: COLORS.normal.brownGrey,
              fontSize: SIZES.twenty * 1.8,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  const RendorAcceptRejectModal = () => {
    return (
      <View>
        <View
          style={[
            STYLES.shadow,
            {
              padding: SIZES.twenty,
              borderRadius: SIZES.ten,
              marginTop: SIZES.twentyFive,
              backgroundColor: COLORS.normal.white,
            },
          ]}>
          {/* ======================== LOCATION AVERAGE DELIEVERY TIME ORDER ID  VIEW STRART======================== */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={[FONTS.mediumFont10, {color: COLORS.normal.charcoalGrey}]}>
              Order ID{' '}
              <Text style={{color: COLORS.primary.cherry}}>
                #{orderData?.order?.id}
              </Text>
            </Text>

            <Text
              style={[FONTS.mediumFont10, {color: COLORS.normal.charcoalGrey}]}>
              Average Delivery Time:{' '}
              <Text style={{color: COLORS.normal.trueGreen}}>
                {orderData?.order?.average_time[0]}-
                {orderData?.order?.average_time[2]} min
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: SIZES.ten,
            }}>
            <View
              style={[
                STYLES.shadow,
                {
                  backgroundColor: COLORS.primary.navy,
                  padding: SIZES.ten,
                  alignSelf: 'baseline',
                  borderRadius: SIZES.twenty,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Icon
                name={'home'}
                type={FONTFAMILY.Ionicons}
                style={{fontSize: SIZES.twenty, color: COLORS.normal.white}}
              />
            </View>
            <View style={{marginStart: SIZES.twentyFive}}>
              <Text style={[FONTS.regularFont12]}>Customer location</Text>
              <Text
                style={[FONTS.regularFont10, {color: COLORS.normal.brownGrey}]}>
                {orderData?.customerOrder_address?.address}
              </Text>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={[
                STYLES.shadow,
                {
                  padding: SIZES.ten,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: SIZES.twenty,
                  backgroundColor: COLORS.primary.navy,
                },
              ]}>
              <Icon
                name={'storefront-outline'}
                type={FONTFAMILY.MaterialCommunityIcons}
                style={{fontSize: SIZES.twenty, color: COLORS.normal.white}}
              />
            </View>

            {/* ======================== LOCATION AVERAGE DELIEVERY TIME ORDER ID  VIEW END======================== */}

            <View style={{alignItems: 'center', marginTop: SIZES.fifteen}}>
              <View
                style={{
                  height: 1,
                  width: SIZES.twenty * 7,
                  backgroundColor: COLORS.primary.navy,
                  marginHorizontal: SIZES.ten,
                }}
              />
              <Text
                style={[
                  FONTS.regularFont12,
                  {
                    alignSelf: 'center',
                    color: COLORS.primary.navy,
                    marginTop: SIZES.ten,
                  },
                ]}>
                {orderData?.customerOrder_address?.distance
                  ? Number(orderData?.customerOrder_address?.distance).toFixed(
                      2,
                    )
                  : '0'}{' '}
                KM
              </Text>
            </View>

            <View
              style={[
                STYLES.shadow,
                {
                  backgroundColor: COLORS.normal.white,
                  padding: SIZES.ten,
                  borderRadius: SIZES.twenty,
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <Icon
                name={'home'}
                type={FONTFAMILY.Ionicons}
                style={{fontSize: SIZES.twenty, color: COLORS.primary.navy}}
              />
            </View>
          </View>
        </View>
        {/* ======================== FROM STORE AND AMOUNT VIEW END ======================== */}

        {/* ======================== ORDER ACCEPT REJECT STRART VIEW ======================== */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: SIZES.twenty,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.normal.trueGreen,
              paddingHorizontal: SIZES.twenty * 1.5,
              paddingVertical: SIZES.ten,
              borderRadius: SIZES.ten,
            }}
            activeOpacity={0.7}
            onPress={acceptOrder}>
            <Text style={[FONTS.regularFont14, {color: COLORS.normal.white}]}>
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: SIZES.twenty * 1.5,
              paddingVertical: SIZES.ten,
              borderRadius: SIZES.ten,
              borderWidth: 1,
              borderColor: COLORS.primary.navy,
            }}
            activeOpacity={0.7}
            onPress={rejectOrder}>
            <Text style={[FONTS.regularFont14, {color: COLORS.primary.navy}]}>
              Decline
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const backAction = () => {
    if (Platform.OS === 'android') {
      setTimeout(() => {
        setExitApp(0);
      }, 2000); // 2 seconds to tap second-time

      if (exitApp === 0) {
        setExitApp(exitApp + 1);

        ToastAndroid.show('Please click BACK again to exit', ToastAndroid.LONG);
      } else if (exitApp === 1) {
        BackHandler.exitApp();
      }
      return true;
    }
    BackHandler.exitApp();
  };

  return (
    <View style={STYLES.container}>
      <StatusBar
        barStyle={'light-content'}
        translucent
        backgroundColor={COLORS.normal.transparent}
      />

      <ScreenHeader />

      {/* ======================== ORDER DONE  VIEW START======================== */}

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: COLORS.primary.navy,
          justifyContent: 'space-between',
          padding: SIZES.fifteen,
          alignItems: 'center',
        }}>
        <Text style={[FONTS.boldFont18, {color: COLORS.normal.white}]}>
          {utils.getLabelText('PanelScreen', language, 'panel')}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[FONTS.mediumFont10, {color: COLORS.normal.white}]}>
            {utils.getLabelText('PanelScreen', language, 'done')}
          </Text>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.normal.white, marginHorizontal: SIZES.ten},
            ]}>
            |
          </Text>
          <Text style={[FONTS.boldFont16, {color: COLORS.normal.white}]}>
            {Profile?.deliveries}
          </Text>
        </View>
      </View>

      {/* ======================== PANEL CATEGORY  VIEW START======================== */}

      <View style={{paddingHorizontal: SIZES.fifteen}}>
        <PanelCategory
          iconType={FONTFAMILY.Fontisto}
          name={utils.getLabelText('PanelScreen', language, 'new')}
          iconName="prescription"
          acceptOrder={newOrderList.length > 0}
          onPress={() => {
            // if (newOrderList.length > 0) {
            navigation.navigate(SCREENS.NewOrders);
            // }
          }}
        />
        <PanelCategory
          iconType={FONTFAMILY.MaterialCommunityIcons}
          name={utils.getLabelText('PanelScreen', language, 'order')}
          iconName="calendar-text-outline"
          onPress={() => {
            navigation.navigate(SCREENS.OrderHistory);
          }}
        />
        <PanelCategory
          iconType={FONTFAMILY.Ionicons}
          name={utils.getLabelText('PanelScreen', language, 'notification')}
          iconName="notifications-outline"
          onPress={() => {
            navigation.navigate(SCREENS.Notifications);
          }}
        />
        <PanelCategory
          iconType={FONTFAMILY.Ionicons}
          name={utils.getLabelText('PanelScreen', language, 'more')}
          iconName="menu-outline"
          onPress={() => {
            navigation.navigate(SCREENS.Settings);
          }}
        />
      </View>
      {/* ======================== PANEL CATEGORY VIEW END======================== */}

      {/* ======================== ACCEPT REJECT ORDER VIEW START ======================== */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: SIZES.fifteen,
        }}>
        {orderData && !isorderAccept && <RendorAcceptRejectModal />}
      </View>

      {/* <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => {
          navigation.navigate(SCREENS.HelpAndSupport);
        }}
        style={{
          height: width * 0.15,
          width: width * 0.15,
          backgroundColor: COLORS.primary.navy,
          borderRadius: width,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'flex-end',
          margin: SIZES.twenty,
        }}>
        <Icon
          type={FONTFAMILY.Ionicons}
          name="md-chatbubble-ellipses-outline"
          style={{fontSize: 22, color: COLORS.normal.white}}
        />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({});
