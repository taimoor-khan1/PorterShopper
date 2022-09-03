import React, {useState} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {COLORS, CONSTANTS, FONTFAMILY, SIZES, IMAGES} from '../constants';

export default function CircularImage(props) {
  // console.log('CircularImage =============== >>>>>>>> ', props);
  return (
    <View style={[props.style, {overflow: 'hidden'}]}>
      <Image
        source={!props.uri ? props.image : {uri: props.uri}}
        resizeMode="cover"
        style={[styles.image, props.imageStyle]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: SIZES.twenty * 3,
    width: SIZES.twenty * 3,
    borderRadius: SIZES.twenty * 3,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});
