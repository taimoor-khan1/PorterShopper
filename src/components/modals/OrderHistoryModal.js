import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {Icon} from 'native-base';
import {COLORS, FONTFAMILY, FONTS, SIZES} from '../../constants';
import Card from '../Card';
import Row from '../Row';

export default function OrderHistoryModal(props) {
  //   console.log('kuch bhiiiiii', ' ', props.visibility);

  const ViewPersonalInfo = props => (
    <Row
      style={{
        justifyContent: 'space-between',
        paddingVertical: SIZES.fifteen,
      }}>
      <Text style={[FONTS.mediumFont14, {color: COLORS.brownGrey}]}>
        {props.prop}
      </Text>

      <Row style={{alignItems: 'center'}}>
        {props.icon ? (
          <Icon
            name={'star'}
            type={FONTFAMILY.Ionicons}
            style={{
              color: COLORS.startColor,
              fontSize: SIZES.twenty * 0.8,
            }}
          />
        ) : null}
        <Text style={[FONTS.mediumFont14, {color: COLORS.primary}]}>
          {props.value}
        </Text>
      </Row>
    </Row>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={props.visibility}>
      <View style={{flex: 1, backgroundColor: COLORS.blackWith50Opacity}}>
        <TouchableOpacity
          style={{
            flex: 1,

            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={props.onPress}>
          <Card style={styles.bottomSheetBody}>
            <Text
              style={[
                FONTS.mediumFont16,
                {marginVertical: SIZES.ten, textAlign: 'center'},
              ]}>
              Order History
            </Text>
            <ViewPersonalInfo prop={'Name'} value={props.name} />
            <ViewPersonalInfo prop={'Destination'} value={props.destination} />
            <ViewPersonalInfo prop={'Deliver Time'} value={props.time} />
            <ViewPersonalInfo prop={'Amount'} value={'$' + props.amount} />
            <ViewPersonalInfo prop={'Rating'} icon value={props.rating} />
          </Card>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    backgroundColor: COLORS.white,
    padding: SIZES.fifteen,
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twenty,
    width: '90%',
  },
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
  },
});
