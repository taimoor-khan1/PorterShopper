import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import CustomButton from '../CustomButton';
import {COLORS, FONTFAMILY, FONTS, SIZES, height} from '../../constants';

export default function FindRiderModal({visibility, onFindRiderPressed}) {
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
        <Text style={[FONTS.boldFont24, {color: COLORS.normal.charcoalGrey}]}>
          Payment Confirmed!
        </Text>
        <Icon
          name={'checkmark-circle-sharp'}
          type={FONTFAMILY.Ionicons}
          style={{
            fontSize: SIZES.twenty * 3,
            color: COLORS.normal.trueGreen,
          }}
        />
        <CustomButton
          label={'Find Rider'}
          style={{
            width: '40%',
            height: SIZES.twenty * 2.5,
            backgroundColor: COLORS.primary.navy,
          }}
          onPress={onFindRiderPressed}
        />
      </View>
    );
  };

  return (
    <Modal
      statusBarTranslucent
      isVisible={visibility}
      style={styles.modal}
      deviceHeight={height * height}>
      {renderBottomSheetContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
  },
  bottomSheetBody: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: SIZES.ten,
    marginHorizontal: SIZES.fifteen,
    marginBottom: SIZES.twenty * 3,
    backgroundColor: '#d5d5d5',
  },
});
