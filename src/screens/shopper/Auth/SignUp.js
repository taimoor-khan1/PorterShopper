import React, {useState, useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import PhoneInput from 'react-native-phone-number-input';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {show as showError} from '../../../redux/slice/error';
import CustomButton from '../../../components/CustomButton';
import {show, hide} from '../../../redux/slice/loader';
import EditText from '../../../components/EditText';
import Row from '../../../components/Row';
import utils from '../../../utils';
import {
  STYLES,
  COLORS,
  FONTS,
  SIZES,
  FONTFAMILY,
  SCREENS,
  CONSTANTS,
} from './../../../constants/theme';

export default function SignUp({navigation}) {
  const dispatcher = useDispatch();
  const language = useSelector(state => state.languages.selectedLanguage);

  const phoneInput = useRef(null);
  const [isCountryCodePickerVisible, setisCountryCodePickerVisible] =
    useState(false);
  const [borderColor, setBorderColor] = useState(COLORS.normal.charcoalGrey);
  const [focus, setFocus] = useState(false);

  const toggleIsCountryCodePickerVisible = () => {
    setisCountryCodePickerVisible(!isCountryCodePickerVisible);
  };

  const [sighnUpData, setSignUpData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    countryCode: '+1',
  });

  const onSelect = country => {
    console.log('country.callingCode[0], ', country.callingCode[0]);
    setSignUpData(pre => ({
      ...pre,
      countryCode: !country.callingCode[0].includes('+')
        ? `+${country.callingCode[0]}`
        : country.callingCode[0],
    }));
  };

  const disabled = () => {
    if (
      !utils.isNull(sighnUpData.name) &&
      !utils.isNull(sighnUpData.email) &&
      !utils.isNull(sighnUpData.password) &&
      !utils.isNull(sighnUpData.confirmPassword) &&
      phoneInput.current?.isValidNumber(sighnUpData.phone)
    ) {
      return false;
    }
    return true;
  };

  const checkValidation = () => {
    if (
      utils.isEmptyOrSpaces(sighnUpData.name) ||
      sighnUpData.name.length < 3
    ) {
      utils.errorAlert('Invalid name');
      return false;
    }

    if (!utils.validateEmail(sighnUpData.email)) {
      utils.errorAlert('Invalid email');
      return false;
    }

    if (utils.isEmptyOrSpaces(sighnUpData.phone)) {
      utils.errorAlert('Invalid phone number');
      return false;
    }

    if (utils.isEmptyOrSpaces(sighnUpData.address)) {
      utils.errorAlert('Invalid Location');
      return false;
    }

    if (
      utils.isEmptyOrSpaces(sighnUpData.password) ||
      sighnUpData.password.length < 6 ||
      sighnUpData.password.length > 14
    ) {
      utils.errorAlert('Password should be in range 6-14');
      return false;
    }

    if (sighnUpData.password !== sighnUpData.confirmPassword) {
      utils.errorAlert('Passwords did not match');
      return false;
    }

    return true;
  };

  const signUpUser = () => {
    if (!checkValidation()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', sighnUpData.name);
    formData.append('email', sighnUpData.email.toLowerCase());
    formData.append('address', sighnUpData.address);
    formData.append('phone', sighnUpData.phone);
    formData.append('country_code', sighnUpData.countryCode);
    formData.append('password', sighnUpData.password);
    formData.append('password_confirmation', sighnUpData.confirmPassword);
    formData.append('verified_by', 'email');
    formData.append('role', '7');

    const onSuccess = ({data}) => {
      console.log('user register success: ', data);
      dispatcher(hide());
      utils.successAlert(
        'Registered successfully! Please enter the otp code to continue.',
      );
      navigation.navigate(SCREENS.Verification, {
        from: CONSTANTS.DESTINATIONS.SIGN_UP,
        email: sighnUpData.email,
      });
    };

    const onFailure = error => {
      console.log('user register onFailure: ', error);
      dispatcher(hide());
      let err = utils.showResponseError(error);
      dispatcher(showError(err));
    };

    console.log('formData: ', formData);

    dispatcher(show());

    axios
      .post(CONSTANTS.API_URLS.BASE + CONSTANTS.API_URLS.REGISTER, formData)
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <ScrollView
      style={[
        {
          backgroundColor: COLORS.normal.white,
          flex: 1,
          paddingTop:
            Platform.OS === 'android'
              ? SIZES.twentyFive * 1.8
              : getStatusBarHeight(true) + 10,
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
          {utils.getLabelText('SignUpScreen', language, 'title')}
          {/* Sign Up */}
        </Text>

        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.normal.charcoalGrey, marginTop: SIZES.ten},
          ]}>
          {utils.getLabelText('SignUpScreen', language, 'description')}
        </Text>
      </View>

      {/* ======================== TEXTINPUTS HERE ======================== */}

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder={utils.getLabelText('SignUpScreen', language, 'name')}
          value={sighnUpData.name}
          onChangeText={txt => {
            setSignUpData(pre => ({
              ...pre,
              name: txt,
            }));
          }}
        />
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder={utils.getLabelText('SignUpScreen', language, 'email')}
          value={sighnUpData.email}
          error={!utils.validateEmail(sighnUpData.email)}
          errorMessage={utils.getLabelText(
            'SignUpScreen',
            language,
            'invalidEmail',
          )}
          onChangeText={txt => {
            setSignUpData(pre => ({
              ...pre,
              email: txt,
            }));
          }}
        />
      </View>

      <PhoneInput
        placeholder={utils.getLabelText('SignUpScreen', language, 'Phone ')}
        ref={phoneInput}
        defaultCode="US"
        layout="first"
        defaultValue={sighnUpData.phone}
        onChangeCountry={onSelect}
        onChangeText={text => {
          setSignUpData(pre => ({
            ...pre,
            phone: text,
          }));
        }}
        textInputStyle={{padding: 0}}
        countryPickerButtonStyle={{
          borderRadius: SIZES.fifty,
        }}
        textContainerStyle={{
          borderRadius: SIZES.fifty,
          backgroundColor: 'transparent',
        }}
        containerStyle={{
          height: 60,
          width: '100%',
          borderRadius: SIZES.fifty,
          borderWidth: 1,
          borderColor: borderColor,
          marginTop: SIZES.fifteen * 1.3,
        }}
      />
      <Text
        style={{
          color: 'red',
          fontSize: SIZES.body10,
          marginLeft: SIZES.twenty,
        }}>
        {sighnUpData.phone.length &&
        !phoneInput.current?.isValidNumber(sighnUpData.phone)
          ? utils.getLabelText('SignUpScreen', language, 'invalidPhone ')
          : ''}
      </Text>

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder={utils.getLabelText('SignUpScreen', language, 'address')}
          value={sighnUpData.address}
          onChangeText={txt => {
            setSignUpData(pre => ({
              ...pre,
              address: txt,
            }));
          }}
        />
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder={utils.getLabelText('SignUpScreen', language, 'Password')}
          password
          hasIcon
          name="lock-open"
          error={utils.passValidation(sighnUpData.password)}
          errorMessage={utils.getLabelText(
            'SignUpScreen',
            language,
            'invalidPassword',
          )}
          type={FONTFAMILY.SimpleLineIcons}
          value={sighnUpData.password}
          onChangeText={txt => {
            setSignUpData(pre => ({
              ...pre,
              password: txt,
            }));
          }}
        />
      </View>

      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder={utils.getLabelText('SignUpScreen', language, 'Confirm ')}
          password
          hasIcon
          name="lock-open"
          error={
            utils.passValidation(sighnUpData.confirmPassword) ||
            sighnUpData.confirmPassword !== sighnUpData.password
          }
          errorMessage={utils.getLabelText(
            'SignUpScreen',
            language,
            'invalidConfirmPassword',
          )}
          type={FONTFAMILY.SimpleLineIcons}
          secureTextEntry={true}
          value={sighnUpData.confirmPassword}
          onChangeText={txt => {
            setSignUpData(pre => ({
              ...pre,
              confirmPassword: txt,
            }));
          }}
        />
      </View>

      <CustomButton
        label={utils.getLabelText('SignUpScreen', language, 'title')}
        style={{
          marginTop: SIZES.twentyFive,
          backgroundColor: disabled()
            ? `${COLORS.primary.navy}95`
            : COLORS.primary.navy,
        }}
        onPress={signUpUser}
        disabled={disabled()}
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
          {utils.getLabelText('SignUpScreen', language, 'already')}
        </Text>
        <MyTouchableOpacity onPress={() => navigation.navigate(SCREENS.Login)}>
          <Text
            style={[
              FONTS.mediumFont12,
              {color: COLORS.primary.cherry, textAlign: 'center'},
            ]}>
            {' '}
            {utils.getLabelText('SignUpScreen', language, 'login')}
          </Text>
        </MyTouchableOpacity>
      </Row>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
