import React from 'react';
import { Port as Container } from './screen/port';
import { EventRegister } from 'react-native-event-listeners';
//Screen
import PreferenceScreen from './screen/index';
import UserProfileBL from '../../BL/UserProfileBL';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectExposeFunction,selectAppConfigs } from '../../../../../redux/appReducer/app.selectors';
import { selectUserInfo,selectUserToken } from '../../../../../redux/userReducer/user.selectors';
import { selectHomeSection } from '../../../../../redux/home/home.selectors';
import {setUser, setToken,setUserValues} from '../../../../../redux/userReducer/user.actions'
import {setSkipMode} from '../../../../../redux/appReducer/app.actions'
import { isRTL } from './screen/utils/localization/I18n';


import horizonAnalytics from 'rn-horizon-analytics';

import AppConfig from '../../../../../AppConfig.json';

const { appboy } = horizonAnalytics;
const { setDatOfBirth, pushEnableDisable } = appboy;
import {exposeFunction} from '../../expose';

interface State {
  adaptor: Container;
  token: string;
}

//analytics
import {
  makeStackMongo,
  makeSessionMongo,
  getStackArrayMongo,
  resetStackObject,
  updateSessions,
  getSessions,
} from '../../utils/horizonAnalytics';

class Preference extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      adaptor: {
        data: {
          loadingOverlayActive: false,
          errorText: '',
          error: false,
          showDoneMessage: false,
          appVersion: '',
          user: {
            firstName: '',
            lastName: '',
            email: '',
            currency: '',
            userId: 0,
            countryOfResidence: '',
            gender: '',
            pushNotifications: false,
            nationality: '',
            mobilePhone: '',
            demographicsUpdated: false,
            profileImage: '',
            dateOfBirth: '',
          },
          helpAndChatURL: AppConfig.helpAndChatURL,
          rulesOfUserURL: AppConfig.rulesOfUserURL,
          hotelRulesOfuse: AppConfig.hotelRuleOfuse,
          ppURL: AppConfig.ppURL,
          eulaURL: AppConfig.eulaURL,
          travel_key: false,
        },
        CallBacks: {
          onBack: () => {
            this.onBackHandler();
          },
          onError: (data) => {
            this.ErrorHandler(data);
          },
          getExternalWebPageHTML: (data) => {
            this.getExternalWebPageHTMLHanler(data);
          },
          onUpdate: async (data) => {
            const result = await this.onUpdateHandler(data);
            return result;
          },
          logout: () => {
            this.logouthandler();
          },
          forgotPassword: async () => {
            const result = await this.forgotPasswordHanler();
            return result;
          },
          onRedemptionHistoryClick: () => {
            this.onRedemptionHistoryClickHandler();
          },
          onSavingHistoryClick: () => {
            this.onSavingHistoryClick();
          },
          pushAnalytics: (data: any) => {
            this.makeAnalyticsStack(data.name, data.action);
          },
          updateCountryOfResidency: (country: string) => {
            console.log(country);
            this.setState({
              adaptor: {
                data: {
                  ...this.state.adaptor.data,
                  user: {
                    ...this.state.adaptor.data.user,
                    countryOfResidence: country,
                  },
                },
                CallBacks: this.state.adaptor.CallBacks,
              },
            });
          },
          updateMobileNumber: (mobileNumber: string) => {
            this.setState({
              adaptor: {
                data: {
                  ...this.state.adaptor.data,
                  user: {
                    ...this.state.adaptor.data.user,
                    mobilePhone: mobileNumber,
                  },
                },
                CallBacks: this.state.adaptor.CallBacks,
              },
            });
          },
          updateCurrencyPreference: (currency: string) => {
            console.log(currency);
            this.setState({
              adaptor: {
                data: {
                  ...this.state.adaptor.data,
                  user: {
                    ...this.state.adaptor.data.user,
                    currency: currency,
                  },
                },
                CallBacks: this.state.adaptor.CallBacks,
              },
            });
          },
        },
      },
      token: '',
    };
  }

  makeAnalyticsStack = async (
    screenName = '',
    action = '',
    category_id = '',
    categories = '',
    categories_analytics = '',
    location_id = 0,
    changeSequenceNumber = false
  ) => {
    const stackData = {
      current_screen: screenName,
      action: action,
      category_id: category_id,
      categories: categories,
      categories_analytics: categories_analytics,
      location_id: location_id,
      changeSequenceNumber: changeSequenceNumber,
    };
    await makeStackMongo(stackData);
    //resetStackObject();
    const dataStack = await getStackArrayMongo();
    console.log(dataStack, 'getStackArrayMongo');
  };

  onSavingHistoryClick() {
    this.props.navigation.navigate('SavingHistory');
  }

  onRedemptionHistoryClickHandler() {
    this.props.navigation.navigate('RedemptionHistory');
  }

  onBackHandler() {
    this.props.navigation.goBack();
  }

  logouthandler = async () => {
    try {
      this.activeLoader(true);
      this.makeAnalyticsStack('Account', 'select_sign_out');

      const exposeData = {
        type: 'logout',
        data: {},
      };
      const token = this.state.token;
      //const result = await UserProfileBL.logout(token);
      //console.log('loginHandler', 'in login handler');
      //console.log('loginHandler ', result);
      //localStorage.clear();
      this.activeLoader(false);
      exposeFunction(exposeData);
    } catch (e) {
      this.activeLoader(false);

      setTimeout(() => {
        this.ErrorHandler({
          error: true,
          message: e.message,
        });
      }, 100);
    }
  };

  async componentDidMount(): Promise<void> {
    try {

      const token = this.props.token
      const user = this.props.user
      const appConfigs = this.props.appConfigs
      const homeSection = this.props.homeSection

      const language = isRTL ? 'ar' : 'en';
      let queryParams = '?language=' + language;
      if (!appConfigs.is_live_chat_enabled) {
        queryParams = queryParams + '&no_chat=true';
      }

      //console.log('componentDidMount', appConfigs, language, queryParams);
      //calculating homeSection travel if travel is here then show Hotel rule of use else show default
      let travelAvailable = false;
      homeSection[1].data.map((category) => {
        if (category.apiName === 'Travel') {
          travelAvailable = true;
        }
      });
      this.setState({
        token: token,
        adaptor: {
          data: {
            ...this.state.adaptor.data,
            appVersion: appConfigs.appVerison,
            user: {
              email: user.email,
              lastName: user.lastName,
              firstName: user.firstName,
              currency: user.currency,
              profileImage: user.profileImage,
              nationality: user.nationality,
              dateOfBirth: user.dateOfBirth,
              pushNotifications: user.pushNotifications,
              mobilePhone: user.mobilePhone,
              countryOfResidence: user.countryOfResidence,
              demographicsUpdated: user.demographicsUpdated,
              gender: user.gender,
              userId: user.userId,
            },
            travel_key: travelAvailable,
            helpAndChatURL:
              this.state.adaptor.data.helpAndChatURL + queryParams,
            rulesOfUserURL:
              this.state.adaptor.data.rulesOfUserURL + queryParams,
            hotelRulesOfuse:
              this.state.adaptor.data.hotelRulesOfuse + queryParams,
            ppURL: this.state.adaptor.data.ppURL + queryParams,
            eulaURL: this.state.adaptor.data.eulaURL + queryParams,
          },
          CallBacks: { ...this.state.adaptor.CallBacks },
        },
      });
    } catch (e) {
      this.activeLoader(false);
      setTimeout(() => {
        this.ErrorHandler({ error: true, message: e.messgage });
      }, 100);
    }
  }

  getProfile = async () => {
    try {
      this.activeLoader(true);
      const token = this.state.token;
      const userProfile = await UserProfileBL.userProfile(
        token,
        'en',
        this.state.adaptor.data.user.currency
      ); //TODO: user profile takes langauge and currency
      //await setItem('user', JSON.stringify(userProfile));
      this.props.onSetUser(userProfile)
      this.setProfile(userProfile);

      EventRegister.emit('updateProfile', userProfile); //auto update user profile
      this.activeLoader(false);
    } catch (e) {
      this.activeLoader(false);

      setTimeout(() => {
        this.ErrorHandler({
          error: true,
          message: e.message,
        });
      }, 100);
    }
  };

  setProfile = (UserProfile) => {
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          user: {
            ...this.state.adaptor.data.user,
            ...UserProfile,
          },
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  };

  forgotPasswordHanler = async () => {
    try {
      this.activeLoader(true);
      const token = this.state.token;
      const userProfile = await UserProfileBL.userProfile(token); //TODO: put lang and currency in this function to
      const forgotResponse = await UserProfileBL.forgotPassword({
        token,
        email: userProfile.email,
        language: isRTL ? 'ar' : 'en',
      });
      console.log(forgotResponse, 'forgotResponse');
      this.activeLoader(false);
      return {
        showDoneMessgae: true,
        doneMessage: forgotResponse,
      };
    } catch (e) {
      this.activeLoader(false);
      setTimeout(() => {
        this.ErrorHandler({
          error: true,
          message: e.message,
        });
      }, 100);
    }
  };

  onUpdateHandler = async (data: any) => {
    try {
      pushEnableDisable(data.pushNotifications)
    } catch (error) {
      console.log(error,"error")
    }
    try {
      this.activeLoader(true);
      this.makeAnalyticsStack('My Information', 'click_update');
      const token = this.state.token;
      await UserProfileBL.updateProfile({
        token,
        ...data,
      });
      await this.getProfile();
      //setDatOfBirth(data.dateOfBirth);
      return true;
      // this.setProfile(data);
      // this.activeLoader(false);
    } catch (e) {
      console.log(e);
      this.activeLoader(false);
      setTimeout(() => {
        this.ErrorHandler({
          error: true,
          message: e.message,
        });
      }, 100);
      return false;
    }
  };

  getExternalWebPageHTMLHanler(data: any) {
    console.log(data);
  }

  activeLoader(flag: boolean): void {
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          loadingOverlayActive: flag,
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  }

  ErrorHandler = (data: any) => {
    const { error, message } = data;
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          error: error,
          errorText: message,
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  };

  profileRefreshHandler = () => {
    this.activeLoader(true);
    setTimeout(() => {
      this.activeLoader(false);
      console.log('user profiles api success');
    }, 2000);
  };

  onClickWebView = (title, url) => {
    //console.log(url, title, "url,title");
    const data = {
      type: 'webview',
      data: {
        url,
        title,
      },
    };
    exposeFunction(data);
  };

  render() {
    return <PreferenceScreen {...this.state.adaptor} />;
  }
}

const mapStateToProps = createStructuredSelector({
  exposeFunction: selectExposeFunction,
  appConfigs:selectAppConfigs,
  token:selectUserToken,
  user:selectUserInfo,
  homeSection:selectHomeSection
});

const mapDispatchToProps = (dispatch)=> ({
  onSetUser:(data)=>dispatch(setUser(data)),
  onSetToken:(data)=>dispatch(setToken(data)),
  onSetSkipMode:(data)=>dispatch(setSkipMode(data)),
  onSetUserValues:(data)=>dispatch(setUserValues(data))
})



export default connect(mapStateToProps, mapDispatchToProps)(Preference);
