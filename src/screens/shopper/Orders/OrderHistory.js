import React, {useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {hide, show} from '../../../redux/slice/loader';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {OrderHistorySlice} from '../../../redux/slice/order';
import utils from '../../../utils';
import {
  FONTS,
  height,
  SIZES,
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  SCREENS,
} from '../../../constants';

export default function OrderHistory({navigation}) {
  const dispatcher = useDispatch();
  const {OrderHistory} = useSelector(state => state.Order);
  const token = useSelector(state => state.Auth.accessToken);
  const language = useSelector(state => state.languages.selectedLanguage);

  const [refreshing, setRefreshing] = React.useState(false);
  const [orderHistory, setOrderHistory] = React.useState(OrderHistory);

  useEffect(() => {
    setOrderHistory(OrderHistory);
  }, [OrderHistory]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getOrderHistory();
    });
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const getOrderHistory = () => {
    dispatcher(OrderHistorySlice(false, false))
      .unwrap()
      .then(resp => {
        setRefreshing(false);
      });
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

  const rendorOrderHistory = ({item}) => {
    return (
      <MyTouchableOpacity
        onPress={() => {
          onGetOrderDetail(item.id);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SIZES.twenty,
          }}>
          {/* ======================== USER IMAGE TO DELEIVERY TEXT START ======================== */}
          <View style={{flexDirection: 'row'}}>
            <Image
              source={{uri: CONSTANTS.API_URLS.IMAGE + item?.customer_image}}
              style={{
                fontSize: SIZES.fifteen,
                color: COLORS.primary.cherry,
              }}
            />
            <View style={{marginStart: SIZES.five}}>
              <Text style={[FONTS.mediumFont14, {color: COLORS.primary.navy}]}>
                {item.customer_name}
              </Text>

              <Text
                style={[
                  FONTS.regularFont10,
                  {marginVertical: SIZES.five, color: COLORS.primary.navy},
                ]}>
                {utils.getLabelText('OrderHistoryScreen', language, 'id')}

                <Text style={{color: COLORS.primary.cherry}}> {item.id}</Text>
              </Text>

              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon
                  name={'time'}
                  type={FONTFAMILY.Ionicons}
                  style={{
                    fontSize: SIZES.fifteen,
                    color: COLORS.primary.cherry,
                  }}
                />
                <Text style={[FONTS.lightFont08, {color: COLORS.primary.navy}]}>
                  {utils.getLabelText(
                    'OrderHistoryScreen',
                    language,
                    'delivery',
                  )}

                  {moment(item?.order_date).format("MMMM DD' YYYY")}
                </Text>
              </View>
            </View>
          </View>
          {/* ======================== USER IMAGE TO DELEIVERY TEXT END ======================== */}

          {/* ======================== PRICE RATINGS AND LOCATION VIEW START ======================== */}
          <View style={{flex: 0.4}}>
            <Text
              style={[
                FONTS.boldFont18,
                {
                  alignSelf: 'flex-end',
                  color: COLORS.primary.navy,
                  marginTop: SIZES.five,
                },
              ]}>
              ${item?.order_amount}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name={'location-pin'}
                type={FONTFAMILY.Entypo}
                style={{
                  fontSize: SIZES.fifteen,
                  color: COLORS.primary.cherry,
                }}
              />
              <Text
                numberOfLines={1}
                style={[FONTS.lightFont08, {color: COLORS.primary.navy}]}>
                {item?.customer_address}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: COLORS.normal.brownGrey,
            marginTop: SIZES.ten,
          }}
        />
      </MyTouchableOpacity>
    );
  };

  const EmptyListComp = ({item}) => {
    return (
      <Text style={[FONTS.mediumFont16, styles.emptyListStyle]}>
        {utils.getLabelText('OrderHistoryScreen', language, 'noData')}
      </Text>
    );
  };

  return (
    <View style={[{backgroundColor: COLORS.normal.white, flex: 1}]}>
      <FlatList
        data={orderHistory}
        renderItem={rendorOrderHistory}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={refreshing ? null : EmptyListComp}
        contentContainerStyle={{
          paddingBottom: height * 0.03,
          paddingHorizontal: SIZES.fifteen,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyListStyle: {
    marginTop: SIZES.fifteen,
    textAlign: 'center',
  },
});
