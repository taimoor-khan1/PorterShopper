import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import {Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import UploadPhotoModal from '../../../components/modals/UploadPhotoModal';
import DatePickerModal from '../../../components/modals/DatePickerModal';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import CircularImage from '../../../components/CircularImage';
import {show as showError} from '../../../redux/slice/error';
import {show, hide} from '../../../redux/slice/loader';
import {profile} from '../../../redux/slice/profile';
import EditText from '../../../components/EditText';
import Row from '../../../components/Row';
import utils from '../../../utils';
import {
  COLORS,
  CONSTANTS,
  FONTFAMILY,
  FONTS,
  height,
  SIZES,
  STYLES,
  width,
} from '../../../constants';
import BackArrow from '../../../components/BackArrow';

export default function Profile({navigation}) {
  const dispatcher = useDispatch();
  const User = useSelector(state => state.Profile.profile);
  const TOKEN = useSelector(state => state.Auth.accessToken);
  const language = useSelector(state => state.languages.selectedLanguage);

  // console.log('user profile: ', User);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [zipCode, setzipCode] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDatePickerModalVisible, setIsDatePickerModalVisible] =
    useState(false);

  useEffect(() => {
    setName(User.name);
    setEmail(User.email);
    setPhone(User.phone);
    setdateOfBirth(User.dob);
    setzipCode(User.zip_code);
    setCountryCode(User.country_code);
    setImage(User.image ? CONSTANTS.API_URLS.IMAGE + User.image : null);
  }, [User]);

  const checkValidation = () => {
    if (utils.isEmptyOrSpaces(name) || name.length < 3) {
      utils.warningAlert('Invalid name');
      return false;
    }
    if (utils.isEmptyOrSpaces(phone) || phone.length < 8 || phone.length > 13) {
      utils.warningAlert('Invalid phone number');
      return false;
    }
    if (!utils.validateEmail(email)) {
      utils.warningAlert('Invalid email');
      return false;
    }
    if (utils.isEmptyOrSpaces(dateOfBirth)) {
      utils.warningAlert('Invalid Date of Birth');
      return false;
    }
    if (utils.isEmptyOrSpaces(zipCode)) {
      utils.warningAlert('Invalid Zip Code ');
      return false;
    }
    return true;
  };

  const updateProfile = () => {
    if (!checkValidation()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('dob', dateOfBirth);
    formData.append('zip_code', zipCode);
    formData.append('image', {
      ...image,
      type: 'image/jpg',
      name: `profile_picture.jpg`,
      uri: Platform.OS === 'android' ? image : image.replace('file:///', ''),
    });

    const options = {
      headers: {
        Authorization: TOKEN,
      },
    };

    const onSuccess = ({data}) => {
      dispatcher(hide());
      utils.successAlert('Profile updated successfully!');
      dispatcher(profile(false, false))
        .unwrap()
        .then(_response => {
          // console.log('asdjkjashdaskdaskjnjld ======= ', _response);
        })
        .catch(e => console.log('e ======== ', e));
    };

    const onFailure = error => {
      dispatcher(hide());
      let err = utils.showResponseError(error);
      dispatcher(showError(err));
      console.log('update profile error ======== ', error);
    };

    dispatcher(show());

    axios
      .post(
        `${CONSTANTS.API_URLS.BASE}${CONSTANTS.API_URLS.UPDATE_PROFILE}`,
        formData,
        options,
      )
      .then(onSuccess)
      .catch(onFailure);
  };

  return (
    <View style={[STYLES.container]}>
      <View
        style={{
          backgroundColor: COLORS.primary.navy,
          borderBottomLeftRadius: SIZES.twenty,
          borderBottomRightRadius: SIZES.twenty,
          paddingVertical: SIZES.fifteen,
          paddingHorizontal: SIZES.fifteen,
          paddingTop: getStatusBarHeight(),
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // marginTop: getStatusBarHeight(),
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: SIZES.fifteen,
              marginLeft: -SIZES.twenty,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <BackArrow isBright />
            <Text style={[FONTS.mediumFont16, {color: COLORS.normal.white}]}>
              {utils.getLabelText('ProfileScreen', language, 'back')}
            </Text>
          </TouchableOpacity>

          <MyTouchableOpacity
            onPress={updateProfile}
            style={[
              STYLES.shadow,
              {
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: SIZES.ten,
                paddingVertical: SIZES.five,
                borderRadius: SIZES.five * 1.3,
                backgroundColor: COLORS.primary.cherry,
              },
            ]}>
            <Text style={[FONTS.mediumFont16, {color: COLORS.normal.white}]}>
              {utils.getLabelText('ProfileScreen', language, 'save')}
            </Text>
          </MyTouchableOpacity>
        </View>

        <View style={{alignItems: 'center'}}>
          <View>
            <CircularImage
              uri={image}
              imageStyle={{
                height: SIZES.twentyFive * 4,
                width: SIZES.twentyFive * 4,
                borderRadius: SIZES.twentyFive * 4,
              }}
            />

            <MyTouchableOpacity
              style={{
                backgroundColor: COLORS.primary.cherry,
                alignItems: 'center',
                padding: SIZES.five * 1.8,
                borderRadius: SIZES.fifty,
                position: 'absolute',
                end: 0,
                bottom: -3,
              }}
              onPress={() => {
                setIsModalVisible(true);
              }}>
              <Icon
                name={'camera'}
                type={FONTFAMILY.Feather}
                style={{color: COLORS.normal.white, fontSize: SIZES.body16}}
              />
            </MyTouchableOpacity>
          </View>
          <Text
            style={[
              FONTS.boldFont22,
              {color: COLORS.normal.white, marginTop: SIZES.ten * 1.3},
            ]}>
            {name}
          </Text>
          {/* <StarRating
            disabled
            animation={'rotate'}
            emptyStar={IMAGES.StarUnfilled}
            fullStar={IMAGES.StarFilled}
            maxStars={5}
            halfStarEnabled={false}
            rating={User?.ratings}
            starSize={30}
            containerStyle={{
              width: '45%',
              alignSelf: 'center',
            }}
            style={{marginTop: SIZES.ten}}
          /> */}
        </View>

        <Text
          style={[
            FONTS.mediumFont10,
            {
              opacity: 0,
              textAlign: 'right',
              marginTop: SIZES.ten,
              color: COLORS.normal.brownGrey,
            },
          ]}>
          @robert9432
        </Text>
      </View>

      <ScrollView
        bounces={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <View style={{}}>
          <Text
            style={[
              FONTS.mediumFont12,
              {
                color: COLORS.normal.black,
                marginLeft: SIZES.fifteen * 0.6,
                marginBottom: SIZES.five,
              },
            ]}>
            {utils.getLabelText('ProfileScreen', language, 'name')}
          </Text>
          <EditText
            placeholder={utils.getLabelText('ProfileScreen', language, 'name')}
            value={name}
            onChangeText={txt => {
              setName(txt);
            }}
          />
        </View>

        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.ten,
          }}>
          <View style={{flex: 1}}>
            <Text
              style={[
                FONTS.mediumFont12,
                {
                  color: COLORS.normal.black,
                  marginLeft: SIZES.fifteen * 0.6,
                  marginBottom: SIZES.five,
                },
              ]}>
              {utils.getLabelText('ProfileScreen', language, 'contact')}
            </Text>
            <EditText
              placeholder={utils.getLabelText(
                'ProfileScreen',
                language,
                'contact',
              )}
              keyboardType="number-pad"
              editable={false}
              value={countryCode + ' ' + phone}
              error={phone.length < 9 || phone.length > 19}
              errorMessage={utils.getLabelText(
                'ProfileScreen',
                language,
                'invalidPhone',
              )}
            />
          </View>
        </Row>

        <View style={{marginTop: SIZES.ten}}>
          <Text
            style={[
              FONTS.mediumFont12,
              {
                color: COLORS.normal.black,
                marginLeft: SIZES.fifteen * 0.6,
                marginBottom: SIZES.five,
              },
            ]}>
            {utils.getLabelText('ProfileScreen', language, 'email')}
          </Text>
          <EditText
            placeholder={utils.getLabelText('ProfileScreen', language, 'email')}
            editable={false}
            value={email}
            error={!utils.validateEmail(email)}
            errorMessage={utils.getLabelText(
              'ProfileScreen',
              language,
              'invalidEmail',
            )}
            onChangeText={txt => {
              setEmail(txt);
            }}
          />
        </View>

        <View style={{marginTop: SIZES.ten}}>
          <Text
            style={[
              FONTS.mediumFont12,
              {
                color: COLORS.normal.black,
                marginLeft: SIZES.fifteen * 0.6,
                marginBottom: SIZES.five,
              },
            ]}>
            {utils.getLabelText('ProfileScreen', language, 'DOB')}
          </Text>
          <MyTouchableOpacity onPress={() => setIsDatePickerModalVisible(true)}>
            <EditText
              editable={false}
              placeholder={utils.getLabelText('ProfileScreen', language, 'DOB')}
              value={dateOfBirth}
              onChangeText={txt => {
                setdateOfBirth(txt);
              }}
            />
          </MyTouchableOpacity>
        </View>

        <View style={{marginTop: SIZES.ten}}>
          <Text
            style={[
              FONTS.mediumFont12,
              {
                color: COLORS.normal.black,
                marginLeft: SIZES.fifteen * 0.6,
                marginBottom: SIZES.five,
              },
            ]}>
            {utils.getLabelText('ProfileScreen', language, 'zip')}
          </Text>
          <EditText
            placeholder={utils.getLabelText('ProfileScreen', language, 'zip')}
            value={zipCode}
            onChangeText={txt => {
              setzipCode(txt);
            }}
          />
        </View>
      </ScrollView>

      <UploadPhotoModal
        visibility={isModalVisible}
        setVisibility={setIsModalVisible}
        isCircle
        onImageSelected={image => {
          setImage(image);
        }}
      />

      <DatePickerModal
        visibility={isDatePickerModalVisible}
        setVisibility={setIsDatePickerModalVisible}
        onDateSelected={date => {
          let formattedDate = moment(date).format('YYYY-MM-DD');
          setdateOfBirth(formattedDate);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  datepicker: {
    backgroundColor: COLORS.primary.navy,
    height: Platform.OS === 'android' ? height * 0.15 : height * 0.18,
    width: width - SIZES.twenty * SIZES.five,
    marginVertical: SIZES.five,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: SIZES.twenty,
    paddingBottom: SIZES.fifty,
    paddingHorizontal: SIZES.fifteen,
  },
  imageView: {
    width: '47%',
    height: SIZES.fifty * 2,
    marginVertical: SIZES.ten,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.ten,
  },
  crossIconView: {
    top: -6,
    right: -6,
    zIndex: 10,
    position: 'absolute',
  },
  crossIconStyle: {
    width: 20,
    height: 20,
  },
});

const identities = [
  {id: 1, name: 'Driving License'},
  {id: 2, name: 'Passport'},
  {id: 3, name: 'CNIC'},
];
