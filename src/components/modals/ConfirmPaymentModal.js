import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import QRCode from 'react-native-qrcode-svg';
import {COLORS, FONTS, height, IMAGES, SIZES} from '../../constants';
import utils from '../../utils';

export default function ConfirmPaymentModal({
  visibility,
  setVisibility,
  scanPress,
  data,
}) {
  const myCipher = utils.cipher('com.reignsol.porterShopper');

  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View
          style={{
            backgroundColor: '#d5d5d5',
            width: SIZES.twentyFive * 3,
            alignSelf: 'center',
            borderRadius: 5,
          }}
        />
        <Text style={[FONTS.semiBoldFont18, {color: COLORS.primary.cherry}]}>
          Order No #{data.id}
        </Text>
        <Text style={[FONTS.boldFont22, {color: COLORS.normal.charcoalGrey}]}>
          Confirming Payment
        </Text>
        <Image
          source={IMAGES.loader}
          style={{height: SIZES.twenty * 2, width: SIZES.twenty * 2}}
        />
        <View
          style={{
            height: 0.5,
            backgroundColor: COLORS.normal.charcoalGrey,
            width: '70%',
          }}
        />
        <Text style={[FONTS.boldFont22, {color: COLORS.normal.charcoalGrey}]}>
          Order QR Code
        </Text>
        <QRCode
          size={SIZES.fifty * 2.5}
          value={myCipher(
            JSON.stringify({
              orderid: data.id,
              items: data.items,
              total: data.order_amount,
              appID: 'com.porterShopper',
              vendorID: data.vendor_id,
            }),
          )}
          logoSize={30}
          // logo={IMAGES.pizaBackground}
          enableLinearGradient
          backgroundColor={COLORS.normal.transparent}
          linearGradient={[COLORS.primary.cherry, COLORS.primary.navy]}
        />

        {/* <Icon
          name={"qrcode-scan"}
          type={FONTFAMILY.MaterialCommunityIcons}
          style={{ fontSize: SIZES.twenty * 6 }}
        /> */}
        <Text
          style={[FONTS.regularFont10, {color: COLORS.normal.charcoalGrey}]}>
          Check the order details for confirmation
        </Text>

        {/* <CustomButton
          label={'Scan'}
          style={{
            width: '30%',
            height: SIZES.twenty * 2,
            backgroundColor: COLORS.normal.trueGreen,
            marginBottom: SIZES.ten,
          }}
          onPress={scanPress}
        /> */}
      </View>
    );
  };

  return (
    <Modal
      isVisible={visibility}
      style={styles.modal}
      statusBarTranslucent
      deviceHeight={height * height}
      onBackdropPress={setVisibility}>
      {renderBottomSheetContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    flex: 0.55,
    justifyContent: 'space-evenly',
    backgroundColor: '#d5d5d5',
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    margin: 0,
    height: height,
  },
});
