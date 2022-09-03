import {Dimensions, Platform, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const {width, height} = Dimensions.get('window');

/* *************** Colors ********** */

export const COLORS = {
  primary: {
    navy: '#001e3e',
    cherry: '#dd003e',
  },

  normal: {
    black: '#000000',
    white: '#ffffff',
    charcoalGrey: '#4a4b4d',
    brownGrey: '#949494',
    blue: '#0037c1',
    brightYellow: '#fcf400',
    golden: '#FFD700',
    veryLightPink: '#f1ecec',
    halfpwhite: '#eeeeee',
    transparent: 'transparent',
    naviWithOpacity: 'rgba(0,30,62,0.4)',
    trueGreen: '#1eaf08',
  },
};

const appTheme = {COLORS};

export default appTheme;

/* * Fonts * */
export const FONTFAMILY = {
  Light: 'Metropolis-Light',
  Medium: 'Metropolis-Medium',
  Regular: 'Metropolis-Regular',
  SemiBold: 'Metropolis-SemiBold',
  Bold: 'Metropolis-Bold',
  Ionicons: 'Ionicons',
  AntDesign: 'AntDesign',
  EvilIcons: 'EvilIcons',
  Entypo: 'Entypo',
  FontAwesome: 'FontAwesome',
  Feather: 'Feather',
  MaterialIcons: 'MaterialIcons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Octicons: 'Octicons',
  SimpleLineIcons: 'SimpleLineIcons',
  Fontisto: 'Fontisto',
  FontAwesome5: 'FontAwesome5',
};

/* * Images * */
export const IMAGES = {
  noWifi: require('../assets/noWifi.png'),
  iconArrowDown: require('../assets/IconArrowDown.png'),
  DeliveryFeeIcon: require('../assets/DeliveryFeeIcon.png'),
  FastDeliveryLogo: require('../assets/FastDeliveryLogo.png'),
  identyCard: require('../assets/identyCard.png'),
  bycke: require('../assets/bycke.png'),
  pizaBackground: require('../assets/Piza.jpg'),
  visalogo: require('../assets/visa-logo.png'),
  paypal: require('../assets/paypal.png'),
  deliveryManMarker: require('../assets/deliveryManMarker.png'),
  restaurantMapMarker: require('../assets/restaurantMapMarker.png'),
  user: require('../assets/user.png'),
  ScannerBg: require('../assets/ScannerBg.png'),
  QrCodeIcon: require('../assets/QrCodeIcon.png'),
  btnQrCodeScan: require('../assets/btnQrCodeScan.png'),
  loader: require('../assets/loader.png'),
  Loader1: require('../assets/Loader1.gif'),
};

/* * Screens * */
export const SCREENS = {
  /* * Shared  Screens * */
  Splash: 'Splash',
  UserType: 'UserType',
  Notifications: 'Notifications',
  TermsAndConditions: 'TermsAndConditions',
  ForgotPassword: 'ForgotPassword',
  NewPassword: 'NewPassword',
  Verification: 'Verification',
  Settings: 'Settings',
  Faqs: 'Faqs',
  DrawerNavigation: 'DrawerNavigation',
  Profile: 'Profile',

  /* * Shoper Screens * */
  Auth: 'Stack',
  Login: 'Login',
  SignUp: 'SignUp',
  BankInformation: 'BankInformation',
  Verification: 'Verification',
  EditRiderDetails: 'EditRiderDetails',
  Panel: 'Panel',
  CheckOut: 'CheckOut',
  OrdersDetail: 'OrderDetail',
  OrderHistory: 'OrderHistory',
  HelpAndSupport: 'HelpAndSupport',
  NewOrders: 'NewOrders',
  Home: 'Home',
  Chat: 'Chat',
  AboutUs: 'AboutUs',
};

export const SIZES = {
  // global sizes
  five: height * 0.0055,
  ten: height * 0.011,
  fifteen: height * 0.017,
  twenty: height * 0.023,
  twentyWidth: width * 0.05,
  twentyFive: height * 0.03,
  twentyFiveWidth: width * 0.08,
  fifty: height * 0.075,
  fiftyWidth: width * 0.13,

  // font sizes
  // h16: width * 0.034,
  // h18: width * 0.038,
  // h20: width * 0.042,
  // h22: width * 0.048,
  // h24: width * 0.055,
  // body08: width * 0.024,
  // body10: width * 0.028,
  // body12: width * 0.032,
  // body14: width * 0.036,
  // body16: width * 0.04,
  // body18: width * 0.045,

  // updated font sizes
  h16: width * 0.036,
  h18: width * 0.04,
  h20: width * 0.044,
  h22: width * 0.05,
  h24: width * 0.057,
  body08: width * 0.026,
  body10: width * 0.03,
  body12: width * 0.034,
  body14: width * 0.039,
  body16: width * 0.05,
  body18: width * 0.047,
};

export const FONTS = {
  boldFont16: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h16,
    color: COLORS.normal.black,
  },
  boldFont18: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h18,
    color: COLORS.normal.black,
  },
  boldFont20: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h20,
    color: COLORS.normal.black,
  },
  boldFont22: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h22,
    color: COLORS.normal.black,
  },
  boldFont24: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.h24,
    color: COLORS.normal.black,
  },
  semiBoldFont16: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h16,
    color: COLORS.normal.black,
  },
  semiBoldFont18: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h18,
    color: COLORS.normal.black,
  },
  semiBoldFont20: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h20,
    color: COLORS.normal.black,
  },
  semiBoldFont22: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h22,
    color: COLORS.normal.black,
  },
  semiBoldFont24: {
    fontFamily: FONTFAMILY.SemiBold,
    fontSize: SIZES.h24,
    color: COLORS.normal.black,
  },
  mediumFont10: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body10},
  mediumFont12: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body12},
  mediumFont14: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body14},
  mediumFont16: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body16},
  mediumFont18: {fontFamily: FONTFAMILY.Medium, fontSize: SIZES.body18},
  regularFont10: {fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body10},
  regularFont12: {fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body12},
  regularFont14: {fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body14},
  regularFont16: {fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body16},
  regularFont18: {fontFamily: FONTFAMILY.Regular, fontSize: SIZES.body18},
  lightFont08: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body08},
  lightFont10: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body10},
  lightFont12: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body12},
  lightFont14: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body14},
  lightFont16: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body16},
  lightFont18: {fontFamily: FONTFAMILY.Light, fontSize: SIZES.body18},
};

