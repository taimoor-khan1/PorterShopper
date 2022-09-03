import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'native-base';
import MyTouchableOpacity from './MyTouchableOpacity';
import {COLORS, FONTS, SIZES, FONTFAMILY, CONSTANTS, width} from '../constants';
import ImageViewerModal from './modals/ImageViewerModal';

export default function OrderDetailComponent({
  item,
  activeOpacity,
  onPressCheck,
}) {
  const [imgModal, setImgModal] = useState(false);

  return (
    <>
      <TouchableOpacity activeOpacity={activeOpacity} onPress={onPressCheck}>
        <View style={{marginTop: SIZES.twenty}}>
          <View style={styles.mainView}>
            <MyTouchableOpacity onPress={() => setImgModal(true)}>
              <Image
                style={{
                  height: SIZES.fifty,
                  width: SIZES.fifty,
                  borderRadius: SIZES.ten,
                }}
                source={{uri: CONSTANTS.API_URLS.IMAGE + item.image}}
              />
            </MyTouchableOpacity>

            <View style={styles.contentView}>
              <Text style={[FONTS.mediumFont14, {maxWidth: width * 0.38}]}>
                {item.name}{' '}
                <Text
                  style={[FONTS.mediumFont14, {color: COLORS.primary.cherry}]}>
                  x{item.qty}
                </Text>
              </Text>

              <Text
                style={[FONTS.boldFont16, {marginHorizontal: SIZES.twenty}]}>
                ${Number(item.price) * Number(item.qty)}
              </Text>
            </View>

            <View style={styles.flexRow}>
              <Icon
                name={
                  item.isSelected
                    ? 'checkmark-circle'
                    : 'checkmark-circle-outline'
                }
                type={FONTFAMILY.Ionicons}
                style={{
                  fontSize: SIZES.twenty,
                  color: COLORS.normal.trueGreen,
                }}
              />
            </View>
          </View>

          <View style={styles.lineStyle} />
        </View>
      </TouchableOpacity>

      <ImageViewerModal
        visible={imgModal}
        setVisible={setImgModal}
        image={{url: CONSTANTS.API_URLS.IMAGE + item.image}}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginTop: SIZES.ten,
    paddingVertical: SIZES.five,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentView: {
    flex: 1,
    marginLeft: SIZES.fifteen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineStyle: {
    borderWidth: 0.5,
    marginTop: SIZES.five,
    backgroundColor: COLORS.normal.brownGrey,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
