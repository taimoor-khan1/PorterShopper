import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {COLORS} from '../constants';
import MyTouchableOpacity from '../components/MyTouchableOpacity';
import {
  FONTFAMILY,
  FONTS,
  height,
  SIZES,
  STYLES,
  width,
} from '../constants/theme';
import {Icon} from 'native-base';

export default function EditText(props) {
  const [borderColor, setBorderColor] = useState(COLORS.normal.brownGrey);
  const [iconColor, setIconColor] = useState(COLORS.normal.brownGrey);
  const [show, setshow] = useState('eye');
  const [showText, setShowText] = useState(true);

  const passwordShow = () => {
    if (show === 'eye') {
      setshow('eye-slash');
      setShowText(false);
    } else {
      setShowText(true);
      setshow('eye');
    }
  };

  return (
    <>
      <View
        style={[
          {
            width: '100%',
            justifyContent: 'center',
            borderWidth: 1,
            paddingHorizontal: SIZES.fifteen,
            height: 60,
            borderRadius: SIZES.fifty,
            borderColor: borderColor,
            // marginVertical: SIZES.five,
          },
          props.style,
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            {props.hasIcon ? (
              <Icon
                type={props.type}
                name={props.name}
                style={{
                  color: iconColor,
                  marginRight: SIZES.ten,
                  fontSize: SIZES.twenty,
                }}
              />
            ) : null}
            <TextInput
              {...props}
              secureTextEntry={props.password ? showText : false}
              selectionColor={COLORS.primary.navy}
              placeholderTextColor={COLORS.normal.charcoalGrey}
              onFocus={() => {
                setBorderColor(COLORS.primary.navy);
                setIconColor(COLORS.primary.navy);
              }}
              onBlur={() => {
                setBorderColor(COLORS.normal.charcoalGrey);
                setIconColor(COLORS.normal.charcoalGrey);
              }}
              style={[
                FONTS.mediumFont14,
                {
                  flex: 1,
                  color: COLORS.normal.black,
                },
              ]}
            />
          </View>
          {props.password ? (
            <MyTouchableOpacity
              onPress={() => {
                passwordShow();
              }}>
              <Icon
                name={show}
                type={'FontAwesome'}
                style={{
                  fontSize: 20,
                  color: COLORS.normal.brownGrey,
                  marginLeft: 5,
                }}
              />
            </MyTouchableOpacity>
          ) : null}
        </View>
      </View>
      <Text
        style={{
          fontSize: SIZES.body10,
          color: 'red',
          marginLeft: SIZES.twenty,
          fontFamily: FONTFAMILY.Medium,
        }}>
        {props.error && props.value !== '' ? props.errorMessage : ''}
      </Text>
    </>
  );
}