export const STYLES = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.normal.white,
    // paddingTop:
    //   Platform.OS === 'android'
    //     ? SIZES.twentyFive * 1.8
    //     : getStatusBarHeight(true),
  },
  splashLogo: {
    width: SIZES.fifteen * 13,
    height: SIZES.fifteen * 13,
    alignSelf: 'center',
  },
  loginView: {
    flex: 1,
    width: '100%',
    marginTop: SIZES.twenty,
    paddingHorizontal: SIZES.twenty,
  },
  lightText: {
    fontFamily: FONTFAMILY.Light,
  },
  mediumText: {
    fontFamily: FONTFAMILY.Medium,
  },
  boldText: {
    fontFamily: FONTFAMILY.Bold,
  },
  headingText: {
    fontFamily: FONTFAMILY.Bold,
    fontSize: SIZES.twenty + 5,
    color: COLORS.normal.black,
  },
  paragraphText: {
    fontFamily: FONTFAMILY.Medium,
    fontSize: SIZES.fifteen - 1,
    color: COLORS.normal.black,
  },
  drawerItem: {
    paddingHorizontal: SIZES.fifteen + 3,
    paddingVertical: SIZES.fifteen,
    alignItems: 'center',
    borderRadius: SIZES.fifteen,
  },
  drawerIcon: {
    fontSize: SIZES.fifteen + 10,
  },
  drawerText: {
    fontSize: SIZES.fifteen,
    fontFamily: FONTFAMILY.Medium,
    color: COLORS.normal.black,
    marginHorizontal: SIZES.fifteen - 5,
  },
  horLine: {
    height: 0.3,
    backgroundColor: COLORS.normal.brownGrey,
  },
  shadow: {
    backgroundColor: COLORS.normal.white,
    shadowColor: COLORS.normal.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.0,
    elevation: 5,
  },
});

/* * Api Path * */
export const CONSTANTS = {
  API_URLS: {
    IMAGE: 'http://porter.reignsol.net/',
    BASE: 'http://porter.reignsol.net/api/v1/shopper/',
    BASE2: 'http://porter.reignsol.net/api/v1/',



    GET_CURRENCY_TYPE: 'currency type',
    LOGIN: 'login',
    REGISTER: 'register',
    LOGOUT: 'sign-out',
    SIGN_UP: 'register',
    VERIFY_OTP: 'verify-otp',
    RESEND_OTP: 'resend-otp',
    FORGOT_PASSWORD: 'forgot-password',
    RESET_PASSWORD: 'reset-password',
    CHANGE_PASSWORD: 'change-password',
    GET_PROFILE: 'getProfile',
    UPDATE_PROFILE: 'update-profile',
    GET_CONTENT: 'contents',
    GET_ORDER_HISTORY: 'orders/past-orders',
    GET_NOTIFICATIONS: 'notification',
    GET_BALANCE: 'balance-page',
    GET_CASH_ORDER: 'cash-OrderHistory',
    GET_CARD_ORDER: 'card-OrderHistory',
    GET_ORDER: 'orders/getOrderView',
    ACCEPT_ORDER: 'orders/accept',
    NOTIFICATIONS: 'notification',
    CONTENT: 'contents',
    SAVE_USER_DEVICE_TOKEN: 'saveDeviceToken',
    NEW_ORDERS: 'orders/new-orders',
    ORDER_REJECT: 'orders/reject',
    ORDER_ACCEPT: 'orders/accept',
    ORDER_READY: 'orders/ready-order',
    PAYMENT_CONFIRMATION: 'orders/payment-proceeding',
    ORDER_ASSIGN: 'orders/assign',
    GET_ITEM_BY_QRCODE: 'orders/getItemByQrCode',
    VIEW_ORDER: 'orders/view-order',
    DELETE_NOTIFICATION: 'notification/delete',
    DEACTIVATE: 'deactivate',
  },

  DESTINATIONS: {
    SIGN_UP: 'SIGN_UP',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  },
  CACHE_KEYS: {
    DEFAULT_USER: 'access_token',
    IS_FIRST_TIME: 'is_first_time',
  },
  FIREBASE: {
    CHAT: 'Chat',
    MESSAGES: 'messages',
    USERS: 'Users',
    CHATHEADS: 'ChatHeads',
    READ: 'read',
    TOKEN: 'Tokens',
    FCM: 'https://fcm.googleapis.com/fcm/send',
  },
};
