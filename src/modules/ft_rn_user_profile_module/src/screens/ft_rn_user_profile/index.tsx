import React from 'react';
import { Port as Container } from './screen/port';
import { AsyncStorage } from 'react-native';
import { EventRegister } from 'react-native-event-listeners'

//Screen
import UserProfileScreen from './screen/index';

import UserProfileBL from '../../BL/UserProfileBL';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {currentLanguage} from '../../utils/localization/I18n'
interface State {
  adaptor: Container;
  token: string;
  isCameraOn: boolean;
}
import {exposeFunction} from '../../expose';

//analytics
import {
  makeStackMongo,
  makeSessionMongo,
  getStackArrayMongo,
  resetStackObject,
  updateSessions,
  getSessions,
} from '../../utils/horizonAnalytics';

import { selectExposeFunction, selectSkipMode } from '../../../../../redux/appReducer/app.selectors';
import {selectUserToken,selectUserInfo} from '../../../../../redux/userReducer/user.selectors';

class UserProfile extends React.Component<any, State> {
  listener: any;
  constructor(props: any) {
    super(props);
    
    this.state = {
      adaptor: {
        data: {
          loadingOverlayActive: false,
          errorText: '',
          error: false,
          user: {
            firstName: '',
            lastName: '',
            email: '',
            currency: '',
            savings: 0,
            profileImage: '',
          },
        },
        CallBacks: {
          profileRefresh: () => {
            this.profileRefreshHandler();
          },
          onCameraClick: (file) => {
            this.onCameraClick(file);
          },
          onClickSetting: () => {
            this.onClickSetting();
          },
          onClickViewBreakDown: () => {
            this.onClickViewBreakDown();
          },
          onError: (data) => {
            this.ErrorHandler(data);
          },
        },
      },
      isCameraOn: false,
      token: '',
    };

    this.listener = null
  }

  // writeLocalStorage = (data) => {
  //   console.log(data, 'writeLocalStorage');
  //   var o = data;
  //   for (var property in o) {
  //     if (o.hasOwnProperty(property)) {
  //       AsyncStorage.setItem(property, o[property]);
  //     }
  //   }
  // };

  async componentWillMount() {
    try {
      this.makeAnalyticsStack('My Profile', 'open', '', '', '', 0, true);
      
    } catch (error) {
      console.log(error, 'error');
    }
  }

