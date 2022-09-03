import React, {useState} from 'react';
import {
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {show as showError} from '../../../redux/slice/error';
import CustomButton from '../../../components/CustomButton';
import {show, hide} from '../../../redux/slice/loader';
import EditText from '../../../components/EditText';
import {login} from '../../../redux/slice/auth';
import utils from '../../../utils';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
} from '../../../constants';
import {getLabels} from '../../../redux/slice/labels';
import SelectLanguages from '../../../components/SelectLanguages';

export default function Login(props) {
  const dispatcher = useDispatch();
  const language = useSelector(state => state.languages.selectedLanguage);
  React.useEffect(() => {
    dispatcher(getLabels(''));
  }, []);

  const [loginData, setLoginData] = useState({
    email: __DEV__ ? 'john_shopper@yopmail.com' : '',
    password: __DEV__ ? '12345678' : '',
  });

  const disable = () => {
    return utils.isNull(loginData.email) || utils.isNull(loginData.password);
  };

  const loginUser = async (email, password) => {
    if (!utils.validateEmail(loginData.email)) {
      utils.errorAlert('Invalid Email');
      return;
    }

    if (utils.isEmptyOrSpaces(loginData.password)) {
      utils.errorAlert('Invalid Password');
      return;
    }

    if (password.length < 6) {
      utils.errorAlert('Password should not be less than 6 digits');
      return;
    }

    dispatcher(show());

    dispatcher(login({email, password}))
      .unwrap()
      .then(_response => {
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            dispatcher(hide());
          }, 350);
        } else {
          dispatcher(hide());
        }
        if (_response.status === 2) {
          // console.log('Login: User Not Verified: ', _response.data.otp);
          // utils.warningAlert(_response.message);
          props.navigation.navigate(SCREENS.Verification, {
            email: loginData.email,
            from: CONSTANTS.DESTINATIONS.SIGN_UP,
          });
        }
      })
      .catch(e => {
        dispatcher(hide());
        if (Platform.OS === 'ios') {
          setTimeout(() => {
            dispatcher(showError(e));
          }, 350);
        } else {
          dispatcher(hide());
          dispatcher(showError(e));
        }
      });
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
      contentContainerStyle={{
        paddingBottom: SIZES.twenty * 2,
        paddingHorizontal: SIZES.fifteen,
      }}>
      <StatusBar
        hidden={false}
        barStyle={'dark-content'}
        backgroundColor={COLORS.normal.white}
      />

      {/* ======================== HEADER HERE ======================== */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[FONTS.boldFont22, {color: COLORS.primary.navy}]}>
            
        </Text>

        <Text
          style={[
            FONTS.mediumFont14,
            {color: COLORS.normal.charcoalGrey, marginTop: SIZES.ten},
          ]}>
          {utils.getLabelText('LoginScreen', language, 'description')}
        </Text>
      </View>

      {/* ======================== TEXTINPUTS HERE ======================== */}
      <View style={{}}>
        <View style={{marginTop: SIZES.twentyFive}}>
          <EditText
            placeholder={utils.getLabelText('LoginScreen', language, 'email')}
            hasIcon
            name="mail"
            type={FONTFAMILY.AntDesign}
            value={loginData.email}
            error={!utils.validateEmail(loginData.email)}
            errorMessage={utils.getLabelText(
              'LoginScreen',
              language,
              'invalidEmail',
            )}
            onChangeText={txt => {
              setLoginData(prev => ({
                ...prev,
                email: txt,
              }));
            }}
          />
        </View>
        <View style={{marginTop: SIZES.fifteen}}>
          <EditText
            placeholder={utils.getLabelText(
              'LoginScreen',
              language,
              'Password',
            )}
            password
            hasIcon
            name="lock-open"
            error={utils.passValidation(loginData.password)}
            errorMessage={utils.getLabelText(
              'LoginScreen',
              language,
              'invalidPassword',
            )}
            type={FONTFAMILY.SimpleLineIcons}
            value={loginData.password}
            onChangeText={txt => {
              setLoginData(prev => ({
                ...prev,
                password: txt,
              }));
            }}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{alignSelf: 'center'}}
          onPress={() =>
            props.navigation.navigate(SCREENS.ForgotPassword, {
              email: loginData.email,
            })
          }>
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.primary.navy, marginVertical: SIZES.twenty},
            ]}>
            {utils.getLabelText('LoginScreen', language, 'forget')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ======================== BUTTONS HERE ======================== */}
      <View style={{}}>
        <CustomButton
          label={utils.getLabelText('LoginScreen', language, 'login')}
          style={{
            marginTop: SIZES.ten,
            backgroundColor: disable()
              ? `${COLORS.primary.navy}95`
              : COLORS.primary.navy,
          }}
          disable={disable()}
          onPress={() => {
            loginUser(loginData.email, loginData.password);
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: SIZES.twenty * 2,
        }}>
        <Text style={[FONTS.mediumFont16]}>
          {utils.getLabelText('LoginScreen', language, 'TitleSignUp')}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            props.navigation.navigate(SCREENS.SignUp);
          }}>
          <Text style={[FONTS.mediumFont16, {color: COLORS.primary.navy}]}>
            {utils.getLabelText('LoginScreen', language, 'signup')}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <SelectLanguages />
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
