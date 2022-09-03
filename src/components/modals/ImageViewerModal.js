import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {COLORS, FONTFAMILY, height, SIZES} from '../../constants';
import MyTouchableOpacity from '../MyTouchableOpacity';

export default function ImageViewerModal(props) {
  const {visible, setVisible, image} = props;

  return (
    <Modal
      visible={visible}
      statusBarTranslucent
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={1500}
      animationOutTiming={1500}
      deviceHeight={height * height}
      style={{margin: 0, backgroundColor: COLORS.normal.black}}>
      <View style={{flex: 1}}>
        <MyTouchableOpacity
          style={styles.closeBtnView}
          onPress={() => setVisible(false)}>
          <Icon
            name={'x'}
            type={FONTFAMILY.Octicons}
            style={{
              color: COLORS.normal.white,
              fontSize: SIZES.twentyFive - 2,
            }}
          />
        </MyTouchableOpacity>

        <ImageViewer imageUrls={[image]} renderIndicator={() => null} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  closeBtnView: {
    zIndex: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.twentyFive * 1.5,
    height: SIZES.twentyFive * 1.5,
    borderWidth: 1,
    borderColor: COLORS.normal.white,
    borderRadius: SIZES.twentyFive * 1.5,
    position: 'absolute',
    right: SIZES.twentyFive,
    top: getStatusBarHeight() + SIZES.twenty,
  },
});
