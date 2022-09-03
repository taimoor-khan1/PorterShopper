import React from 'react';
import {
  Text,
  View,
  Image,
  Modal,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import MyTouchableOpacity from './MyTouchableOpacity';
import {logout} from '../redux/slice/auth';
import BackArrow from './BackArrow';
import {
  COLORS,
  FONTS,
  SIZES,
  IMAGES,
  CONSTANTS,
  STYLES,
  SCREENS,
} from '../constants';
import utils from '../utils';

export default function ScreenHeader({isBackArrow}) {
  const navigation = useNavigation();
  const dispatcher = useDispatch();
  const AccessToken = useSelector(state => state.Auth.accessToken);
  const [isLogoutModalVisible, setisLogoutModalVisible] = React.useState(false);
  const {profile} = useSelector(state => state.Profile);
  const language = useSelector(state => state.languages.selectedLanguage);

  return (
    <View style={{height: SIZES.twenty * 10}}>
      <ImageBackground
        blurRadius={3}
        resizeMode={'cover'}
        source={IMAGES.pizaBackground}
        style={{height: '100%', width: '100%', justifyContent: 'center'}}>
        <View style={styles.shadowStyle} />

        {/* <TouchableOpacity
          activeOpacity={0.85}
          style={{
            position: 'absolute',
            alignItems: 'center',
            top: height * 0.045,
            zIndex: 10,
            right: SIZES.fifteen * 1.5,
            backgroundColor: COLORS.primary.navy,
            padding: SIZES.ten,
            borderColor: COLORS.normal.white,
            borderRadius: width,
            borderWidth: 1.5,
          }}
          onPress={() => {
            setisLogoutModalVisible(true);
          }}>
          <Icon
            type={FONTFAMILY.Ionicons}
            name={'ios-power-outline'}
            style={{
              fontSize: SIZES.twenty,
              color: COLORS.normal.white,
            }}
          />
        </TouchableOpacity> */}

        {isBackArrow ? (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // marginVertical: SIZES.twenty,
              padding: SIZES.fifteen,
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <BackArrow isBright />
            <Text style={[FONTS.mediumFont16, {color: COLORS.normal.white}]}>
              {utils.getLabelText('PanelScreen', language, 'back')}
            </Text>
          </TouchableOpacity>
        ) : null}

        <MyTouchableOpacity
          style={styles.mainView}
          onPress={() => navigation.navigate(SCREENS.Profile)}>
          <Image
            source={{
              uri: CONSTANTS.API_URLS.IMAGE + profile?.image,
            }}
            style={styles.imageStyle}
          />

          <View style={{flex: 1, marginHorizontal: SIZES.twenty}}>
            <Text style={[FONTS.mediumFont18, {color: COLORS.normal.white}]}>
              {profile?.name}
            </Text>

            {/* <Text
              style={[
                FONTS.mediumFont10,
                {fontWeight: 'bold', color: COLORS.primary.navy},
              ]}>
              Associated With: {profile?.grocery?.name}
            </Text> */}

            {/* <Text style={[FONTS.mediumFont14, {color: COLORS.normal.white}]}>
              Fast Food, Pizza Experts
            </Text>
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                // marginTop: SIZES.ten,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Icon
                  name={'star'}
                  type={FONTFAMILY.Entypo}
                  style={{
                    fontSize: SIZES.twenty,
                    color: COLORS.normal.golden,
                  }}
                />
                <Text
                  style={[
                    FONTS.mediumFont10,
                    {color: COLORS.normal.white, marginStart: SIZES.five},
                  ]}>
                  {Number(profile?.ratings).toFixed(1)}
                </Text>
              </View>
              <View
                style={[
                  styles.statusViewStyle,
                  {
                    backgroundColor:
                      profile?.active_status === 'online'
                        ? COLORS.normal.trueGreen
                        : COLORS.normal.charcoalGrey,
                  },
                ]}>
                <Text
                  style={[FONTS.mediumFont10, {color: COLORS.normal.white}]}>
                  {profile?.active_status === 'online'
                    ? 'Available'
                    : 'Not Available'}
                </Text>
              </View>
            </View> */}
          </View>
        </MyTouchableOpacity>

        <View style={styles.associatedView}>
          <Text style={[FONTS.mediumFont12, {color: COLORS.normal.white}]}>
            {utils.getLabelText('PanelScreen', language, 'associates')}

            <Text style={[FONTS.boldFont18, {color: COLORS.primary.cherry}]}>
              {profile?.grocery?.name}{' '}
            </Text>
          </Text>
        </View>
      </ImageBackground>

      <Modal
        transparent
        statusBarTranslucent
        animationType="slide"
        visible={isLogoutModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContentView}>
            <Text
              style={[
                STYLES.headingText,
                {
                  color: COLORS.primary.navy,
                  marginTop: SIZES.five,
                  textAlign: 'center',
                },
              ]}>
              Porter Shoper
            </Text>
            <Text style={[STYLES.mediumText, styles.modalTextStyle]}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.flexRow}>
              <MyTouchableOpacity
                onPress={() => {
                  setisLogoutModalVisible(false);
                  setTimeout(() => {
                    dispatcher(
                      logout({accessToken: AccessToken, userID: profile.id}),
                    );
                  }, 250);
                }}
                style={[styles.modalBtnStyle, {marginEnd: SIZES.five}]}>
                <Text
                  style={[
                    STYLES.mediumText,
                    {color: COLORS.normal.white, fontSize: SIZES.body12},
                  ]}>
                  Yes
                </Text>
              </MyTouchableOpacity>
              <MyTouchableOpacity
                onPress={() => setisLogoutModalVisible(false)}
                style={[styles.modalBtnStyle, {marginStart: SIZES.five}]}>
                <Text
                  style={[
                    STYLES.mediumText,
                    {color: COLORS.normal.white, fontSize: SIZES.body12},
                  ]}>
                  No
                </Text>
              </MyTouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  statusViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginStart: SIZES.twenty,
    borderRadius: SIZES.twenty,
    paddingHorizontal: SIZES.ten,
    paddingVertical: SIZES.five - 1,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.fifteen,
  },
  associatedView: {
    right: SIZES.five,
    bottom: SIZES.ten,
    position: 'absolute',
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: SIZES.five,
    backgroundColor: `${COLORS.normal.white}50`,
  },
  imageStyle: {
    width: SIZES.twenty * 4,
    height: SIZES.twenty * 4,
    borderRadius: SIZES.twenty * 4,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SIZES.twenty,
    backgroundColor: `${COLORS.normal.black}60`,
  },
  modalContentView: {
    borderWidth: 1,
    padding: SIZES.ten * 2,
    borderRadius: SIZES.ten,
    borderColor: COLORS.primary.cherry,
    backgroundColor: COLORS.normal.white,
  },
  modalTextStyle: {
    textAlign: 'center',
    marginVertical: SIZES.twenty,
    color: COLORS.normal.black,
  },
  modalBtnStyle: {
    padding: SIZES.ten,
    width: SIZES.fifty,
    alignItems: 'center',
    backgroundColor: COLORS.primary.cherry,
    borderRadius: SIZES.ten,
  },
  shadowStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    backgroundColor: COLORS.normal.black + 50,
  },
});
