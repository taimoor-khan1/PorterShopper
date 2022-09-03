import {Icon} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTS, SIZES} from '../constants';
import Card from './Card';
import MyTouchableOpacity from './MyTouchableOpacity';
import Row from './Row';

export default function SearchBar(props) {
  return (
    <MyTouchableOpacity
      style={[
        props.style,
        {
          marginHorizontal: SIZES.fifteen,
        },
      ]}
      activeOpacity={0.9}
      onPress={props.onPress}>
      <Card
        style={{
          borderRadius: SIZES.fifteen,
          paddingHorizontal: SIZES.ten,
          paddingVertical: SIZES.ten * 0.75,
        }}>
        <Row style={{alignItems: 'center'}}>
          <Icon
            name={'search1'}
            type={FONTFAMILY.AntDesign}
            style={{fontSize: SIZES.twentyWidth * 1.05}}
          />
          <TextInput
            {...props}
            placeholder={'Search'}
            placeholderTextColor={COLORS.brownGrey}
            selectionColor={COLORS.crimson}
            style={[
              {
                color: COLORS.black,
                flex: 1,
                height: 40,
                fontFamily: FONTFAMILY.Medium,
                padding: 5,
              },
            ]}
          />
          <MyTouchableOpacity onPress={props.onFilterPress}>
            <Icon
              name={'options-outline'}
              type={FONTFAMILY.Ionicons}
              style={{fontSize: SIZES.twentyWidth * 1.05}}
            />
          </MyTouchableOpacity>
        </Row>
      </Card>
    </MyTouchableOpacity>
  );
}

const styles = StyleSheet.create({});
