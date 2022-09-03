import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {COLORS, CONSTANTS, FONTS, SCREENS, SIZES} from '../../../constants';
import CustomButton from '../../../components/CustomButton';
import Loader from '../../../components/modals/Loader';
import EditText from '../../../components/EditText';
import utils from '../../../utils';

export default function NewPassword({navigation, route}) {
  const dispatcher = useDispatch();
  const language = useSelector(state => state.languages.selectedLanguage);

  const [showLoader, setshowLoader] = useState(false);
  const [passworData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleResetPassword = () => {
    const formData = new FormData();
    formData.append('email', route.params.email.toLowerCase());
    formData.append('password', passworData.password);
    formData.append('password_confirmation', passworData.confirmPassword);

    const onSuccess = ({data}) => {
      // console.log('SignUp success =========== ', data);
      setshowLoader(false);
      utils.successAlert(data.message);
      navigation.navigate(SCREENS.Login);
    };

    const onFailure = error => {
      console.log('onFailure ====== ===== ', error);
      setshowLoader(false);
      let err = utils.showResponseError(error);
      utils.errorAlert(err);
    };

    // console.log('formData===== ', formData);
    // dispatcher(show());
    setshowLoader(true);
    axios
      .post(
        `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.RESET_PASSWORD}`,
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
      {/* ======================== HEADER HERE ======================== */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[FONTS.boldFont22, {color: COLORS.primary.navy}]}>
          {utils.getLabelText('NewPassword', language, 'title')}
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
          {utils.getLabelText('NewPassword', language, 'description')}
        </Text>
      </View>

      <View style={{marginTop: SIZES.twentyFive * 2}}>
        <EditText
          placeholder={utils.getLabelText('NewPassword', language, 'Password')}
          value={passworData.password}
          onChangeText={txt => {
            setPasswordData(prev => ({
              ...prev,
              password: txt,
            }));
          }}
          error={utils.passValidation(passworData.password)}
          errorMessage={utils.getLabelText(
            'NewPassword',
            language,
            'invalidPassword',
          )}
        />
      </View>

      <View style={{marginTop: SIZES.twentyFive * 2}}>
        <EditText
          placeholder={utils.getLabelText('NewPassword', language, 'Confirm ')}
          value={passworData.confirmPassword}
          onChangeText={txt => {
            setPasswordData(prev => ({
              ...prev,
              confirmPassword: txt,
            }));
          }}
          error={
            utils.passValidation(passworData.confirmPassword) ||
            passworData.confirmPassword !== passworData.password
          }
          errorMessage={utils.getLabelText(
            'NewPassword',
            language,
            'invalidConfirmPassword ',
          )}
        />
      </View>
      <CustomButton
        label={utils.getLabelText('NewPassword', language, 'next ')}
        style={{
          marginTop: SIZES.twentyFive * 2,
        }}
        onPress={handleResetPassword}
      />
      <Loader visible={showLoader} />
    </View>
  );
}

const styles = StyleSheet.create({});
