import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import ButtonRadius10 from '../ButtonRadius10';
import ButtonRadius10BrownGrey from './../ButtonRadius10BrownGrey';
import {COLORS, FONTS, IMAGES, SIZES, height} from '../../constants';

export default function CancelRide(props) {
  //   console.log('kuch bhiiiiii', ' ', props.visibility);

  //************rendorBottomSheet */
  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <Image
          source={IMAGES.cancelRideicon}
          style={{
            height: SIZES.twenty * 5,
            width: SIZES.twenty * 5,
            marginTop: SIZES.twenty,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
        <Text
          style={[
            FONTS.mediumFont16,
            {marginVertical: SIZES.twenty, alignSelf: 'center'},
          ]}>
          Cancel this Ride?
        </Text>
        <Text
          style={[
            FONTS.mediumFont14,
            {
              alignSelf: 'center',
              color: COLORS.brownGrey,
            },
          ]}>
          Passengers that cancel less get faster bookings
        </Text>

        <ButtonRadius10
          label={'Keep the Booking'}
          style={{marginTop: SIZES.twenty * 2}}
          onPress={() => {
            props.setVisibility(false);
          }}
        />
        <ButtonRadius10BrownGrey
          label={'Cancel Ride'}
          style={{marginTop: SIZES.ten}}
          onPress={() => {
            props.setVisibility(false);
          }}
        />
      </View>
    );
  };

  return (
    <Modal
      isVisible={props.visibility}
      style={styles.modal}
      deviceHeight={height * height}>
      {renderBottomSheetContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    backgroundColor: COLORS.white,
    padding: SIZES.fifteen,
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twenty,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
