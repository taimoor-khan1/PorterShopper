import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal} from 'react-native';
import MapView from 'react-native-maps';
import MapTheme from '../../screen/home/MapTheme';
import {COLORS, FONTS, SIZES} from '../../constants';
import Card from '../Card';
import Row from '../Row';

export default function OrderDetailsModal(props) {
  const initRegion = {
    latitude: 64.1608443,
    longitude: 17.3508067,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  };
  //   console.log('kuch bhiiiiii', ' ', props.visibility);

  const ViewPersonalInfo = props => (
    <Row
      style={{
        justifyContent: 'space-between',
        paddingVertical: SIZES.fifteen,
      }}>
      <Text style={[FONTS.mediumFont14, {color: COLORS.brownGrey}]}>
        {props.prop}
      </Text>
      <Text style={[FONTS.mediumFont14, {color: COLORS.primary}]}>
        {props.value}
      </Text>
    </Row>
  );

  return (
    <Modal animationType="slide" transparent={true} visible={props.visibility}>
      <View style={{flex: 1, backgroundColor: COLORS.blackWith50Opacity}}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={props.onPress}>
          <Card style={styles.bottomSheetBody}>
            <Text
              style={[
                FONTS.mediumFont16,
                {marginVertical: SIZES.ten, textAlign: 'center'},
              ]}>
              Order Details
            </Text>
            <ViewPersonalInfo prop={'Name'} value={props.name} />
            <ViewPersonalInfo prop={'Destination'} value={props.destination} />
            <ViewPersonalInfo prop={'Deliver Time'} value={props.time} />
            <ViewPersonalInfo prop={'Amount'} value={'$' + props.amount} />
            <MapView
              zoomEnabled={false}
              maxZoomLevel={15}
              mapType="standard"
              showsUserLocation={false}
              region={initRegion}
              customMapStyle={MapTheme}
              showsMyLocationButton
              onPress={e => {
                // //console.log(e.nativeEvent);
              }}
              style={{
                height: SIZES.fifty * 5,
              }}></MapView>
          </Card>
        </TouchableOpacity>
      </View>
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
    width: '90%',
  },
  modal: {
    justifyContent: 'flex-start',
    margin: 0,
  },
});
