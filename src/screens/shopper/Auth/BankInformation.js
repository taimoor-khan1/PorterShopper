import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import CustomButton from '../../../components/CustomButton';
import EditText from '../../../components/EditText';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import Row from '../../../components/Row';
import {FONTS, STYLES, SIZES, COLORS, SCREENS} from '../../../constants';

export default function BankInformation({navigation}) {
  return (
    <ScrollView
      style={[
        {
          backgroundColor: COLORS.normal.white,
          flex: 1,
          paddingTop:
            Platform.OS === 'android'
              ? SIZES.twentyFive * 1.8
              : getStatusBarHeight(true),
        },
      ]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: SIZES.twenty * 4,
        paddingHorizontal: SIZES.fifteen,
      }}>
      {/* ======================== HEADER HERE ======================== */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[FONTS.boldFont22, {color: COLORS.primary.navy}]}>
          Bank Information
        </Text>

        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.normal.charcoalGrey, marginTop: SIZES.ten},
          ]}>
          Add your bank detail to proceed
        </Text>
      </View>

      {/* ======================== TEXTINPUTS HERE ======================== */}

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText placeholder="Full Name" />
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText placeholder="Bank Name" />
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText placeholder="Bank Account Number" />
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText placeholder="IBAN Number" />
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText placeholder="Branch Name" />
      </View>

      <CustomButton
        label={'Next'}
        style={{marginTop: SIZES.twentyFive}}
        onPress={() => {
          navigation.navigate(SCREENS.Verification);
        }}
      />

      <Row
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SIZES.twentyFive * 1.5,
        }}>
        <Text
          style={[
            FONTS.mediumFont12,
            {color: COLORS.normal.charcoalGrey, textAlign: 'center'},
          ]}>
          Already have an Account?
        </Text>
        <MyTouchableOpacity
        // onPress={() => props.navigation.navigate(SCREENS.SignUp)}
        >
          <Text
            style={[
              FONTS.mediumFont12,
              {color: COLORS.primary.cherry, textAlign: 'center'},
            ]}>
            {' '}
            Log In
          </Text>
        </MyTouchableOpacity>
      </Row>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
