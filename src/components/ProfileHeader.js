import {Icon} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  COLORS,
  IMAGES,
  width,
  height,
  FONTS,
  SIZES,
  FONTFAMILY,
  SCREENS,
} from '../constants';
import {useNavigation} from '@react-navigation/native';
import BackArrow from './BackArrow';
import MyTouchableOpacity from './MyTouchableOpacity';
import Row from './Row';

export default ProfileHeader = props => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, props.style]}>
      <Text
        style={[
          FONTS.boldFont24,
          {
            color: COLORS.BLACK,
            flex: 1,
            textAlign: 'center',
          },
        ]}>
        {props.title}
      </Text>
      <MyTouchableOpacity
        style={{
          marginRight: SIZES.ten,
        }}
        onPress={props.onEditeIconPressed}>
        <Icon
          name={'square-edit-outline'}
          type={FONTFAMILY.MaterialCommunityIcons}
          style={{
            fontSize: SIZES.twentyFive * 0.9,
            color: COLORS.black,
          }}
        />
      </MyTouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.fifteen,
    // paddingVertical: SIZES.ten,
  },
});
