import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  Keyboard,
} from 'react-native';

import Login from './components/login';
import Register from './components/register';
import ReCaptchaV3 from '@haskkor/react-native-recaptchav3';
import APP_COLORS from './res/colors';
import GlobalStyles from './res/styles/globalStyles';
import ForgetPasswordModal from './components/wrapedComps/forgot_passowrd';
import i18n, { getFlipForRTLStyle } from './utils/localization/I18n';
import { CustomComponents, FastTrackLibs } from 'rn_fast_track_uilib';
import AuthBL from '../../../BL/AuthBL';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectAppConfigs,
  selectDeviceInfo,
  selectAppErrorObject,
  selectAppLoading,
} from '../../../../../../redux/appReducer/app.selectors';

import {
  setAppLoading,
  setErrorObject,
  setSkipMode,
  setDemographicVisible,
} from '../../../../../../redux/appReducer/app.actions';
import {
  setToken,
  setUserValues,
} from '../../../../../../redux/userReducer/user.actions';
import horizonAnalytics from 'rn-horizon-analytics';


import {exposeAuth} from '../../../../../../registerEvents';

const { appboy } = horizonAnalytics;
const { registerUserAppBoy, registrationCompleteEvent } = appboy;

import { wait } from './utils/helperMethods';

const { HeaderWithLogoWithSkipButton } = CustomComponents;
const { createMaterialTopTabNavigator, JWT } = FastTrackLibs;
const { ResetPasswordSuccessModal } = CustomComponents;
const Tab = createMaterialTopTabNavigator();

interface STATE {
  captchaToken: string;
  activeTab: string;
  loginMessage: any;
  eula_url: string;
  pp_url: string;
  jwtToken: string;
  showForgetPasswordModal: boolean;
  showDoneMessage: boolean;
  doneMessage:string
}

class Authentication extends React.Component<any, STATE> {
  private _captchaRef: any = React.createRef();
  constructor(props: any) {
    super(props);
    this.state = {
      captchaToken: '',
      activeTab: this.props.appConfigs.activeAuthTab
        ? this.props.appConfigs.activeAuthTab
        : 'Login',
      loginMessage: this.props.appConfigs.loginMessage
        ? this.props.appConfigs.loginMessage
        : null,
      eula_url: this.props.appConfigs.eulaURL,
      pp_url: this.props.appConfigs.ppURL,
      jwtToken: this.createJwt(),
      showForgetPasswordModal: false,
      showDoneMessage: false,
      doneMessage:'',
      
    };
  }

  configureURLs = () => {
    //chat for pp_url and eula_url
    const chat_flag = !this.props.appConfigs.is_live_chat_enabled;
    const language = this.props.deviceInfo.language
      ? this.props.deviceInfo.language
      : 'en';
    let queryParams = '?language=' + language;
    if (chat_flag) {
      queryParams = queryParams + '&no_chat=true';
    }

    const temp_pp_url = this.state.pp_url + queryParams;
    const temp_eula_url = this.state.eula_url + queryParams;

    this.setState({
      pp_url: temp_pp_url,
      eula_url: temp_eula_url,
    });
  };

  createJwt = () => {
    const payload = {
      api_token: this.props.appConfigs.apiToken,
    };
    const jwt = JWT.encode(payload, this.props.appConfigs.serectKey);
    //console.log(appConfig, 'Hey there')
    //console.log('jwt:', jwt, 'payLoad:', payload);
    return jwt;
  };

  componentDidMount() {
    this.configureURLs();
  }

  // shouldComponentUpdate(nextProps,nextState) {
  //   return(
      
  //   )
  // }


  //for removing warning
  //https://stackoverflow.com/questions/60586470/how-to-remove-warning-in-react-native
  loginComponent = () => {
    return (
      <Login
        onLogin={this.onLogin}
        onError={this.errorHandler}
        pushAnalytics={this.pushAnalytics}
        data={this.state}
        onForgotPassword={this.onForgotPassword}
      />
    );
  };
  registerComponent = () => {
    return (
      <Register
        onRegistration={this.onRegistration}
        onError={this.errorHandler}
        pushAnalytics={this.pushAnalytics}
        data={this.state}
      />
    );
  };

