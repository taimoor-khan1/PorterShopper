import React from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {FONTS, STYLES} from '../../../constants';

export default function Splash() {
  return (
    <View
      style={[
        STYLES.container,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <StatusBar hidden />
      <Text style={FONTS.regularFont10}>Porter Shopper</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
