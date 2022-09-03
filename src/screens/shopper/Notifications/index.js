import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import CircularImage from '../../../components/CircularImage';
import {hide, show} from '../../../redux/slice/loader';
import Row from '../../../components/Row';
import {
  COLORS,
  CONSTANTS,
  FONTS,
  height,
  SCREENS,
  SIZES,
  STYLES,
  width,
} from '../../../constants';
import utils from '../../../utils';

export default function Notifications({navigation}) {
  const dispatcher = useDispatch();
  const token = useSelector(state => state.Auth.accessToken);
  const PROFILE = useSelector(state => state.Profile.profile);
  const language = useSelector(state => state.languages.selectedLanguage);

  const [loader, setLoader] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [notificationID, setNotificationID] = useState('');
  const [permissionModal, setPermissionModal] = useState(false);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getNotifications();
    });
  }, [navigation]);

  const getNotifications = () => {
    const onSuccess = ({data}) => {
      // console.log('getNotifications =====>>>> ', data);
      setNotifications(data.data);
      setLoader(false);
    };

    const onFailure = error => {
      console.log('getNotifications =====>>>> error', error);
      setLoader(false);
    };

    return axios
      .get(CONSTANTS.API_URLS.BASE2 + CONSTANTS.API_URLS.NOTIFICATIONS, {
        headers: {
          Authorization: token,
        },
        params: {
          user_id: PROFILE?.id,
        },
      })
      .then(onSuccess)
      .catch(onFailure);
  };

  const onGetOrderDetail = async ord_id => {
    const onSuccess = response => {
      dispatcher(hide());
      // console.log('order detail data: ', JSON.stringify(response.data));
      navigation.navigate(SCREENS.OrdersDetail, {
        orderItem: {
          ...response.data.data,
          items: response.data.data.order_items,
        },
      });
    };

    const onFailure = error => {
      dispatcher(hide());
      let err = utils.showResponseError(error);
      console.log('order detail error: ', err);
    };

    dispatcher(show());

    await axios
      .get(`${CONSTANTS.API_URLS.BASE2}${CONSTANTS.API_URLS.VIEW_ORDER}`, {
        headers: {
          Authorization: token,
        },
        params: {
          id: ord_id,
        },
      })
      .then(onSuccess)
      .catch(onFailure);
  };

  const deleteRow = () => {
    const onSuccess = ({data}) => {
      // console.log('delete notification success: ', data);
      const temp = [...notifications];
      const index = temp.findIndex(i => i.id === notificationID);
      temp.splice(index, 1);
      setNotifications(temp);
      dispatcher(hide());
    };

    const onFailure = error => {
      console.log('delete notification error: ', error.response);
      dispatcher(hide());
    };

    if (Platform.OS === 'ios') {
      setTimeout(() => {
        dispatcher(show());
      }, 350);
    } else {
      dispatcher(show());
    }

    const postData = {
      id: notificationID,
    };

    axios
      .post(
        CONSTANTS.API_URLS.BASE2 + CONSTANTS.API_URLS.DELETE_NOTIFICATION,
        postData,
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  const renderHiddenItem = data => {
    return (
      <View style={styles.rowBack}>
        <MyTouchableOpacity
          style={styles.backRightBtn}
          onPress={() => {
            setNotificationID(data.item.id);
            setPermissionModal(true);
          }}>
          <Text style={[FONTS.mediumFont12, styles.backTextWhite]}>
            {utils.getLabelText('NotificationScreen', language, 'del')}
          </Text>
        </MyTouchableOpacity>
      </View>
    );
  };

  const renderNotificationsItem = ({item}) => {
    return (
      <MyTouchableOpacity
        onPress={() => {
          onGetOrderDetail(item.order_id);
        }}>
        <Row
          style={{
            alignItems: 'center',
            marginTop: SIZES.five,
            paddingVertical: SIZES.ten,
            paddingHorizontal: SIZES.twenty,
            backgroundColor: COLORS.normal.white,
          }}>
          <CircularImage uri={CONSTANTS.API_URLS.IMAGE + item?.sender_image} />
          <View
            style={{
              flex: 1,
              marginHorizontal: SIZES.ten,
            }}>
            <Text
              numberOfLines={1}
              style={[FONTS.regularFont12, {color: COLORS.normal.black}]}>
              {item.sender_name}
            </Text>

            {item.content !== null && (
              <Text
                numberOfLines={2}
                style={[{color: COLORS.normal.brownGrey}]}>
                {item.content !== null ? item.content : ''}
              </Text>
            )}

            <Text
              style={[
                FONTS.lightFont10,
                {
                  marginTop: SIZES.five,
                  color: COLORS.normal.brownGrey,
                },
              ]}>
              {item.deliver_time}
            </Text>
          </View>
        </Row>
      </MyTouchableOpacity>
    );
  };

  return (
    <View style={[STYLES.container, {}]}>
      {loader ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary.navy}
          style={{marginTop: SIZES.fifteen}}
        />
      ) : (
        <SwipeListView
          stopLeftSwipe={0.5}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          data={notifications}
          renderItem={renderNotificationsItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-width * 0.215}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.listEmptyView}>
              <Text style={[FONTS.mediumFont16, {color: COLORS.primary.navy}]}>
                {utils.getLabelText('NotificationScreen', language, 'noData')}
              </Text>
            </View>
          )}
        />
      )}

      <Modal
        statusBarTranslucent
        deviceHeight={height * height}
        isVisible={permissionModal}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>
        <View
          style={{
            borderWidth: 1.5,
            padding: SIZES.ten * 2,
            borderRadius: SIZES.ten,
            borderColor: COLORS.primary.navy,
            backgroundColor: COLORS.normal.white,
          }}>
          <Text
            style={[
              STYLES.headingText,
              {
                color: COLORS.primary,
                marginTop: SIZES.five,
                textAlign: 'center',
              },
            ]}>
            {utils.getLabelText('NotificationScreen', language, 'title')}
          </Text>
          <Text
            style={[
              STYLES.mediumText,
              {marginVertical: SIZES.twenty, textAlign: 'center'},
            ]}>
            {utils.getLabelText('NotificationScreen', language, 'delete')}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <MyTouchableOpacity
              onPress={() => {
                setPermissionModal(false);
                setTimeout(() => {
                  deleteRow();
                }, 500);
              }}
              style={{
                padding: SIZES.ten,
                width: SIZES.fifty,
                alignItems: 'center',
                marginEnd: SIZES.five,
                backgroundColor: COLORS.primary.navy,
                borderRadius: SIZES.ten,
              }}>
              <Text style={[STYLES.mediumText, {color: COLORS.normal.white}]}>
                {utils.getLabelText('NotificationScreen', language, 'yes')}
              </Text>
            </MyTouchableOpacity>

            <MyTouchableOpacity
              onPress={() => {
                setNotificationID('');
                setPermissionModal(false);
              }}
              style={{
                padding: SIZES.ten,
                width: SIZES.fifty,
                alignItems: 'center',
                marginStart: SIZES.five,
                backgroundColor: COLORS.primary.navy,
                borderRadius: SIZES.ten,
              }}>
              <Text style={[STYLES.mediumText, {color: COLORS.normal.white}]}>
                {utils.getLabelText('NotificationScreen', language, 'no')}
              </Text>
            </MyTouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backTextWhite: {
    color: COLORS.normal.white,
  },
  rowFront: {
    marginTop: 10,
    borderRadius: SIZES.ten,
    justifyContent: 'center',
    height: SIZES.twenty * 4,
    backgroundColor: COLORS.normal.white,
  },
  rowBack: {
    flex: 1,
    marginTop: 10,
    paddingLeft: 15,
    borderRadius: SIZES.ten,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.normal.white,
  },
  backRightBtn: {
    top: 4,
    bottom: 0,
    right: SIZES.twenty,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.ten,
    paddingHorizontal: SIZES.fifteen,
    backgroundColor: COLORS.primary.navy,
  },
  backRightBtnLeft: {
    right: 75,
    borderRadius: SIZES.ten,
    justifyContent: 'center',
    backgroundColor: COLORS.normal.white,
  },
  listEmptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.twentyFive,
  },
});
