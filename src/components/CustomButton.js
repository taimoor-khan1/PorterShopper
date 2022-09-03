/* @flow weak */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, SIZES, FONTS} from '../constants';

const CustomButton = ({label, onPress, style, icon, lableColor, disabled}) => {
  return (
    <View style={[styles.loginBtnBg, style, {}]}>
      <MyTouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          {
            width: '100%',
            height: '100%',
            justifyContent: icon ? 'space-between' : 'center',
          },
        ]}>
        <Text
          style={[
            FONTS.boldFont18,
            {
              color: lableColor ? lableColor : COLORS.normal.white,
              textAlign: 'center',
            },
          ]}>
          {label}
        </Text>
      </MyTouchableOpacity>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  loginBtnBg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.fifty,
    height: 60,
    backgroundColor: COLORS.primary.navy,
  },
});
