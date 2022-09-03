import * as React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {COLORS, FONTFAMILY, SCREENS, SIZES} from '../constants';
import DrawerContent from './DrawerContent';
import MyTouchableOpacity from '../components/MyTouchableOpacity';

DrawerContent;
function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerLeft: () => (
          <MyTouchableOpacity onPress={() => console.log('hehe')}>
            <Icon
              name={'chevron-left'}
              type={FONTFAMILY.Entypo}
              style={{
                color: COLORS.normal.white,
                fontSize: SIZES.twentyFive,
                marginLeft: SIZES.ten,
              }}
            />
          </MyTouchableOpacity>
        ),
        headerTitleStyle: {
          color: COLORS.normal.white,
          fontFamily: FONTFAMILY.Medium,
          fontSize: SIZES.h22,
        },
      }}
      drawerStyle={{
        backgroundColor: 'transparent',
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      {/* <Drawer.Screen name={SCREENS.BottomTab} component={BottomTab} /> */}
      {/* <Drawer.Screen
        name={SCREENS.Profle}
        component={Profile}
        options={{title: ''}}
      />
      <Drawer.Screen
        name={SCREENS.RiderChat}
        component={RiderChat}
        options={{title: ''}}
      />
      <Drawer.Screen
        name={SCREENS.RiderBalance}
        component={RiderBalance}
        options={{title: ''}}
      /> */}
      <Drawer.Screen name={SCREENS.Rider.PastOrders} component={PastOrders} />
    </Drawer.Navigator>
  );
}
