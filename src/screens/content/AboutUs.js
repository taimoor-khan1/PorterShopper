import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {STYLES, SIZES, FONTS, COLORS} from '../../constants/theme';

export default function AboutUs() {
  const AboutApp = useSelector(state => state.content.Content);
  console.log('AboutApp ========>>>>>> ', AboutApp);

  const RendorAboutApp = ({paragraph}) => {
    return (
      <View style={{flexDirection: 'row', marginTop: SIZES.ten}}>
        <View
          style={{
            height: SIZES.ten,
            width: SIZES.ten,
            borderRadius: SIZES.ten,
            backgroundColor: COLORS.primary.navy,
            top: SIZES.five,
          }}
        />
        <View style={{flex: 1}}>
          <Text
            style={[
              FONTS.mediumFont14,
              {
                textAlign: 'left',
                lineHeight: SIZES.twenty,
                marginStart: SIZES.ten,
              },
            ]}>
            {paragraph ||
              ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.`}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={STYLES.container}>
      <ScrollView
        bounces={false}
        overScrollMode="never"
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.fifteen,
          paddingBottom: SIZES.fifty,
        }}>
        <View style={{marginTop: SIZES.twenty}}>
          {Object.keys(AboutApp).map((item, val) => {
            console.log(AboutApp[item]);
            if (
              item === 'terms_condition_title' ||
              item === 'terms_condition_paragraph' ||
              item === 'about_us_title' ||
              item === 'help'
            ) {
              return null;
            }
            return <RendorAboutApp paragraph={AboutApp[item]} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
