import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';

export default function Support() {
  return (
    <View style={styles.container}>
      <WebView source={{uri: 'http://porter.reignsol.net/tawkto'}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
