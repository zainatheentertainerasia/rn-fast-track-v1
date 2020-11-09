import React, {Component } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AsyncStorage, Linking } from 'react-native';

import appConfig from '@appConfig';
import App from './src/App';
import { configs } from './src/apis/configs';
import appJson from './app.json';
import horizonAnalytics from 'rn-horizon-analytics';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectUserInfo,
  selectUserToken,
} from './src/redux/userReducer/user.selectors';

import {
  selectAppConfigs,
  selectAppLoading,
  selectAppErrorObject,
  selectAppWebView,selectIsVisibleDemographic
} from './src/redux/appReducer/app.selectors';
import {Portal} from 'react-native-paper'

import { i18n_Init,isRTL } from './src/utils/localization/I18n';


import {CustomComponents} from 'rn_fast_track_uilib'
const {Loader,ErrorModal,WebViewModal,DemographicModal}=CustomComponents;
import {
  setUser,
  setToken,
  setUserValues,
} from './src/redux/userReducer/user.actions';
import { setAppConfigs, setErrorObject,setWebViewObject } from './src/redux/appReducer/app.actions';
import * as Font from "expo-font";

import {AllInitBL} from './src/initBL'
const { appboy } = horizonAnalytics;
const { AppBoyGetInitialURL } = appboy;

console.disableYellowBox = true;

class Base extends Component {
  state = {
    appIsReady: false,
    appInitialRoute: '',
    isLoggedInUser: false,
  };

  async UNSAFE_componentWillMount() {
    try {
      // console.log('In component Did mount of app');
      //this.props.onSetUser(null)
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    this.prepareResources();
  }

  async componentDidMount() {
    //console.log('start appConfigs: ', appConfigs);
  }

  prepareResources = async () => {
    
    let routeName = 'Tab';
    let isLoggedInUser = false;
    //await AsyncStorage.clear();
    await this.getConfigs();
    
    // console.log(this.props.userInfo,'iser')
    // const asyncObject = await AsyncStorage.multiGet(['token', 'user']);
    // const user = JSON.parse(asyncObject[1][1]);
    
    if (this.props.userInfo === null) {
      
      // console.log(user, 'user is null');
      routeName = 'Auth';
    } else {
      if (this.props.userInfo.demographicsUpdated) {
        window.isDemographicCheck = true;
        //console.log(routeName, 'Route name.fasdfas');
      }
      window.isLoggedInUser = true;
      isLoggedInUser = true;
    }
    console.log(routeName, 'userInfouåserInfo');

    const initialLinking = await Linking.getInitialURL();
    if (initialLinking === `${appJson.expo.scheme}://register`) {
      routeName = 'Auth';
    }

    AppBoyGetInitialURL(function (url) {
      if (url) {
        if (url === `${appJson.expo.scheme}://register`) {
          routeName = 'Auth';
        }
      }
    });

    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      MuseoSans300: require('./assets/fonts/museosans_100-webfont.ttf'),
      MuseoSans300: require('./assets/fonts/museosans_300-webfont.ttf'),
      MuseoSans500: require('./assets/fonts/museosans_500-webfont.ttf'),
      MuseoSans700: require('./assets/fonts/museosans_700-webfont.ttf'),
    })

    await i18n_Init()
    AllInitBL()
    this.setState(
      { appIsReady: true, appInitialRoute: routeName, isLoggedInUser },
      async () => {
        await SplashScreen.hideAsync();
      }
    );
  };

  getConfigs = async () => {
    this.invokeConfigsAPI(this.props.token);
  };

  invokeConfigsAPI = async (token) => {
    let result = {};
    try {
      //console.log('invokeApitoken', token);
      result = await configs(token);
    } catch (e) {
      console.log('error: ', e.message);
    }

    console.log('config result: ', result);

    const appConfigs = { //TODO: remove after redux implementation
      ...appConfig,
      ...result.data.config,
      appConfig,
    };
    window.appConfigs = appConfigs;
    console.log('appConfigs+configs: ', appConfigs);

    // await AsyncStorage.setItem(
    //   'AppConfigs',
    //   JSON.stringify(appConfigs)
    // ).then(async (res) => {});

    this.props.onSetAppConfig(result.data.config)
  };

  hideErrorPopup=()=>{
    this.props.onSetErrorObject({status:false,message:""})
  }

  hideWebViewPopup=()=>{
    this.props.onSetWebViewObject({status:false,message:""})
  }


  render() {
    if (this.state.appIsReady === false) {
      return null;
    }
    //console.log(this.props.token, 'userInfouåserInfo');
    return (
      <>
      <App
        initialRoute={this.state.appInitialRoute}
        isLoggedInUser={this.state.isLoggedInUser}
      />
      <Loader isVisible={this.props.loadingOverlayActive}/>
      <ErrorModal
          dataString={this.props.errorObject.message}
          isVisible={this.props.errorObject.status}
          disable={this.hideErrorPopup}
          buttonText={'OK'}
      />
      <WebViewModal 
        urlString={this.props.webViewObject.url}
        headerString={this.props.webViewObject.headerText}
        isVisible={this.props.webViewObject.status}
        disableCalback={this.hideWebViewPopup}
      />
      <DemographicModal isVisible={this.props.isDemographicVisible}/>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo,
  token: selectUserToken,
  appConfigs:selectAppConfigs,
  loadingOverlayActive:selectAppLoading,
  errorObject:selectAppErrorObject,
  webViewObject:selectAppWebView,
  isDemographicVisible:selectIsVisibleDemographic
});

const mapDispatchToProps = (dispatch) => ({
  onSetUser:(data) => dispatch(setUser(data)),
  onSetToken: (data) => dispatch(setToken(data)),
  onSetAppConfig: (data) => dispatch(setAppConfigs(data)),
  onSetErrorObject: (data) => dispatch(setErrorObject(data)),
  onSetWebViewObject:(data) => dispatch(setWebViewObject(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Base);
