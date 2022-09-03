import React from 'react';
import {RefreshControl, Alert} from 'react-native';
import {COLORS, FONTFAMILY, SCREENS} from '../constants';
import {showMessage} from 'react-native-flash-message';
import {store} from '../redux/store';

class utils {
  confirmAlert(title, msg, callback) {
    Alert.alert(
      title,
      msg,
      [
        {text: 'NO', onPress: () => callback('error')},
        {text: 'YES', onPress: () => callback('success')},
      ],
      {cancelable: false},
    );
  }

  successAlert(message) {
    showMessage({
      message: message,
      type: 'success',
      icon: 'success',
      animated: true,
      textStyle: {fontFamily: FONTFAMILY.Medium, color: COLORS.normal.white},
      titleStyle: {fontFamily: FONTFAMILY.Bold, color: COLORS.normal.white},
    });
  }

  warningAlert(message) {
    showMessage({
      message: message,
      type: 'warning',
      icon: 'warning',
      animated: true,
      textStyle: {fontFamily: FONTFAMILY.Medium, color: COLORS.normal.white},
      titleStyle: {fontFamily: FONTFAMILY.Bold, color: COLORS.normal.white},
    });
  }

  errorAlert(message) {
    showMessage({
      message: message,
      type: 'danger',
      icon: 'danger',
      animated: true,
      style: {backgroundColor: COLORS.primary.navy},
      textStyle: {fontFamily: FONTFAMILY.Medium, color: COLORS.normal.white},
      titleStyle: {fontFamily: FONTFAMILY.Bold, color: COLORS.normal.white},
    });
  }

  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  isNull(obj) {
    if (obj === null || obj === undefined || obj === '') {
      return true;
    } else {
      return false;
    }
  }
  validateEmail(str) {
    var pattern =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return pattern.test(str);
  }

  passValidation(value) {
    return value.length < 6 || value.length > 16;
  }

  isEmptyOrSpaces(str) {
    // console.log('str===== ', str);
    return str === null || str.match(/^ *$/) !== null;
  }

  _refreshControl(refhresList, isRef = false) {
    return (
      <RefreshControl
        refreshing={isRef}
        onRefresh={refhresList}
        title={'Pull to Refresh'}
        tintColor={'blue'}
        colors={['white']}
        progressBackgroundColor={'blue'}
      />
    );
  }

  serializeObj(obj) {
    var str = [];
    for (var p in obj)
      if (obj[p] != '') {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  }

  showResponseError(error) {
    var authErrorRegex = /4[0-9][1-9]/g;
    var serverErrorRegex = /5[0-9][0-9]/g;

    if (error.message === 'Network Error') {
      return 'Please check your network';
    } else {
      if (error.response) {
        let errorCode = JSON.stringify(error.response.status);

        if (errorCode === '400') {
          let response = error.response.data;
          var error = '';
          if (this.isEmpty(response.data)) {
            error = response.message;
          } else {
            var temp = response.data[Object.keys(response.data)[0]];
            error = JSON.stringify(temp).replace('[', '').replace(']', '');
          }
          return error;
        } else if (authErrorRegex.test(errorCode)) {
          return 'Authentication failed';
        } else if (serverErrorRegex.test(errorCode)) {
          return 'Something went wrong with the server';
        }
      } else {
        return error;
      }
    }
  }

  cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ('0' + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code =>
      textToChars(salt).reduce((a, b) => a ^ b, code);

    return text =>
      text
        .split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
  };

  decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code =>
      textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded =>
      encoded
        .match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
  };

  getLabelText = (Screen, language, label) => {
    if (!this.isEmpty(store.getState().labels?.labels[Screen])) {
      // let language = store.getState()?.languages?.selectedLanguage.toString();
      // return language;
      return store.getState().labels?.labels[Screen][label][language];

      //  store?.getState()?.labels?.labels[Screen][label][store?.getState()?.Language?.selectedLanguage.toString()].toString();
    } else {
      return '';
    }
  };
}

export default new utils();
