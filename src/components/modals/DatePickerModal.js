import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import MyTouchableOpacity from '../MyTouchableOpacity';
import {COLORS, FONTFAMILY, height, SIZES} from '../../constants';
import CustomButton from '../CustomButton';

export default function DatePickerModal({
  visibility,
  onDateSelected,
  setVisibility,
}) {
  const [date, setDate] = useState(new Date());

  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View style={{alignSelf: 'flex-end'}}>
          <MyTouchableOpacity
            style={{alignSelf: 'baseline'}}
            onPress={() => setVisibility(false)}>
            <Icon
              name={'close-circle-outline'}
              type={FONTFAMILY.Ionicons}
              style={{
                color: COLORS.primary.navy,
                fontSize: SIZES.twenty * 2,
              }}
            />
          </MyTouchableOpacity>
        </View>
        <DatePicker
          fadeToColor="none"
          androidVariant="iosClone"
          date={date}
          onDateChange={text => {
            setDate(text);
          }}
          mode="date"
          locale="en"
          textColor={COLORS.black}
          // maximumDate={moment().subtract(10, 'years')}
          // minimumDate={moment().subtract(120, 'years')}
        />
        <CustomButton
          label={'Select'}
          onPress={() => {
            onDateSelected(date);
            setVisibility(false);
          }}
          style={{marginTop: SIZES.ten}}
        />
      </View>
    );
  };

  return (
    <Modal
      isVisible={visibility}
      style={styles.modal}
      deviceHeight={height * height}>
      {renderBottomSheetContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    backgroundColor: COLORS.normal.white,
    padding: SIZES.fifteen,
    borderTopStartRadius: SIZES.ten,
    borderTopEndRadius: SIZES.ten,
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewSelectImageType: {
    flex: 1,
    height: SIZES.fifty * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.ten,
  },
  button: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
