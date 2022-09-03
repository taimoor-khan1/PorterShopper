import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {COLORS, CONSTANTS, FONTS, SCREENS, SIZES} from '../../../constants';
import {show as showError} from '../../../redux/slice/error';
import CustomButton from '../../../components/CustomButton';
import Loader from '../../../components/modals/Loader';
import BackArrow from '../../../components/BackArrow';
import EditText from '../../../components/EditText';
import utils from '../../../utils';

export default function ForgotPassword({navigation, route}) {
  const dispatcher = useDispatch();
  const [email, setEmail] = useState('');
  const [showLoader, setshowLoader] = useState(false);
  const language = useSelector(state => state.languages.selectedLanguage);

  const disabled = () => {
    if (!utils.isNull(email)) {
      return false;
    }
    return true;
  };

  const handleForgotPassword = () => {
    if (!utils.validateEmail(email)) {
      utils.errorAlert('Invalid email');
      return false;
    }
    const formData = new FormData();
    formData.append('email', email.toLowerCase());

    const onSuccess = ({data}) => {
      // console.log('SignUp success =========== ', data);
      setshowLoader(false);

      navigation.navigate(SCREENS.Verification, {
        from: CONSTANTS.DESTINATIONS.FORGOT_PASSWORD,
        email: email,
      });
    };

    const onFailure = error => {
      console.log('onFailure ====== ===== ', error);
      setshowLoader(false);
      let err = utils.showResponseError(error);
      dispatcher(showError(err));
    };

    // console.log('formData===== ', formData);
    // dispatcher(show());
    setshowLoader(true);
    axios
      .post(
        `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.FORGOT_PASSWORD}`,
        formData,
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
      <BackArrow />
      {/* ======================== HEADER HERE ======================== */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[FONTS.boldFont22, {color: COLORS.primary.navy}]}>
          {utils.getLabelText('ForgetPasswordScreen', language, 'title')}
        </Text>

        <Text
          style={[
            FONTS.mediumFont14,
            {
              color: COLORS.normal.charcoalGrey,
              marginTop: SIZES.ten,
              textAlign: 'center',
              lineHeight: SIZES.twentyFive,
            },
          ]}>
          {utils.getLabelText('ForgetPasswordScreen', language, 'description')}
        </Text>
      </View>

      <View style={{marginTop: SIZES.twentyFive * 2}}>
        <EditText
          placeholder={utils.getLabelText(
            'ForgetPasswordScreen',
            language,
            'email',
          )}
          value={email}
          onChangeText={setEmail}
          error={!utils.validateEmail(email)}
          errorMessage={utils.getLabelText(
            'ForgetPasswordScreen',
            language,
            'invalidEmail',
          )}
        />
      </View>
      <CustomButton
        label={utils.getLabelText('ForgetPasswordScreen', language, 'send')}
        style={{
          marginTop: SIZES.twentyFive * 2,
          backgroundColor: disabled()
            ? `${COLORS.primary.navy}95`
            : COLORS.primary.navy,
        }}
        disabled={disabled()}
        onPress={handleForgotPassword}
      />

      <Loader visible={showLoader} />
    </View>
  );
}

const styles = StyleSheet.create({});
