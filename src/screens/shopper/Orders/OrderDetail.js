import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import ScreenHeader from '../../../components/ScreenHeader';
import FindRiderModal from '../../../components/modals/FindRiderModal';
import {STYLES, COLORS, FONTS, SIZES, CONSTANTS} from '../../../constants';
import ConfirmPaymentModal from '../../../components/modals/ConfirmPaymentModal';
import OrderDetailComponent from '../../../components/OrderDetailComponanat';
import ScannerModal from '../../../components/modals/ScannerModal';
import {getNewOrders} from '../../../redux/slice/order';
import Firebase from '../../../Firebase/firebaseConfig';
import {hide, show} from '../../../redux/slice/loader';
import utils from '../../../utils';

export default function OrderDetail({navigation, route}) {
  const dispatcher = useDispatch();
  const {orderItem} = route?.params;
  const AccessToken = useSelector(state => state.Auth.accessToken);
  const [orderData, setOrderData] = useState(orderItem);
  const [confirmToPayment, setConfirmToPayment] = useState(false);
  const [showFindRiderModal, setFindRiderModal] = useState(false);
  const [scannerVisibilty, setScannerVisiblity] = useState(false);
  const [showPaymentConfirmModal, setPaymentConfirmModal] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const language = useSelector(state => state.languages.selectedLanguage);

  useEffect(() => {
    navigation.addListener('focus', () => {
      if (orderData?.order_status !== 'preparing') {
        notificationListener();
        markAllChecked();
      }
    });
  }, [navigation]);

  /*  ************************** FIREBASE NOTIFICATIION ************************ */
  const notificationListener = async () => {
    await Firebase();

    // Check foreground
    messaging().onMessage(async rm => {
      console.log('received in forground >>>> ', rm);
      CheckNotification(rm?.data);
    });
  };

  const CheckNotification = data => {
    switch (data?.trigger_type) {
      case 'payment_confirmation':
        dispatcher(getNewOrders(''));
        setPaymentConfirmModal(false);
        setFindRiderModal(true);
        break;
      case 'order_accepted':
        dispatcher(getNewOrders(''));
        setOrderData({...orderData, order_status: 'rider_accepted'});
        break;

      default:
        break;
    }
  };

  const markAllChecked = () => {
    setAllChecked(true);
    setConfirmToPayment(true);
    let temp = JSON.parse(JSON.stringify(orderData));
    temp.items.map((item, index) => {
      temp.items[index] = {...item, isSelected: true};
    });
    setOrderData(temp);
  };

  const onSelectingItem = async (ind, id) => {
    let temp = JSON.parse(JSON.stringify(orderData));
    let index = ind;
    if (index === '') {
      index = await orderData?.items?.findIndex(i => i.id == id);
    }

    if (index >= 0 && index !== undefined) {
      if (temp.items[index].isSelected) {
        temp.items[index] = {...temp.items[index], isSelected: false};
      } else {
        temp.items[index] = {...temp.items[index], isSelected: true};
      }

      if (
        temp.items.filter(i => i.isSelected).length === orderData.items.length
      ) {
        setAllChecked(true);
        setScannerVisiblity(false);
      } else {
        setAllChecked(false);
      }

      setOrderData(temp);
    } else {
      setScannerVisiblity(false);
      utils.errorAlert(
        'No item found in the list against the scanned QR code.',
      );
    }
  };

  const onScanSuccess = scanned_data => {
    const onSuccess = ({data}) => {
      // console.log('item by qrcode data: ', data);
      onSelectingItem('', data.data.id);
    };

    const onFailure = error => {
      console.log('on scan failure: ', error.response);
      setScannerVisiblity(false);
      let err = utils.showResponseError(error);
      setTimeout(() => {
        utils.errorAlert(err);
      }, 500);
    };

    let config = {
      headers: {
        Authorization: AccessToken,
      },
      params: {
        qr_code: scanned_data?.data,
      },
    };

    axios
      .get(
        `${CONSTANTS.API_URLS.BASE2}${CONSTANTS.API_URLS.GET_ITEM_BY_QRCODE}`,
        config,
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const onProceedToPay = async () => {
    const onSuccess = async ({data}) => {
      // console.log('order ready response: ', data);
      setConfirmToPayment(true);
    };

    const onFailure = error => {
      console.log('onProceedToPay error: ', error.response);
      let err = utils.showResponseError(error);
      utils.errorAlert(err);
    };

    const data = {
      orderID: orderData.id,
      type: 'shopper',
    };

    axios
      .post(
        `${CONSTANTS.API_URLS.BASE2}${CONSTANTS.API_URLS.PAYMENT_CONFIRMATION}`,
        data,
        {
          headers: {
            Authorization: AccessToken,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const onFindRider = async item => {
    const onSuccess = ({data}) => {
      // console.log('order assign response: ', data);
      setOrderData({...orderData, order_status: 'finding_rider'});
      dispatcher(getNewOrders(''));
      dispatcher(hide());
    };

    const onFailure = error => {
      dispatcher(hide());
      console.log('onFindRider error: ', error.response);

      let err = utils.showResponseError(error);
      utils.errorAlert(err);
    };

    const data = {
      orderID: orderData.id,
    };

    dispatcher(show());

    axios
      .post(
        `${CONSTANTS.API_URLS.BASE2}${CONSTANTS.API_URLS.ORDER_ASSIGN}`,
        data,
        {
          headers: {
            Authorization: AccessToken,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const onOrderReady = () => {
    const onSuccess = async ({data}) => {
      // console.log('order ready response: ', data);
      await dispatcher(getNewOrders(''));
      setOrderData({...orderData, order_status: 'ready'});
      setConfirmToPayment(true);
      dispatcher(hide());
    };

    const onFailure = error => {
      dispatcher(hide());
      console.log('onOrderReady error: ', error.response);

      let err = utils.showResponseError(error);
      utils.errorAlert(err);
    };

    const data = {
      order_id: orderData.id,
    };

    dispatcher(show());

    axios
      .post(
        `${CONSTANTS.API_URLS.BASE2}${CONSTANTS.API_URLS.ORDER_READY}`,
        data,
        {
          headers: {
            Authorization: AccessToken,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const rendorOrderList = ({item, index}) => {
    return (
      <OrderDetailComponent
        item={item}
        activeOpacity={
          orderData?.order_status !== 'ready' &&
          orderData?.order_status !== 'completed'
            ? 0.9
            : 1
        }
        onPressCheck={() => {
          if (
            orderData?.order_status !== 'ready' &&
            orderData?.order_status !== 'completed'
          ) {
            onSelectingItem(index);
          }
        }}
      />
    );
  };

  return (
    <View style={STYLES.container}>
      <StatusBar
        translucent
        barStyle={'light-content'}
        backgroundColor={COLORS.normal.transparent}
      />
      <ScreenHeader isBackArrow />

      <View
        style={{
          flexDirection: 'row',
          backgroundColor: COLORS.primary.navy,
          justifyContent: 'space-between',
          padding: SIZES.fifteen,
          alignItems: 'center',
        }}>
        <Text style={[FONTS.boldFont18, {color: COLORS.normal.white}]}>
          {utils.getLabelText('OrderDetailScreen', language, 'title')}
        </Text>
      </View>

      <View style={styles.flatlistContainer}>
        <Text style={[FONTS.boldFont18, {color: COLORS.primary.cherry}]}>
          {utils.getLabelText('OrderDetailScreen', language, 'id')}
          {orderData.id}
        </Text>
        <FlatList
          bounces={false}
          overScrollMode="never"
          scrollEventThrottle={16}
          data={orderData.items}
          renderItem={rendorOrderList}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginTop: 0}}
        />
      </View>

      <View style={styles.btnsContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          {orderData?.order_status ===
          'ready' ? null : orderData?.order_status === 'finding_rider' ||
            orderData?.order_status === 'rider_accepted' ||
            orderData?.order_status === 'completed' ? (
            <View
              style={[styles.btnStyle, {backgroundColor: COLORS.normal.white}]}>
              <Text
                style={[FONTS.regularFont12, {color: COLORS.normal.trueGreen}]}>
                {orderData?.order_status === 'finding_rider'
                  ? utils.getLabelText('OrderDetailScreen', language, 'finding')
                  : orderData?.order_status === 'completed'
                  ? utils.getLabelText(
                      'OrderDetailScreen',
                      language,
                      'completed',
                    )
                  : utils.getLabelText('OrderDetailScreen', language, 'onWay')}
              </Text>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                if (allChecked) {
                  onOrderReady();
                } else {
                  setScannerVisiblity(true);
                }
              }}
              style={[
                styles.btnStyle,
                {
                  backgroundColor: allChecked
                    ? COLORS.normal.trueGreen
                    : COLORS.normal.white,
                },
              ]}>
              <Text
                style={[
                  FONTS.regularFont12,
                  {
                    color: allChecked
                      ? COLORS.normal.white
                      : COLORS.normal.trueGreen,
                  },
                ]}>
                {allChecked ? 'Order Ready' : 'Scan'}
              </Text>
            </TouchableOpacity>
          )}

          {allChecked &&
            confirmToPayment &&
            orderData?.order_status === 'ready' &&
            (orderData?.confirm_payment == '1' ? (
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.paymentBtnStyle,
                  {backgroundColor: COLORS.primary.navy},
                ]}
                onPress={() => onFindRider()}>
                <Text
                  style={[FONTS.regularFont12, {color: COLORS.normal.white}]}>
                  {utils.getLabelText('OrderDetailScreen', language, 'find')}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.paymentBtnStyle}
                activeOpacity={0.7}
                onPress={() => {
                  setPaymentConfirmModal(true);
                  onProceedToPay();
                }}>
                <Text
                  style={[FONTS.regularFont12, {color: COLORS.normal.white}]}>
                  {utils.getLabelText('OrderDetailScreen', language, 'payment')}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      <ConfirmPaymentModal
        data={orderData}
        visibility={showPaymentConfirmModal}
        setVisibility={() => setPaymentConfirmModal(false)}
      />

      <FindRiderModal
        visibility={showFindRiderModal}
        onFindRiderPressed={() => {
          setFindRiderModal(false);
          onFindRider();
        }}
      />

      <ScannerModal
        // data={scannerData}
        onSuccess={onScanSuccess}
        visibility={scannerVisibilty}
        setVisibility={setScannerVisiblity}
        onClosepress={() => {
          setScannerVisiblity(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnsContainer: {
    flex: 0.25,
    paddingHorizontal: SIZES.twenty,
  },
  btnStyle: {
    borderWidth: 1,
    alignSelf: 'baseline',
    marginTop: SIZES.twenty,
    marginRight: SIZES.ten,
    borderRadius: SIZES.twenty,
    paddingVertical: SIZES.fifteen - 2,
    borderColor: COLORS.normal.trueGreen,
    paddingHorizontal: SIZES.twenty * 1.5,
  },
  paymentBtnStyle: {
    alignSelf: 'baseline',
    marginTop: SIZES.twenty,
    borderRadius: SIZES.twenty,
    paddingVertical: SIZES.fifteen - 2,
    paddingHorizontal: SIZES.twenty * 1.5,
    backgroundColor: COLORS.primary.cherry,
  },
  flatlistContainer: {
    flex: 1,
    paddingHorizontal: SIZES.fifteen,
    marginTop: SIZES.twenty,
  },
});
