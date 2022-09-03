import {Icon} from 'native-base';
import React from 'react';
import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import Row from '../../../components/Row';
import MyTouchableOpacity from '../../../components/MyTouchableOpacity';
import CircularImage from '../../../components/CircularImage';
import {
  COLORS,
  FONTFAMILY,
  FONTS,
  SIZES,
  STYLES,
  width,
} from '../../../constants';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default function Chat({navigation}) {
  const renderMessages = ({item}) => {
    return (
      <View style={{alignSelf: item.sender ? 'flex-end' : 'flex-start'}}>
        <View
          style={[
            STYLES.shadow,
            {
              backgroundColor: item.sender
                ? COLORS.normal.white
                : COLORS.primary.navy,
              paddingHorizontal: SIZES.fifteen,
              paddingVertical: SIZES.ten,
              borderRadius: SIZES.ten * 1.3,
              alignSelf: 'baseline',
              marginVertical: SIZES.fifteen,
            },
          ]}>
          <Text
            style={[
              FONTS.regularFont16,
              {
                color: item.sender ? COLORS.normal.black : COLORS.normal.white,
              },
            ]}>
            {item.msg}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        // STYLES.container,
        {
          backgroundColor: COLORS.normal.white,
          flex: 1,

          height: 100,
        },
      ]}>
      <Row
        style={{
          paddingTop:
            Platform.OS === 'android'
              ? SIZES.twentyFive
              : getStatusBarHeight(true),
          paddingVertical: SIZES.twentyFive,
          paddingHorizontal: SIZES.fifteen * 1.2,
          backgroundColor: COLORS.normal.white,
          shadowColor: '#00000090',
          shadowOffset: {
            width: 0,
            height: 3.5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4.3,
          elevation: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <MyTouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'chevron-left'}
              type={FONTFAMILY.Entypo}
              style={{
                color: COLORS.normal.black,
                fontSize: SIZES.twentyFive * 1.25,
              }}
            />
          </MyTouchableOpacity>
          <Row style={{alignItems: 'center'}}>
            <CircularImage
              uri={
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80'
              }
              imageStyle={{
                height: SIZES.fifteen * 4,
                width: SIZES.fifteen * 4,
                borderRadius: SIZES.fifteen * 4,
                marginLeft: SIZES.ten * 1.3,
              }}
            />
            <View
              style={{
                marginLeft: SIZES.ten * 1.3,
              }}>
              <Text style={[FONTS.mediumFont16, {color: COLORS.normal.black}]}>
                Justin Langer
              </Text>
              <Text style={[FONTS.lightFont12, {color: COLORS.normal.black}]}>
                Delievery Boy
              </Text>
            </View>
          </Row>
        </Row>

        <MyTouchableOpacity>
          <View
            style={{
              backgroundColor: COLORS.normal.white,
              padding: SIZES.ten,
              borderRadius: SIZES.ten,
              shadowColor: '#00000090',
              shadowOffset: {
                width: 0,
                height: 3.85,
              },
              shadowOpacity: 0.34,
              shadowRadius: 3.27,
              elevation: 10,
            }}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name={'ios-call-outline'}
              style={{
                color: COLORS.primary.navy,
                fontSize: SIZES.twentyFive,
              }}
            />
          </View>
        </MyTouchableOpacity>
      </Row>

      <FlatList
        showsVerticalScrollIndicator={false}
        data={mesages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMessages}
        contentContainerStyle={{
          paddingHorizontal: SIZES.twenty * 0.3,
          paddingBottom: 150,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: width,
          borderTopLeftRadius: SIZES.fifteen,
          borderTopRightRadius: SIZES.fifteen,
          paddingHorizontal: SIZES.fifteen * 1.2,
          backgroundColor: COLORS.normal.white,
          shadowColor: '#00000090',
          shadowOffset: {
            width: 0,
            height: 3.5,
          },
          shadowOpacity: 0.15,
          shadowRadius: 4.3,
          elevation: 100,
        }}>
        <Row style={{alignItems: 'center', justifyContent: 'space-between'}}>
          <MyTouchableOpacity style={{padding: SIZES.ten}}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name={'ios-mic-outline'}
              style={{
                fontSize: SIZES.twenty * 1.5,
                color: COLORS.primary.navy,
              }}
            />
          </MyTouchableOpacity>
          <TextInput
            placeholder={'Type Your Message...'}
            style={[
              FONTS.mediumFont14,
              {
                height: 60,
                flex: 1,
                paddingHorizontal: SIZES.ten,
                color: COLORS.normal.black,
              },
            ]}
            selectionColor={COLORS.primary.navy}
            placeholderTextColor={COLORS.normal.charcoalGrey}
          />
          <MyTouchableOpacity
            style={{
              backgroundColor: COLORS.primary.navy,
              paddingHorizontal: SIZES.fifteen - 2,
              paddingVertical: SIZES.ten,
              borderRadius: SIZES.ten,
              shadowColor: '#00000090',
              shadowOffset: {
                width: 0,
                height: 3.85,
              },
              shadowOpacity: 0.34,
              shadowRadius: 3.27,
              marginLeft: SIZES.ten,
              elevation: 10,
            }}>
            <Icon
              type={FONTFAMILY.Ionicons}
              name={'ios-send-outline'}
              style={{
                fontSize: SIZES.twenty * 1.1,
                color: COLORS.normal.white,
                // paddingHorizontal: SIZES.five,
                transform: [{rotate: '-50deg'}],
              }}
            />
          </MyTouchableOpacity>
        </Row>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

const mesages = [
  {
    id: 1,
    msg: 'Hello dear',
    sender: false,
  },
  {
    id: 2,
    msg: 'Hi deer, How are you ?',
    sender: true,
  },
  {
    id: 3,
    msg: 'I am good wbu?',
    sender: false,
  },
  {
    id: 4,
    msg: `i'am not talking to you! okay?`,
    sender: true,
  },
  {
    id: 5,
    msg: 'why?',
    sender: false,
  },
  {
    id: 6,
    msg: 'F**k off!!!',
    sender: true,
  },
  {
    id: 7,
    msg: 'why are you running???',
    sender: false,
  },
  {
    id: 8,
    msg: 'I am not running',
    sender: true,
  },
  {
    id: 9,
    msg: `anyhow, what's your name ?`,
    sender: false,
  },
  {
    id: 10,
    msg: `I am Justin`,
    sender: true,
  },
  //   {
  //     id: 11,
  //     msg: `F**k you Justin`,
  //     sender: false,
  //   },
  //   {
  //     id: 10,
  //     msg: `F**k you`,
  //     sender: true,
  //   },
  //   {
  //     id: 10,
  //     msg: `you know what i did last night ?`,
  //     sender: false,
  //   },
  //   {
  //     id: 10,
  //     msg: `you better not bring my mother into this.`,
  //     sender: true,
  //   },
  //   {
  //     id: 10,
  //     msg: `I made a fire over there...`,
  //     sender: false,
  //   },
  //   {
  //     id: 10,
  //     msg: `ohh great.`,
  //     sender: true,
  //   },
  //   {
  //     id: 10,
  //     msg: `then i f**ked your mother next to it..`,
  //     sender: false,
  //   },
];