  handleSkipMode = () => {
    this.props.onSetSkipMode(true);
    this.props.onSetToken(this.createJwt());
    //console.log('app loading', this.props.navigation);
    //this.props.navigation.navigate('Tab');
    exposeAuth({type:'skipMode',data:{}})

  };

  pushAnalytics = () => {
    console.log('here');
  };
  checkCaptcha = async () => {
    try {
      if (this.props.appConfigs.is_captcha_verification === true) {
        this._captchaRef.refreshToken();
        // split a second to delay refresh captcha
        await wait(500);
      }
    } catch (error) {
      console.log('is_captcha_verification: ', error);
      this.errorHandler({
        message: true,
        messageType: 'error',
        messageText: error.message,
      });
    }
  };

  createSessionJwt(sessionToken: string) {
    const payload = {
      api_token: this.props.appConfigs.apiToken,
      session_token: sessionToken,
    };
    const sessionJwt = JWT.encode(payload, this.props.appConfigs.serectKey);
    return sessionJwt;
  }

  checkIsDemographic = (userData) => {
    // if (!userData.demographicsUpdated) {
    //   console.log(userData,'userrrrrrrr');
    //   this.props.onSetDemographicVisible('home_screen');
    // }

    // this.props.navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Tab' }],
    // });

    exposeAuth({type:'login',data:{}})

  };

  onLogin = async (data: any) => {
    try {
      this.props.onSetAppLoading(true);
      await this.checkCaptcha();

      let keys = {};
      if (this.props.appConfigs.is_captcha_verification) {
        keys['captcha_token'] = this.state.captchaToken;
      }
      const sessionToken = await AuthBL.login({
        ...data,
        ...keys,
        platform: this.props.deviceInfo.device_os,
        token: this.state.jwtToken,
      });

      const sessionJwt = await this.createSessionJwt(sessionToken);

      //login analytics
      //this.makeAnalyticsStack('Login', 'login_success'); //TODO: implement Analytics
      let userProfile = await AuthBL.getUserProfile(sessionJwt);

      console.log(userProfile, 'userProfile');

      this.props.onSetToken(sessionJwt);
      this.props.onSetUserValues({
        skipMode: false,
        userSessionToken: sessionToken,
        userInfo: userProfile,
      });

      registerUserAppBoy(userProfile);

      this.checkIsDemographic(userProfile);
      this.props.onSetAppLoading(false);
    } catch (error) {
      console.log('onLogin error: ', error);
      this.props.onSetAppLoading(false);
      this.errorHandler({
        message: true,
        messageText: error.messageText,
      });
    }
  };

  onRegistration = async (data: any) => {
    try {
      console.log(data,'registration data')
      this.props.onSetAppLoading(true);

      await this.checkCaptcha();

      let keys = {};
      if (this.props.appConfigs.is_captcha_verification) {
        keys['captcha_token'] = this.state.captchaToken;
      }

      const sessionToken = await AuthBL.signup({
        ...data,
        ...keys,
        platform: this.props.deviceInfo.device_os,
        token: this.state.jwtToken,
        isDemographics: this.props.appConfigs.is_signup_with_demographic,
      });

      const sessionJwt = await this.createSessionJwt(sessionToken);

      console.log(sessionJwt,'sessionToken');

      const userProfile = await AuthBL.getUserProfile(sessionJwt);

      this.props.onSetToken(sessionJwt);
      this.props.onSetUserValues({
        skipMode: false,
        userSessionToken: sessionToken,
        userInfo: userProfile,
      });

      registerUserAppBoy(userProfile);
      registrationCompleteEvent();
      this.checkIsDemographic(userProfile);
      this.props.onSetAppLoading(false);
    } catch (error) {
      console.log('onRegistration error: ', error);
      this.props.onSetAppLoading(false);
      this.errorHandler({
        message: true,
        messageText: error.messageText,
      });
    }
  };

  onForgotPassword = async (email: string) => {
    try {
      this.props.onSetAppLoading(true);

      this.setState({
        showForgetPasswordModal: !this.state.showForgetPasswordModal,
      });

      const message = await AuthBL.forgotPassword({
        email: email,
        token: this.state.jwtToken,
      });

      this.props.onSetAppLoading(false);

      this.doneMessageHandler({
        showDoneMessage: true,
        doneMessage: message,
      });

        this.setState({
          showDoneMessage:true
        })
      


      console.log(message,'in message handler');
    } catch (error) {
      console.log('on forgot password error: ', error);
      this.props.onSetAppLoading(false);
      this.errorHandler({
        message: true,
        messageText: error.messageText,
      });
    }
  };

