import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {show as showError} from '../../../redux/slice/error';
import CustomButton from '../../../components/CustomButton';
import {verifyOtpAndLogin} from '../../../redux/slice/auth';
import {hide, show} from '../../../redux/slice/loader';
import Loader from '../../../components/modals/Loader';
import Row from '../../../components/Row';
import utils from '../../../utils';
import {
  FONTS,
  COLORS,
  SIZES,
  FONTFAMILY,
  SCREENS,
  CONSTANTS,
} from '../../../constants';

export default function Verification({navigation, route}) {
  const dispatcher = useDispatch();
  const [code, setCode] = useState('');
  const [showLoader, setshowLoader] = useState(false);
  const language = useSelector(state => state.languages.selectedLanguage);

  const verifyForSignUp = async () => {
    if (utils.isEmptyOrSpaces(code)) {
      dispatcher(utils.errorAlert('Invalid Code'));
      return;
    }

    dispatcher(show());

    dispatcher(verifyOtpAndLogin({email: route.params.email, otp: code}))
      .unwrap()
      .then(_response => {
        dispatcher(hide());
      })
      .catch(e => {
        dispatcher(hide());
        dispatcher(showError(e));
      });
  };

  const verifyForForgotpassword = async () => {
    if (utils.isEmptyOrSpaces(code)) {
      dispatcher(utils.errorAlert('Invalid Code'));
      return;
    }

    const formData = new FormData();
    formData.append('email', route.params.email.toLowerCase());
    formData.append('otp', code);
    formData.append('redirectToPassword', true);

    const onSuccess = ({data}) => {
      console.log('verifyForForgotpassword success =========== ', data);
      setshowLoader(false);
      navigation.navigate(SCREENS.NewPassword, {
        email: route.params.email,
      });
    };

    const onFailure = error => {
      console.log('verifyForForgotpassword onFailure ====== ===== ', error);
      setshowLoader(false);
      let err = utils.showResponseError(error);
      dispatcher(showError(err));
    };

    setshowLoader(true);
    axios
      .post(
        `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.VERIFY_OTP}`,
        formData,
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  // resend otp api call
  const resendOTP = () => {
    setCode('');
    const onSuccess = ({data}) => {
      console.log('resendOTP onSuccess: ', data.data.otp);

      dispatcher(hide());
      utils.successAlert(data.message);
    };

    const onFailure = error => {
      dispatcher(hide());

      let err = utils.showResponseError(error);
      if (Platform.OS === 'android') {
        dispatcher(showError(err));
      } else {
        setTimeout(() => {
          dispatcher(showError(err));
        }, 350);
      }
    };

    var postData = null;
    postData = {
      email: route.params.email,
    };

    dispatcher(show());
    axios
      .post(
        `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.FORGOT_PASSWORD}`,
        postData,
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View
      style={[
        {
          backgroundColor: COLORS.normal.white,
          flex: 1,
          paddingTop:
            Platform.OS === 'android'
              ? SIZES.twentyFive * 1.8
              : getStatusBarHeight(true) + 10,
          paddingHorizontal: SIZES.fifteen,
        },
      ]}>
      <Text
        style={[
          FONTS.boldFont24,
          {
            color: COLORS.primary.navy,
            textAlign: 'center',
            lineHeight: SIZES.twentyFive * 1.3,
          },
        ]}>
        {utils.getLabelText('OTP', language, 'title')}
      </Text>

      <Text
        style={[
          FONTS.semiBoldFont16,
          {
            color: COLORS.normal.charcoalGrey,
            textAlign: 'center',
            lineHeight: SIZES.twentyFive,
            marginTop: SIZES.ten,
          },
        ]}>
        {route.params.email}
      </Text>
      <View
        style={{
          marginTop: SIZES.twentyFive * 1.5,
          paddingHorizontal: SIZES.twentyFive,
        }}>
        <OTPInputView
          style={{
            width: '100%',
            height: SIZES.twenty * 5,
          }}
          pinCount={4}
          code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => {
            setCode(code);
          }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            // console.log(`Code is ${code}, you are good to go!`);
          }}
        />
      </View>

      <CustomButton
        label={utils.getLabelText('OTP', language, 'next')}
        style={{marginTop: SIZES.twentyFive}}
        onPress={() => {
          if (route.params.from === 'SIGN_UP') {
            verifyForSignUp();
          } else {
            verifyForForgotpassword();
          }
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
          {utils.getLabelText('OTP', language, 'Did')}
        </Text>
        <MyTouchableOpacity onPress={resendOTP}>
          <Text
            style={[
              FONTS.mediumFont12,
              {color: COLORS.primary.cherry, textAlign: 'center'},
            ]}>
            {' '}
            {utils.getLabelText('OTP', language, 'click')}
          </Text>
        </MyTouchableOpacity>
      </Row>

      <Loader visible={showLoader} />
    </View>
  );
}

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: SIZES.fifty,
    height: SIZES.fifty,
    borderWidth: 2,
    borderRadius: SIZES.twentyFive,
    borderColor: COLORS.normal.brownGrey,
    fontSize: SIZES.twentyFive,
    color: COLORS.normal.black,
    fontFamily: FONTFAMILY.Light,
  },
  underlineStyleHighLighted: {
    width: SIZES.fifty,
    height: SIZES.fifty,
    borderWidth: 2,
    borderRadius: SIZES.twentyFive,
    borderColor: COLORS.primary.navy,
    fontSize: SIZES.twentyFive,
    fontFamily: FONTFAMILY.Light,
  },
});
