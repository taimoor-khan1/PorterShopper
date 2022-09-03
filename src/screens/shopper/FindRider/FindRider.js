import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Animated,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Easing,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect} from '@react-navigation/core';
import {CommonActions} from '@react-navigation/native';
import MapView, {
  PROVIDER_GOOGLE,
  Circle,
  Marker,
  PROVIDER_DEFAULT,
} from 'react-native-maps';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  height,
  IMAGES,
  SIZES,
  SCREENS,
  STYLES,
} from '../../../constants';
import MapTheme from './Maptheme';
import Row from '../../../components/Row';
import {Icon} from 'native-base';
import CircularImage from '../../../components/CircularImage';
import BackArrow from '../../../components/BackArrow';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import RiderTrackingCard from '../../../components/RiderTrackingCard';
import {useSelector} from 'react-redux';
import utils from '../../../utils';

export default function FindRider({navigation}) {
  const [showLoading, setLoading] = useState(true);
  const language = useSelector(state => state.languages.selectedLanguage);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  const Rendorloading = () => {
    return (
      <View
        style={[
          STYLES.shadow,
          {
            position: 'absolute',
            bottom: SIZES.twenty * 4,
            left: SIZES.fifteen,
            right: SIZES.fifteen,
            backgroundColor: COLORS.normal.white,
            padding: SIZES.fifteen,
            borderRadius: SIZES.ten,
            alignItems: 'center',
          },
        ]}>
        <Text style={[FONTS.boldFont22, {color: COLORS.normal.charcoalGrey}]}>
          {utils.getLabelText('FindRiderScreen', language, 'amount')}
          <Text style={{color: COLORS.primary.cherry}}>150$</Text>
        </Text>
        <View
          style={{
            height: SIZES.twenty * 2,
            width: SIZES.twenty * 2,
            marginVertical: SIZES.twenty,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" color={COLORS.primary.navy} />
        </View>
        <Text style={[FONTS.semiBoldFont20, {color: COLORS.normal.brownGrey}]}>
          {utils.getLabelText('FindRiderScreen', language, 'detail')}
        </Text>
      </View>
    );
  };

  const mapRef = useRef();
  const HeaderView = useRef(new Animated.Value(0)).current;

  const [initRegion, setInitRegion] = useState({
    latitude: 64.1608443,
    longitude: 17.3508067,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const resetAction = CommonActions.reset({
    index: 0,
    routes: [{name: SCREENS.Login}],
  });

  useEffect(() => {
    getLocation();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
    }, []),
  );

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(
          `gettttttLLLoccattioonnnnn ============= ${Platform.OS}`,
          position,
        );

        setInitRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });

        mapRef.current.animateToRegion(
          {
            longitude: position.coords.latitude,
            latitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          },
          1500,
        );
      },
      error => {
        // console.error('gettttttLLLoccattioonnnnn ============= ', error);
      },
    );
  };

  const hideHeaderBar = () => {
    Animated.timing(HeaderView, {
      toValue: 0,
      easing: Easing.ease,
      useNativeDriver: true,
      duration: 300,
    }).start();
  };
  const showHeaderBar = () => {
    Animated.timing(HeaderView, {
      toValue: -1500,
      easing: Easing.ease,
      useNativeDriver: true,
      duration: 100,
    }).start();
  };

  return (
    <View style={{backgroundColor: COLORS.normal.white, flex: 1}}>
      <StatusBar
        // backgroundColor={COLORS.primary.navy}
        translucent
        barStyle={'dark-content'}
      />
      <MapView
        onStartShouldSetResponder={() => true}
        onResponderEnd={() => {
          console.log('responder end');
          if (Platform.OS === 'ios') {
            setTimeout(() => {
              hideHeaderBar();
            }, 50);
          } else {
            hideHeaderBar();
          }
        }}
        onTouchStart={() => {
          showHeaderBar();
        }}
        ref={mapRef}
        customMapStyle={MapTheme}
        initialRegion={initRegion}
        mapType="standard"
        provider={PROVIDER_DEFAULT}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsBuildings={true}
        on
        onMapReady={() => {
          mapRef.current.animateToRegion(initRegion, 1500);
        }}
        showsCompass={false}
        loadingIndicatorColor={COLORS.primary.navy}
        loadingBackgroundColor={`${COLORS.primary.cherry}45`}
        style={[{flex: 1}]}>
        <Marker
          coordinate={{
            latitude: Number(initRegion.latitude),
            longitude: Number(initRegion.longitude),
          }}>
          <View
            style={{
              backgroundColor: COLORS.primary.navy,
              padding: SIZES.ten,
              borderRadius: SIZES.fifty * 5,
            }}>
            <Image source={IMAGES.deliveryManMarker} resizeMode="contain" />
          </View>
        </Marker>

        {Restaurant.map(item => {
          return (
            <Marker
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
              }}>
              <View
                style={{
                  backgroundColor: COLORS.primary.cherry,
                  padding: SIZES.ten,
                  borderRadius: SIZES.fifty * 5,
                }}>
                <Image
                  source={IMAGES.restaurantMapMarker}
                  resizeMode="contain"
                />
              </View>
            </Marker>
          );
        })}
      </MapView>

      <View
        style={{
          position: 'absolute',
          top:
            Platform.OS === 'ios'
              ? getStatusBarHeight(true) - SIZES.five
              : SIZES.twenty * 1.5,
          right: SIZES.fifteen * 1.5,
          left: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          // backgroundColor: "red",
        }}>
        <BackArrow style={{padding: SIZES.twenty}} />
        <Icon
          name={'ios-cart'}
          type={FONTFAMILY.Ionicons}
          style={{
            fontSize: SIZES.fifteen * 2,
            color: COLORS.primary.cherry,
            marginLeft: SIZES.five * 0.25,
          }}
        />
      </View>

      {showLoading && <Rendorloading />}

      {!showLoading && (
        <RiderTrackingCard
          onChatPress={() => {
            navigation.navigate(SCREENS.Chat);
          }}
          onCallPress={() => {
            Linking.openURL(`tel://0${3113516459}`);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

const Restaurant = [
  {
    latitude: '37.784',
    longitude: '-122.405857',
  },
  {
    latitude: '37.78984',
    longitude: '-122.40517',
  },
  {
    latitude: '37.7884',
    longitude: '-122.409117',
  },
  {
    latitude: '37.78184',
    longitude: '-122.40897',
  },
];