  doneMessageHandler = (data: any) => {
    const { showDoneMessage, doneMessage } = data;
    this.setState({
      showDoneMessage: showDoneMessage,
      doneMessage:doneMessage
    });
  };

  errorHandler = (data: any) => {
    const { message, messageText } = data;
    console.log('data', data);
    const errorObj = {
      status: message,
      message: messageText,
    };
    this.props.onSetErrorObject(errorObj);
  };

  render() {
    const { activeTab,showDoneMessage,doneMessage} = this.state;

    const initialRouteName = window.deeplink
      ? window.deeplink.type === 'register'
        ? 'Register'
        : activeTab
      : activeTab;
    return (
      <SafeAreaView style={[GlobalStyles.droidSafeArea, getFlipForRTLStyle()]}>
        <ResetPasswordSuccessModal
          isVisible={showDoneMessage}
          dataString={doneMessage}
          hide={() => {
            this.setState({showDoneMessage:false})
          }}
        />

        <View
          style={{
            flex: 1,
            backgroundColor: 'APP_COLORS.COLOR_BACKGROUND',
            flexDirection: 'column',
          }}
        >
          <HeaderWithLogoWithSkipButton
            getFlipForRTLStyle={getFlipForRTLStyle}
            skipModeCallback={this.handleSkipMode}
          />

          <Tab.Navigator
            initialRouteName={initialRouteName}
            tabBarOptions={{
              inactiveTintColor: APP_COLORS.COLOR_666666,
              activeTintColor: APP_COLORS.COLOR_BLACK,
              style: {
                backgroundColor: 'white',
                marginTop: 0,
                marginBottom: 0,
                height: 40,
              },
              indicatorStyle: {
                height: 3,
                backgroundColor: APP_COLORS.COLOR_THEME,
              },
              labelStyle: {
                fontFamily: 'MuseoSans700',
                lineHeight: 16,
                ...getFlipForRTLStyle(),
              },
            }}
          >
            <Tab.Screen
              name='Login'
              component={this.loginComponent}
              options={{
                title: i18n.t('SIGN_IN_STRING'),
              }}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault();
                  console.log('login');
                  Keyboard.dismiss();
                  //this.pushAnalytics('Login', 'open', '', '', '', 0, true);
                  // Do something with the `navigation` object
                  navigation.navigate('Login');
                },
              })}
            />
            <Tab.Screen
              name='Register'
              component={this.registerComponent}
              options={{ title: i18n.t('REGISTER_STRING') }}
              listeners={({ navigation, route }) => ({
                tabPress: (e) => {
                  // Prevent default action
                  e.preventDefault();
                  console.log('register');
                  Keyboard.dismiss();
                  //this.pushAnalytics('Register', 'open', '', '', '', 0, true);
                  // Do something with the `navigation` object
                  navigation.navigate('Register');
                },
              })}
            />
          </Tab.Navigator>

          {this.props.appConfigs.is_captcha_verification && (
            <ReCaptchaV3
              ref={(ref: RecaptchaV3) => (this._captchaRef = ref)}
              captchaDomain={
                'https://entcartut.theentertainerme.com/captcha/b2b-captcha.php'
              }
              siteKey={'6LeY6M8ZAAAAAFg_llhy7PX6hlO0tixNKaR7MznB'}
              onReceiveToken={(token: string) => {
                console.log(token);
                this.setState({ captchaToken: token });
              }}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  appConfigs: selectAppConfigs,
  deviceInfo: selectDeviceInfo,
  loadingOverlayActive: selectAppLoading,
  errorObject: selectAppErrorObject,
});

const mapDispatchToProps = (dispatch, props) => ({
  onSetAppLoading: (data) => dispatch(setAppLoading(data)),
  onSetErrorObject: (data) => dispatch(setErrorObject(data)),
  onSetSkipMode: (data) => dispatch(setSkipMode(data)),
  onSetToken: (data) => dispatch(setToken(data)),
  onSetUserValues: (data) => dispatch(setUserValues(data)),
  onSetDemographicVisible: (data) => dispatch(setDemographicVisible(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
