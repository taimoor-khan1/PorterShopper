import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ScreenHeader from '../../../components/ScreenHeader';
import {COLORS, FONTS, SCREENS, SIZES, STYLES} from '../../../constants';
import {getNewOrders} from '../../../redux/slice/order';
import utils from '../../../utils';

export default function NewOrders({navigation}) {
  const dispatcher = useDispatch();
  const {newOrders} = useSelector(state => state.Order);
  console.log(JSON.stringify(newOrders));
  const language = useSelector(state => state.languages.selectedLanguage);

  const [newOrderList, setNewOrderList] = useState(newOrders);

  useEffect(() => {
    setNewOrderList(newOrders);
  }, [newOrders]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatcher(getNewOrders(''));
    });

    setInterval(() => {
      dispatcher(getNewOrders(''));
    }, 20000);
  }, [navigation]);

  const rendorOrder = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: COLORS.normal.white,
          borderRadius: SIZES.ten,
          borderWidth: 1,
          borderColor: COLORS.normal.brownGrey,
          marginTop: SIZES.twenty,
          padding: SIZES.fifteen,
        }}
        onPress={() => {
          navigation.navigate(SCREENS.OrdersDetail, {orderItem: item});
        }}>
        <Text style={[FONTS.mediumFont14, {color: COLORS.normal.brownGrey}]}>
          {utils.getLabelText('NewOrderScreen', language, 'id')}
          {item.id}
        </Text>
        <Text style={[FONTS.mediumFont10, {color: COLORS.normal.trueGreen}]}>
          {item.order_status === 'rider_accepted'
            ? 'rider on the way'
            : item.order_status.replace('_', ' ')}
        </Text>
      </TouchableOpacity>
    );
  };

  const EmptyListComp = ({item}) => {
    return (
      <Text style={[FONTS.mediumFont16, styles.emptyListStyle]}>
        {utils.getLabelText('NewOrderScreen', language, 'noData')}
      </Text>
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
          {utils.getLabelText('NewOrderScreen', language, 'new')}
        </Text>
      </View>

      <FlatList
        data={newOrderList}
        renderItem={rendorOrder}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: SIZES.fifteen}}
        ListEmptyComponent={EmptyListComp}
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
