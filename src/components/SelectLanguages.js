import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS,  SIZES} from '../constants';
import {useDispatch, useSelector} from 'react-redux';
import MyTouchableOpacity from './MyTouchableOpacity';
import {updateSelectedLanguage} from '../redux/slice/Languages';

export default function SelectLanguages(props) {
  const dispatcher = useDispatch();



  const {Languages} = useSelector(state => state.labels?.labels);

  const {selectedLanguage} = useSelector(
    state => state.languages,
    
  );

  const [LanguagesList, setLanguagesList] = React.useState([]);

  React.useEffect(() => {
    checkLanguage();
  }, []);
  const checkLanguage = () => {
    let temp = [];

    Object.entries(Languages).forEach(item => {
      // console.log('item[1]', item[1]);
      temp.push(item[1]);
    });
    setLanguagesList(temp);
  };





  const OnSelectLanguage = language => {
    dispatcher(updateSelectedLanguage(language?.Code));
    dispatcher(updateSelectedCurrency(language));
  };

  return (
    <View style={styles.container}>
      {LanguagesList.map((item) => (
        <MyTouchableOpacity
          onPress={() => {
            OnSelectLanguage(item);
          }}>
          <Image
            source={{uri: item.Flag}}
            style={[
              styles.imageStyle,
              item?.Code=== selectedLanguage && styles.selected,
            ]}
          />
        </MyTouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    marginRight: SIZES.twenty,
    width: SIZES.twentyFive * 2,
    height: SIZES.twentyFive * 2,
    borderRadius: SIZES.twentyFive * 2,
    marginVertical: SIZES.ten,
  },
  selected: {
    borderColor: COLORS.primary.cherry,
    borderWidth: 2,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: SIZES.twentyFive,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.twenty,
  },
});
