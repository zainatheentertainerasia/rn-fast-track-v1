import { Ionicons, AntDesign, Feather, Entypo } from '@expo/vector-icons';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';
import JWT from 'expo-jwt';
import ActionSheet from 'react-native-actionsheet';
import Swiper from 'react-native-swiper';
import { CheckBox } from 'react-native-elements';

import MapView, { Marker, Callout } from 'react-native-maps';

import Modal from 'react-native-modal';
import NavigationBar from 'react-native-navbar';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import Animated, { Easing } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Carousel from 'react-native-snap-carousel';
import Svg, { Circle, G, Text, Line } from 'react-native-svg';

import { WebView } from 'react-native-webview';
import { Switch } from 'react-native-switch';

import BottomSheet from 'reanimated-bottom-sheet';
import { reactI18nextModule, setI18n } from "react-i18next";
import i18n from "i18next";
import * as Localization from "expo-localization";
import * as IphoneXHelper from "react-native-iphone-x-helper";

const reactI18next={ reactI18nextModule, setI18n };

export const FastTrackLibs = {
  // icons:
  Ionicons,
  AntDesign,
  Feather,
  Entypo,

  //dateTimePicker
  DateTimePickerModal,

  //navigation
  createBottomTabNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
  NavigationContainer,

  ImagePicker,
  ActionSheet,
  JWT,
  //expo
  Permissions,
  Font,

  //react native elemets
  CheckBox,

  //custom ui components
  //Swiper,
  NavigationBar,
  ParallaxScrollView,
  Switch,
  WebView,
  BottomSheet,
  //map
  MapView,
  Marker,
  Callout,

  //modal
  Modal,

  //reanimated
  Animated,
  Easing,

  SafeAreaProvider,
  SafeAreaView,
  SmoothPinCodeInput,
  Carousel,

  //SVG
  Svg,
  Circle,
  G,
  Text,
  Line,

  //Localization
  Localization,
  reactI18next,
  i18n,

  //Swiper
  Swiper,

  //iphone x helper
  IphoneXHelper
};
