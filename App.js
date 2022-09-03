import React, {useEffect} from 'react';
import {LogBox, StyleSheet, View, Image, Text} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';

// Redux Imports
import {Provider} from 'react-redux';
import MainNavigation from './src/navigation/MainNavigation';
import {COLORS, FONTS, IMAGES, SIZES} from './src/constants';

const App = () => {
  const [networkState, setNetworkState] = React.useState(true);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      // console.log('Connection status: ', state);

      setTimeout(() => {
        if (
          state.isInternetReachable !== null &&
          state.isInternetReachable !== undefined
        ) {
          setNetworkState(state.isInternetReachable);
        }
      }, 1000);
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <View style={{flex: 1}}>
      {networkState ? (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider>
              <MainNavigation />
            </PaperProvider>
          </PersistGate>
          <FlashMessage position="bottom" floating={true} />
        </Provider>
      ) : (
        <View style={styles.noInternetView}>
          <Image source={IMAGES.noWifi} style={styles.imgStyle} />
          <Text style={FONTS.boldFont20}>No Internet</Text>
          <Text style={FONTS.boldFont20}>Connection Not Available</Text>
          <Text style={[FONTS.mediumFont14, styles.textStyle]}>
            Your device is not connected to internet. please make sure your
            connection is working.
          </Text>
        </View>
      )}
    </View>
  );
};

// str = str.replace(/\d(?=\d{4})/g, "*");

export default App;

const styles = StyleSheet.create({
  noInternetView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.twentyFive,
    backgroundColor: COLORS.normal.white,
  },
  imgStyle: {
    height: SIZES.fifty * 1.5,
    width: SIZES.fifty * 1.5,
    marginBottom: SIZES.twentyFive,
  },
  textStyle: {
    marginTop: SIZES.twenty,
    textAlign: 'center',
  },
});
