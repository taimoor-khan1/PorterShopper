import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import {COLORS, FONTFAMILY, FONTS, SIZES, height} from '../../constants';
import Card from '../Card';

export default function UploadPhotoModal(props) {
  //======================= Image Picker From Gallery Methood ================================//
  const choosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width: SIZES.ten * 40,
      height: SIZES.ten * 40,
      cropping: true,
      cropperCircleOverlay: props.isCircle,
    }).then(image => {
      props.setVisibility(false);
      props.onImageSelected(image.path.toString());
    });
  };

  //======================= Image Capture From Camera Methood ================================//
  const takePhotoFromCamera = async () => {
    ImagePicker.openCamera({
      width: SIZES.ten * 40,
      height: SIZES.ten * 40,
      cropping: true,
      cropperCircleOverlay: props.isCircle,
    }).then(image => {
      props.setVisibility(false);
      props.onImageSelected(image.path.toString());
    });
  };

  //************rendorBottomSheet */
  const renderBottomSheetContent = () => {
    return (
      <View style={styles.bottomSheetBody}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              FONTS.mediumFont16,
              {
                color: COLORS.normal.black,
              },
            ]}>
            Upload Photo
          </Text>
          <TouchableOpacity
            onPress={() => {
              props.setVisibility(false);
            }}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name={'close-sharp'}
              style={{color: COLORS.primary.navy, fontSize: 22}}
              //   onPress={() => props.setVisibility(false)}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            FONTS.lightFont12,
            {
              color: COLORS.normal.brownGrey,
            },
          ]}>
          Select a photo from
        </Text>
        <View
          style={{
            marginTop: SIZES.ten * 3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Card
            style={[
              styles.viewSelectImageType,
              {
                marginRight: SIZES.ten,
                backgroundColor: COLORS.primary.navy,
              },
            ]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                takePhotoFromCamera();
              }}>
              <Icon
                type={FONTFAMILY.Ionicons}
                name={'camera'}
                style={{
                  color: COLORS.normal.white,
                  fontSize: SIZES.twentyFive * 2,
                }}
              />
            </TouchableOpacity>
          </Card>
          <Card
            style={[
              styles.viewSelectImageType,
              {
                marginLeft: SIZES.ten,
                backgroundColor: COLORS.normal.white,
              },
            ]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                choosePhotoFromGallery();
              }}>
              <Icon
                type={FONTFAMILY.MaterialIcons}
                name={'photo-library'}
                style={{
                  color: COLORS.primary.navy,
                  fontSize: SIZES.twentyFive * 2,
                }}
              />
            </TouchableOpacity>
          </Card>
        </View>

        <View style={{height: SIZES.fifty}} />
      </View>
    );
  };

  return (
    <Modal
      style={styles.modal}
      statusBarTranslucent
      isVisible={props.visibility}
      deviceHeight={height * height}>
      {renderBottomSheetContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomSheetBody: {
    padding: SIZES.fifteen,
    borderTopStartRadius: SIZES.ten,
    borderTopEndRadius: SIZES.ten,
    backgroundColor: COLORS.normal.white,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
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
