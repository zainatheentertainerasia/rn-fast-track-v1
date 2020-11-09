import React from 'react';
import {Image} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AuthScreen from './modules/ft_rn_auth_module/src/screens/ft_rn_login_signup/screen/';
import MerchantModule from './modules/ft_rn_merchant_module/src/screens/ft_rn_merchant';
import NotificationModule from './modules/ft_rn_notification/src/main';
import HomeModule from './modules/ft_rn_home_module/src/screens/ft_rn_home_expo/screen/index';
import OutletModule from './modules/ft_rn_outlet_module/src/screens/ft_rn_outlet_screen/screen/index';
import SearchModule from './modules/ft_rn_search_module/src/main';
import ProfileModule from './modules/ft_rn_user_profile_module/src/main';
import FavouriteModule from './modules/ft_rn_fav_module/src/main';

//static images
import home_icon from './assets/images/home-icon.png';
import notification_icon from './assets/images/notification-icon.png';
import favourites_icon from './assets/images/favourites-icon.png';
import profile_icon from './assets/images/profile-icon.png';

import {design} from 'rn_fast_track_uilib'


//Stacks
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const FavStack = createStackNavigator();
const Stack = createStackNavigator();

//strings
const APP_STRING = 'APPP';



//colors
const tabActiveColor = '#030303';
const tabInActiveColor = '#666666';



export const AuthModule = () => {
  return (
    <AuthStack.Navigator initialRouteName={'Auth'}>
      <AuthStack.Screen
        name='Auth'
        component={AuthScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export const HomeModuleStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={'Home'}
        component={HomeModule}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name='Outlet'
        component={OutletModule}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name='Merchant'
        component={MerchantModule}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen
        name='Search'
        component={SearchModule}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export const FavModule = () => {
  return (
    <FavStack.Navigator>
      <FavStack.Screen
        name='Favourite'
        component={FavouriteModule}
        options={{ headerShown: false }}
      />
      <FavStack.Screen
        name='Merchant'
        component={MerchantModule}
        options={{ headerShown: false }}
      />
    </FavStack.Navigator>
  );
};

export const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let tabIcon;

          if (route.name === 'Home') {
            tabIcon = home_icon;
          } else if (route.name === 'Notification') {
            tabIcon = notification_icon;
          } else if (route.name === 'Favourite') {
            tabIcon = favourites_icon;
          } else if (route.name === 'User') {
            tabIcon = profile_icon;
          }

          // You can return any component that you like here!
          return (
            <Image
              source={tabIcon}
              resizeMode='contain'
              style={{
                height: 30,
                width: 30,
                tintColor: focused ? tabActiveColor : tabInActiveColor,
              }}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: { zIndex: 110 },
        safeAreaInset: { bottom: 'never' },
        activeBackgroundColor: design['--global--primary--BackgroundColor']
          ? design['--global--primary--BackgroundColor']
          : 'transparent',
        inactiveBackgroundColor: design['--global--primary--BackgroundColor']
          ? design['--global--primary--BackgroundColor']
          : 'transparent',
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeModuleStack}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
      />
      <Tab.Screen name='Notification' component={NotificationModule} />

      <Tab.Screen name='Favourite' component={FavModule} />

      <Tab.Screen
        name='User'
        component={ProfileModule}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};



//helper methods

getTabBarVisible = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || 'Home';

  if (routeName === 'Merchant' || routeName === 'Search') {
    return false;
  }
  return true;
};