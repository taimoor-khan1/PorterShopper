import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import {Icon} from 'native-base';
import {Switch} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import {deactivateAccount, logout} from '../../../redux/slice/auth';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  SCREENS,
  SIZES,
  STYLES,
} from '../../../constants';
import utils from '../../../utils';
import SelectLanguages from '../../../components/SelectLanguages';

export default function Settings(props) {
  const {navigation} = props;
  const dispatcher = useDispatch();
  const language = useSelector(state => state.languages.selectedLanguage);

  const {profile} = useSelector(state => state.Profile);
  const AccessToken = useSelector(state => state.Auth.accessToken);
  const [isLogoutModalVisible, setisLogoutModalVisible] = useState(false);
  const [isDeactivateModalVisible, setIsDeactivateModalVisible] =
    useState(false);

  const [itemName, setItemName] = useState('');
  const [bg, setbg] = useState(COLORS.normal.white);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const onDeactivateAccount = () => {
    setIsDeactivateModalVisible(false);
    dispatcher(
      deactivateAccount({accessToken: AccessToken, userID: profile.id}),
    );
  };

  const SettingsCategory = ({iconName, name, iconType, isswitch, onPress}) => {
    return (
      <TouchableOpacity
        style={[
          STYLES.shadow,
          {
            marginTop: SIZES.twentyFive,
            borderRadius: SIZES.twenty * 2,
            padding: SIZES.twenty,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor:
              itemName === name ? COLORS.primary.navy : COLORS.normal.white,
          },
        ]}
        activeOpacity={0.6}
        onPress={onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: SIZES.twenty * 1.6,
              width: SIZES.twenty * 1.6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              type={iconType}
              name={iconName}
              style={{
                color:
                  itemName === name
                    ? COLORS.normal.white
                    : COLORS.normal.brownGrey,
                fontSize: SIZES.twenty * 1.2,
                // backgroundColor: 'red',
              }}
            />
          </View>
          <Text
            style={[
              FONTS.mediumFont14,
              {
                color:
                  itemName === name
                    ? COLORS.normal.white
                    : COLORS.normal.brownGrey,
                marginStart: SIZES.fifteen,
              },
            ]}>
            {name}
          </Text>
        </View>
        {isswitch ? (
          <Switch
            value={isSwitchOn}
            onValueChange={onToggleSwitch}
            thumbColor={
              isSwitchOn ? COLORS.primary.cherry : COLORS.normal.brownGrey
            }
            trackColor={{
              false: COLORS.normal.halfpwhite,
              true: COLORS.normal.brownGrey,
            }}
          />
        ) : (
          <Icon
            type={FONTFAMILY.Entypo}
            name={'chevron-small-right'}
            style={{
              color:
                itemName === name
                  ? COLORS.normal.white
                  : COLORS.normal.brownGrey,
            }}
          />
        )}
      </TouchableOpacity>
    );
  };
  //   console.log('======== ', itemName);
  return (
    <View
      style={[
        STYLES.container,
        {
          backgroundColor: COLORS.normal.white,
          paddingHorizontal: SIZES.fifteen,
        },
      ]}>
      <SettingsCategory
        iconType={FONTFAMILY.Entypo}
        name={utils.getLabelText('SettingScreen', language, 'about')}
        iconName="info"
        onPress={() => navigation.navigate(SCREENS.AboutUs)}
      />
      <SettingsCategory
        iconType={FONTFAMILY.FontAwesome}
        name={utils.getLabelText('SettingScreen', language, 'term')}
        iconName="file-text"
        onPress={() => navigation.navigate(SCREENS.TermsAndConditions)}
      />
      <SettingsCategory
        iconType={FONTFAMILY.FontAwesome5}
        name={utils.getLabelText('SettingScreen', language, 'help')}
        iconName="user-cog"
        onPress={() => navigation.navigate(SCREENS.HelpAndSupport)}
      />
      <SettingsCategory
        iconType={FONTFAMILY.FontAwesome5}
        name={utils.getLabelText('SettingScreen', language, 'delete')}
        iconName="user-times"
        onPress={() => setIsDeactivateModalVisible(true)}
      />
      <SettingsCategory
        iconType={FONTFAMILY.Entypo}
        name={utils.getLabelText('SettingScreen', language, 'logout')}
        iconName="log-out"
        onPress={() => setisLogoutModalVisible(true)}
      />
      <Text
        style={[
          FONTS.boldFont18,
          {
            color: COLORS.normal.brownGrey,
            marginTop: SIZES.twentyFive,
            alignSelf: 'center',
          },
        ]}>
        Select Language
      </Text>
      <SelectLanguages />

      {/* <SettingsCategory
        iconType={FONTFAMILY.FontAwesome5}
        name={'Profile Settings'}
        iconName="user-cog"
        onPress={() => {
          setItemName('Profile Settings');
        }}
      />
      <SettingsCategory
        iconType={FONTFAMILY.FontAwesome5}
        name={'Payment Settings'}
        iconName="money-check"
        onPress={() => {
          setItemName('Payment Settings');
        }}
      />
      <SettingsCategory
        name={'Notifications'}
        isswitch
        iconType={FONTFAMILY.Ionicons}
        iconName={'notifications-sharp'}
        onPress={() => {
          setItemName('Notifications');
        }}
      />
      <SettingsCategory
        iconType={FONTFAMILY.MaterialIcons}
        name={'Updates'}
        iconName="system-update-alt"
        onPress={() => {
          setItemName('Updates');
        }}
      /> */}

      {/* Deactivate Account Modal */}
      <Modal
        transparent
        statusBarTranslucent
        animationType="slide"
        visible={isDeactivateModalVisible}>
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
              {utils.getLabelText('SettingScreen', language, 'porter')}
            </Text>
            <Text style={[STYLES.mediumText, styles.modalTextStyle]}>
              {utils.getLabelText('SettingScreen', language, 'detail')}

              {/* {`Are you sure you want to delete your account? \n\n By deleting your account, your data will be wiped off from our servers and your data won’t be available after deleting this account.`} */}
            </Text>
            <View style={styles.flexRow}>
              <MyTouchableOpacity
                onPress={onDeactivateAccount}
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
                onPress={() => setIsDeactivateModalVisible(false)}
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

      {/* Logout Modal */}
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
              {utils.getLabelText('SettingScreen', language, 'porter')}
            </Text>
            <Text style={[STYLES.mediumText, styles.modalTextStyle]}>
              {/* Are you sure you want to logout? */}
              {utils.getLabelText('SettingScreen', language, 'detail')}
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
                  {utils.getLabelText('SettingScreen', language, 'yes')}
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
                  {utils.getLabelText('SettingScreen', language, 'no')}
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
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
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
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
