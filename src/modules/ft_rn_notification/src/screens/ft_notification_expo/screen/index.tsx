import React from 'react';
import { StyleSheet, SafeAreaView, View, Image, Platform, StatusBar } from 'react-native';
//import Header from "./components/header";
import notificationImage from './images/notification_img.jpg';

import i18n, {
  i18n_Init,
  changeLanguage,
  withTransation,
} from '../screen/utils/localization/I18n';

import { FastTrackLibs, CustomComponents,design } from 'rn_fast_track_uilib';
const { Header } = FastTrackLibs;
const {
  CustomText,
  NavBarHeader,
  ErrorModal,
  OutletHeader1,
  OutletHeader2,
  CustomSearchBar,
  CustomChipList,
  CustomNoRecord,
  CustomBottomSheet,
  CustomListing,
  OutletFilter,
  HeaderWithTitleOnly,
} = CustomComponents;

import { Port as port } from './port';
export default class NotificationScreen extends React.Component<port> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressRightButton = () => {
    this.setState({
      rightButtonType: 'nomi', // ===TODO=== nomi defines nothing ??
    });
  };

  render() {
    const { rightButtonType, data } = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight:0 ,
          backgroundColor:design['--global--primary--BackgroundColor']?design['--global--primary--BackgroundColor']:"#FFFFFF"
        }}
      >
        <View style={{backgroundColor:design['--global--tertiary--BackgroundColor']?design['--global--tertiary--BackgroundColor']:"#FFFFFF",flex:1}}>
        <HeaderWithTitleOnly title={'Notification'} />

        <View style={styles.box}>
          <Image
            source={notificationImage}
            resizeMode='contain'
            style={{ height: 251 }}
          />
          <CustomText
            style={{
              fontSize: 20,
              padding: 10,
              color: '#000000',
            }}
          >
            {i18n.t('FOR_YOU')}
          </CustomText>

          <CustomText
            style={{
              paddingTop: 20,
              paddingRight: 10,
              paddingBottom: 20,
              paddingLeft: 10,
              textAlign: 'center',
            }}
          >
            {i18n.t('APP_OFFERING')}
          </CustomText>
        </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 16,
    margin: 16,
    backgroundColor: '#EDEDED',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'rgb(237, 237, 237)',
  },
});