  deeplinkHandler = (deeplink) => {
    try {
      if (deeplink) {
        const type = deeplink.type;
        if (type === 'redemptionsbreakdown') {
          const isDone = deeplink.isDone;
          if (!isDone) {
            window.deeplink.isDone = true;
            setTimeout(async () => {
              this.props.navigation.navigate('RedemptionHistory');
            }, 100);
          }
        } else if (type === 'savingsbreakdown') {
          const isDone = deeplink.isDone;
          if (!isDone) {
            window.deeplink.isDone = true;
            setTimeout(async () => {
              this.props.navigation.navigate('SavingHistory');
            }, 100);
          }
        } else if (type === 'savings') {
          const isDone = deeplink.isDone;
          if (!isDone) {
            window.deeplink.isDone = true;
            setTimeout(async () => {
              this.props.navigation.navigate('SavingHistory');
            }, 100);
          }
        } else if (type === 'help') {
          const isDone = deeplink.isDone;
          if (!isDone) {
            window.deeplink.isDone = true;
            setTimeout(async () => {
              window.goto="help";
              this.props.navigation.navigate('Preference');
              //open modal on prefrence screen
            }, 100);
          }
        } else if (type === 'tutorial') {
          const isDone = deeplink.isDone;
          if (!isDone) {
            window.deeplink.isDone = true;
            setTimeout(async () => {
              window.goto="tutorial";
              this.props.navigation.navigate('Preference');
              //open modal on prefrence screen
            }, 100);
          }
        } else if (type === 'ruleofuse') {
          const isDone = deeplink.isDone;
          if (!isDone) {
            window.deeplink.isDone = true;
            setTimeout(async () => {
              window.goto="ruleofuse";
              this.props.navigation.navigate('Preference');
              //open modal on prefrence screen
            }, 100);
          }
        } else if (type === 'eula') {
          const isDone = deeplink.isDone;
          if (!isDone) {
            window.deeplink.isDone = true;
            setTimeout(async () => {
              window.goto="eula";
              this.props.navigation.navigate('Preference');
              //open modal on prefrence screen
            }, 100);
          }
        }
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  componentDidMount() {
    this.deeplinkHandler(window.deeplink);
  }

  async componentWillMount(): Promise<void> {
    try {

      const skipMode = this.props.skipMode;
      if (skipMode) {
        console.log(skipMode, 'skipMode in profileModule === true');
        const exposeData = {
          type: 'logoutSkipMode',
          data: {},
        };
        exposeFunction(exposeData);
        console.log(this.props.exposeFunction, 'profileModu');
      } else {
        const token = this.props.token;

        const user = this.props.user;
         console.log('user componentWillMount: ', user);

        this.setState({
          token: token,
          adaptor: {
            data: {
              ...this.state.adaptor.data,
              user: {
                email: user.email,
                lastName: user.lastName,
                firstName: user.firstName,
                currency: user.currency,
                savings: user.savings,
                profileImage: user.profileImage,
              },
            },
            CallBacks: { ...this.state.adaptor.CallBacks },
          },
        });

        this.listener = EventRegister.addEventListener('updateProfile', (data) => {
          this.setProfile(data)
      })
      }


    } catch (e) {
      this.activeLoader(false);
      setTimeout(() => {
        this.ErrorHandler({ error: true, message: e.messgage });
      }, 100);
    }
  }

  makeCustomAnalyticsStack = async (stackData) => {
    console.log('stack data', stackData);
    await makeStackMongo(stackData);
    //resetStackObject();
    const dataStack = await getStackArrayMongo();
    console.log(dataStack, 'getStackArrayMongo');
  };

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

  refreshProfile = async (isCommingFromPullToRefresh=false) => {
    try {

      if(isCommingFromPullToRefresh){
        this.activeLoader(true);
      }
     
      this.makeAnalyticsStack(
        'My Profile',
        'click_refresh',
        '',
        '',
        '',
        0,
        false
      );

      //updated code due to we are saving user object in edit account
      // so there is no need of call api again
      const token = this.state.token;

      const asyncObject = await AsyncStorage.multiGet([
        'user',
      ]);

      const storedUser = JSON.parse(asyncObject[0][1]); 
      const userCurrency = storedUser.currency === undefined ? 'USD':storedUser.currency;
      console.log(userCurrency , currentLanguage(), 'okay data' )
      const userProfile = await UserProfileBL.userProfile(token,currentLanguage(),userCurrency);
      await AsyncStorage.setItem('user', JSON.stringify(userProfile));
      this.setProfile(userProfile);

      this.activeLoader(false);
    } catch (error) {
      this.activeLoader(false);
      console.log(error, 'error while refreshing user');
    }
  };

  setProfile = (UserProfile) => {
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          user: {
            ...UserProfile,
          },
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  };

  onClickSetting = async () => {
    await this.makeAnalyticsStack(
      'My Profile',
      'click_setting',
      '',
      '',
      '',
      0,
      false
    );
    this.props.navigation.navigate('Preference');
  };

  onCameraClick = (file) => {
    this.makeAnalyticsStack('My Profile', 'click_camera', '', '', '', 0, false);
    this.onTakePhoto(file);
  };

  onTakePhoto = async (file) => {
    this.activeLoader(true);
    const token = this.state.token;

    const photoFile = {
      uri: file.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    const data = {
      token,
      profile_image: photoFile,
    };
    try {
      const response = await UserProfileBL.UpateUserProfilemage(data);
      console.log(file, 'filefile nomi', response);
      if (response === 'success') {
        this.setProfileImage(file.uri);
      }
      this.refreshProfile();
      this.activeLoader(false);
    } catch (error) {
      this.activeLoader(false);
      console.log(error, 'errorerror');
    }
  };

  setProfileImage(file) {
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          user: {
            ...this.state.adaptor.data.user,
            profileImage: file,
          },
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  }

  onClickViewBreakDown = async () => {
    await this.makeAnalyticsStack(
      'My Profile',
      'click_savings_breakdown',
      '',
      '',
      '',
      0,
      false
    );
    this.props.navigation.navigate('SavingBreakdown');
  };

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
    this.refreshProfile();
  };

  render() {
    return <UserProfileScreen {...this.state.adaptor} />;
  }
}

const mapStateToProps = createStructuredSelector({
  exposeFunction: selectExposeFunction,
  skipMode: selectSkipMode,
  token: selectUserToken,
  user: selectUserInfo,
});

export default connect(mapStateToProps, null)(UserProfile);
