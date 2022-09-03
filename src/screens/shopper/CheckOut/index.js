import {Icon} from 'native-base';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {
  STYLES,
  FONTFAMILY,
  COLORS,
  SIZES,
  FONTS,
  IMAGES,
} from './../../../constants/theme';
import BackArrow from './../../../components/BackArrow';
import CustomButton from '../../../components/CustomButton';

export default function CheckOut() {
  const RendorRow = ({color, fonts, rightText, leftText, style}) => {
    return (
      <View
        style={[
          style,
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
        <Text style={[fonts ? fonts : FONTS.mediumFont16]}>{leftText}</Text>
        <Text
          style={[
            FONTS.boldFont16,
            {color: color ? color : COLORS.normal.black},
          ]}>
          {rightText}
        </Text>
      </View>
    );
  };

  return (
    <View style={[STYLES.container, {paddingHorizontal: SIZES.fifteen}]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SIZES.ten,
        }}>
        <BackArrow />
        <Text style={[FONTS.mediumFont18]}>Check Out</Text>
      </View>

      <View style={{flex: 1}}>
        <Text
          style={[
            FONTS.mediumFont12,
            {color: COLORS.normal.brownGrey, marginTop: SIZES.twenty},
          ]}>
          Delivery Address
        </Text>
        <Text style={[FONTS.mediumFont14, {color: COLORS.normal.black}]}>
          653 Nostrand Ave., Brooklyn, NY 11216
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.twenty,
          }}>
          <Text style={[FONTS.mediumFont16, {color: COLORS.normal.black}]}>
            Payment method
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={IMAGES.visalogo}
              style={{height: SIZES.twenty * 2, width: SIZES.twenty * 2}}
              resizeMode={'contain'}
            />
            <Image
              source={IMAGES.paypal}
              style={{height: SIZES.twenty * 2, width: SIZES.twenty * 2}}
              resizeMode={'contain'}
            />
          </View>
        </View>

        <RendorRow
          color={COLORS.normal.trueGreen}
          fonts={FONTS.mediumFont10}
          leftText={'Payment by'}
          rightText={'By Cash '}
        />
        <RendorRow
          fonts={FONTS.boldFont18}
          leftText={'Supreme Classic Medium'}
          rightText={'$11'}
          style={{marginTop: SIZES.twenty}}
        />
        <Text style={[FONTS.lightFont10, {marginTop: SIZES.five}]}>
          Order ID<Text>#252372</Text>
        </Text>

        <RendorRow
          fonts={FONTS.mediumFont14}
          leftText={'Sub Total'}
          rightText={'$68'}
          style={{marginTop: SIZES.twenty}}
        />
        <RendorRow
          fonts={FONTS.mediumFont14}
          leftText={'Delivery Cost'}
          rightText={'$2'}
          style={{marginTop: SIZES.ten}}
        />
        <RendorRow
          fonts={FONTS.mediumFont14}
          leftText={'Discount'}
          rightText={'$2'}
          style={{marginTop: SIZES.ten}}
        />
        <RendorRow
          fonts={FONTS.mediumFont14}
          color={COLORS.primary.cherry}
          leftText={'Total'}
          rightText={'-$66'}
          style={{marginTop: SIZES.twenty}}
        />
      </View>
      <View
        style={{
          flex: 0.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomButton label={'Check out'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
