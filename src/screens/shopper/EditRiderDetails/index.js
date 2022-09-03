import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

import EditText from '../../../components/EditText';
import {COLORS, FONTFAMILY, FONTS, SIZES} from '../../../constants';
import {Icon} from 'native-base';
import {Switch} from 'react-native-paper';
import CustomButton from '../../../components/CustomButton';
import {useSelector} from 'react-redux';
import utils from '../../../utils';

export default function EditRiderDetails() {
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const language = useSelector(state => state.languages.selectedLanguage);

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: COLORS.normal.white}}
      contentContainerStyle={{paddingHorizontal: SIZES.fifteen}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: SIZES.twenty,
        }}>
        <EditText
          placeholder={utils.getLabelText(
            'EditRiderDetailScreen',
            language,
            'first',
          )}
          style={{flex: 1, marginRight: SIZES.fifteen}}
        />
        <EditText
          placeholder={utils.getLabelText(
            'EditRiderDetailScreen',
            language,
            'last',
          )}
          style={{flex: 1}}
        />
      </View>
      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder={utils.getLabelText(
            'EditRiderDetailScreen',
            language,
            'email',
          )}
        />
      </View>
      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder={utils.getLabelText(
            'EditRiderDetailScreen',
            language,
            'password',
          )}
        />
      </View>
      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder={utils.getLabelText(
            'EditRiderDetailScreen',
            language,
            'confirm',
          )}
        />
      </View>
      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder={utils.getLabelText(
            'EditRiderDetailScreen',
            language,
            'address',
          )}
        />
      </View>
      <View style={{marginTop: SIZES.twentyFive}}>
        <EditText
          placeholder={utils.getLabelText(
            'EditRiderDetailScreen',
            language,
            'contact',
          )}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: SIZES.twentyFive,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name={'user-tag'}
            type={FONTFAMILY.FontAwesome5}
            style={{fontSize: SIZES.twenty, color: COLORS.primary.cherry}}
          />
          <Text
            style={[
              FONTS.mediumFont14,
              {color: COLORS.normal.brownGrey, marginStart: SIZES.ten},
            ]}>
            {utils.getLabelText('EditRiderDetailScreen', language, 'active')}
          </Text>
        </View>
        <Switch
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
          thumbColor={
            isSwitchOn ? COLORS.normal.white : COLORS.normal.brownGrey
          }
          trackColor={{
            false: COLORS.normal.halfpwhite,
            true: COLORS.primary.cherry,
          }}
        />
        <CustomButton
          label={utils.getLabelText('EditRiderDetailScreen', language, 'save')}
          style={{width: SIZES.twenty * 7, height: SIZES.twenty * 2.5}}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
