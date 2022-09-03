import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import MyTouchableOpacity from '../MyTouchableOpacity';
import {
  COLORS,
  FONTFAMILY,
  height,
  IMAGES,
  SIZES,
  STYLES,
} from '../../constants';

export default function ScannerModal({
  visibility,
  setVisibility,
  onClosepress,
  onSuccess,
}) {
  //   console.log('kuch bhiiiiii', ' ', props.visibility);
  const [scannerVisible, setScannerVisible] = useState(false);

  const onRead = data => {
    onSuccess(data);
    setScannerVisible(false);
  };

  //************rendorBottomSheet */
  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        {/* <View style={{backgroundColor: 'transparent', height: height}}>
          <Text>hellow worild</Text>
        </View> */}
        <MyTouchableOpacity
          onPress={onClosepress}
          style={{position: 'absolute', top: SIZES.twenty, left: SIZES.five}}>
          <Icon
            name="ios-close"
            type={FONTFAMILY.Ionicons}
            style={{color: COLORS.normal.white}}
          />
        </MyTouchableOpacity>
        {!scannerVisible ? (
          <Image
            source={IMAGES.QrCodeIcon}
            style={{
              height: SIZES.fifty * 3,
              width: SIZES.fifty * 3,
            }}
            resizeMode="contain"
          />
        ) : (
          <QRCodeScanner
            onRead={onRead}
            // reactivate={true}
            // flashMode={RNCamera.Constants.FlashMode.torch}
          />
        )}
        <MyTouchableOpacity
          onPress={() => {
            setScannerVisible(!scannerVisible);
          }}
          style={[
            STYLES.shadow,
            {
              backgroundColor: COLORS.normal.halfpwhite,
              padding: SIZES.fifteen * 1.5,
              borderRadius: SIZES.fifty,
              //   marginTop: SIZES.twentyFive * 6,
            },
          ]}>
          <Image
            source={IMAGES.btnQrCodeScan}
            style={{
              height: SIZES.fifteen * 3,
              width: SIZES.fifteen * 3,
              tintColor: COLORS.normal.black,
            }}
            resizeMode="contain"
          />
        </MyTouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      statusBarTranslucent
      isVisible={visibility}
      style={styles.modal}
      backdropOpacity={0.8}
      deviceHeight={height * height}>
      {renderBottomSheetContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    // height: height,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    height: height,
  },
  modal: {
    // flex: 1,
    justifyContent: 'center',
  },
});
