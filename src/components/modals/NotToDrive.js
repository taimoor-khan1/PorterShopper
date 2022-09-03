import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import ButtonRadius10 from '../ButtonRadius10';
import MessageEditText from '../MessageEditText';
import {COLORS, height, FONTS, SIZES} from '../../constants';

export default function NotToDrive(props) {
  //   console.log('kuch bhiiiiii', ' ', props.visibility);

  //************rendorBottomSheet */
  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View
          style={{
            height: SIZES.five,
            backgroundColor: COLORS.brownGrey,
            width: SIZES.twentyFive * 3,
            alignSelf: 'center',
            borderRadius: 5,
          }}
        />
        <Text style={[FONTS.mediumFont16, {marginVertical: SIZES.ten}]}>
          NotToDrive
        </Text>
        <Text style={[FONTS.lightFont12, {color: COLORS.brownGrey}]}>
          Let driver known more about your request.
        </Text>
        <MessageEditText
          placeholder={'E.g I m in front of the bus stop.'}
          style={{marginTop: SIZES.fifteen}}
        />
        <ButtonRadius10
          label={'Confirm'}
          style={{marginTop: SIZES.twenty * 2, marginBottom: SIZES.ten}}
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
