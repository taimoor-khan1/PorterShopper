import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import CustomButton from '../../components/CustomButton';
import {COLORS, height, SIZES, STYLES} from '../../constants';

export default function TermsAndConditions({props}) {
  const AboutApp = useSelector(state => state.content.Content);

  return (
    <View style={STYLES.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.ten,
          paddingHorizontal: SIZES.fifteen,
          paddingBottom: SIZES.fifty,
        }}
        showsVerticalScrollIndicator={false}>
        <Text style={STYLES.lightText}>
          {AboutApp?.terms_condition_paragraph}
        </Text>
      </ScrollView>

      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: SIZES.twenty,
          justifyContent: 'space-around',
        }}>
        <CustomButton
          label={'Accept'}
          style={{width: '30%', height: SIZES.twenty * 3}}
        />
        <CustomButton
          label={'Decline'}
          lableColor={COLORS.primary.navy}
          style={{
            width: '30%',
            height: SIZES.twenty * 3,
            backgroundColor: COLORS.normal.white,
            borderWidth: 1,
            borderColor: COLORS.primary.navy,
          }}
        />
      </View> */}
    </View>
  );
}
