import React from 'react';
import { Image, Linking, Alert, AsyncStorage,Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {AuthModule,Tabs} from './navigation' 

import {
  mongoInit,
  postMongoAnalytics,
  makeSessionMongo,
  getStackArrayMongo,
} from '../src/utils/horizonAnalytics';

import {selectAppConfigs,selectEndPoints,selectSkipMode} from './redux/appReducer/app.selectors'
import {setUserValues} from './redux/userReducer/user.actions'

import {selectUserToken,selectUserInfo,selectUserSessionToken} from './redux/userReducer/user.selectors'
import {selectHomeSection} from './redux/home/home.selectors'
import {selectLocation} from './redux/location/location.selectors'
import {setHomeSection,setHomeCategory} from './redux/home/home.actions'
import {setHomeSelectedLocation} from './redux/location/location.actions'
import {setSelectedFilter,setMerchantData} from './redux/outlet/outlet.actions'

import appConfig from '@appConfig';

import * as StoreReview from 'expo-store-review';

const Stack = createStackNavigator();


import JWT from 'expo-jwt';
import { EventRegister } from "react-native-event-listeners";
import Branch, { BranchEvent } from 'react-native-branch'

import horizonAnalytics from 'rn-horizon-analytics';
const {appboy}=horizonAnalytics;
const {AppBoyGetInitialURL}=appboy;

var Url_ = require('url-parse');



var qs = require('qs');

import EndPoints from './EndPoints.json'


import {initExposeAuth,initExposeHome,initExposeOutlet,initExposeMerchant,initExposeSearch,initExposeFav,initExposeProfile,initExposeNotification} from './registerEvents'

const env  = appConfig.env ? appConfig.env : "dev"
window.endPoints = EndPoints[env]



export class index extends React.Component {
  state = {
    appIsReady: false,
  };

  /**
   * Method that serves to load resources and make API calls
   */
  componentDidMount() {
    this.branchHandler();
    this.appBoyDeeplinkHandler();

    //i18n_Init();
    // for exposeFunctions
    initExposeAuth(this.authExposeFunction);
    initExposeHome(this.homeExposeFunction);
    initExposeOutlet(this.outletExposeFunction);
    initExposeSearch(this.SearchExposeFunction);
    initExposeMerchant(this.merchantExposeFunction);
    initExposeFav(this.favExposeFunction);
    initExposeProfile(this.userProfileExposeFucntion);
    initExposeNotification(this.notificationExposeFunction);

    //creating session for the fist time
    const sessionData = {
      app_version: 'v1.1',
      device_uid: '',
      device_install_token: '',
      language: 'en',
      company: this.props.appConfigs.companyName,
      created_at: new Date().toString(),
      wlcompany: this.props.appConfigs.company,
    };
    makeSessionMongo(sessionData);


  }

  branchHandler = async () => {
    // if (Constants.appOwnership === 'standalone') {
      try {
        Branch.subscribe((bundle) => {
          console.log("branch response",bundle)
              // Alert.alert(`bundle ${typeof bundle}`, JSON.stringify(bundle));
              if (bundle && bundle.params && !bundle.error) {
                this.branchBundleHandler(bundle);
              }
            });
      } catch (error) {
       console.log(error,"bundlebundle nomi1122 error") 
      }
   
    // }
  };
  
  appBoyDeeplinkHandler = async () => {
    AppBoyGetInitialURL((deeplink)=> {
      if (deeplink) {
        const url = new Url_(deeplink);

        const host = url.host;
        console.log(deeplink,url,host,"nomi44444 1")
        this.invokeDeeplink(host);
      }
    });
  };

  goTodeeplinkTabScreen=async (routeName)=>{
    const isLoggedInUser=this.props.isLoggedInUser;
    if(isLoggedInUser)
    {
      const jumpToAction = TabActions.jumpTo(routeName);
      this.refs.navigation.dispatch(jumpToAction);
      if(routeName==="Home")
      {
        EventRegister.emit("homerefresh", true);
      }
    }
    else
    {

    if(routeName!=="User")
    {
    this.skipModeHelper();

    this.refs.navigation.navigate('Tab', { screen: routeName });
    }

    }
  }

  invokeDeeplink=async (host,params={})=>{
    console.log("n1111",host,params,"nomi1122333")
    if (host === 'ninedigitkey') {
      const vipKey = params.vip_key;
      const token = this.props.token
      const sessionToken = this.props.userSessionToken
      let isLoggedIn = false;
      if (sessionToken) {
        isLoggedIn = true;
      }
      window.deeplink = {
        type: 'vipKey',
        data: {
          isLoggedIn,
          vipKey,
          token,
          sessionToken
        },
        isDone: false,
      };
      console.log(window.deeplink,'nomi1122333')
      EventRegister.emit("new_vip_key", true);
    } else if (host === 'opencategory') {
      const query = url.query; //?category=FoodAndDrinks
      const queryParams = qs.parse(query, { ignoreQueryPrefix: true });
      const category = queryParams.category;
      if (category) {
        setTimeout(() => {
          window.deeplink = {
            type: 'goToOutlet',
            data: {
              categoryKey: category,
            },
            isDone: false,
          };
          this.goTodeeplinkTabScreen("Home")
        }, 1000);
      }
    } else if (host === 'alloffers') {
      setTimeout(() => {
        window.deeplink = {
          type: 'alloffers',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen("Home");
      }, 1000);
    } else if (host === 'favourites') {
      setTimeout(() => {
        this.goTodeeplinkTabScreen("Favourite");
      }, 1000);
    } else if (host === 'myprofile') {
      setTimeout(() => {
        this.goTodeeplinkTabScreen("User");
      }, 1000);
    } else if (host === 'rateapp') {
      setTimeout(async () => {
        try {
          const isAvailableAsync = await StoreReview.isAvailableAsync();
          if (isAvailableAsync) {
            StoreReview.requestReview();
          }
        } catch (error) {
          console.log(error, 'error');
        }
      }, 1000);
    } else if (host === 'redemptionsbreakdown') {
      setTimeout(() => {
        window.deeplink = {
          type: 'redemptionsbreakdown',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen("User");
      }, 1000);
    } else if (host === 'savingsbreakdown') {
      setTimeout(() => {
        window.deeplink = {
          type: 'savingsbreakdown',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen("User")
      }, 1000);
    } else if (host === 'quicksearch') {
      setTimeout(() => {
        window.deeplink = {
          type: 'quicksearch',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen("Home");
      }, 1000);
    } else if (host === 'appsearch') {
      const query = url.query; //?category=FoodAndDrinks
      const queryParams = qs.parse(query, { ignoreQueryPrefix: true });
      setTimeout(() => {
        window.deeplink = {
          type: 'appsearch',
          data: queryParams,
          isDone: false,
        };
        this.goTodeeplinkTabScreen("Home");
      }, 1000);
    } else if (host === 'filtersearch') {
      setTimeout(() => {
        const query = url.query;
        const queryParams = qs.parse(query, { ignoreQueryPrefix: true });
        window.deeplink = {
          type: 'filtersearch',
          data: queryParams,
          isDone: false,
        };
        this.goTodeeplinkTabScreen("Home");
      }, 1000);
    } else if (host === 'savings') {
      setTimeout(() => {
        window.deeplink = {
          type: 'savings',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen("User");
      }, 1000);
    } else if (host === 'register') {
      window.deeplink = {
        type: 'register',
        data: {},
        isDone: false,
      };
    } else if (host === 'notifications') {
      setTimeout(() => {
        window.deeplink = {
          type: 'notifications',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen("Notification");
      }, 1000);
    } else if (host === 'redemptionhistory') {
      setTimeout(() => {
        window.deeplink = {
          type: 'redemptionsbreakdown',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen("User");
      }, 1000);
    } else if (host === 'merchantdetailpage') {
      setTimeout(async () => {
        window.deeplink = {
          type: 'merchantdetailpage',
          data: {},
          isDone: false,
        };
        const query = url.query;
        const queryParams = qs.parse(query, { ignoreQueryPrefix: true });
        const merchantData = {
          merchantId: queryParams.merchant_id,
          outletId: queryParams.outlet_id,
          favourite: false,
        };
        const getLoc = this.props.location
        if (getLoc) {
          const location = {
            id: queryParams.location_id,
            name: getLoc ? getLoc.name : '',
          };
          //await setItem('location', location); //TODO: remove

          this.props.onSetLocation(location)
        }
        
        //await setItem('merchantData', merchantData); //TODO:
        this.goTodeeplinkTabScreen('Home');
        // this.refs.navigation.navigate('Tab');
        // this.refs.navigation.navigate("Tab", {
        //   screen: "Home"
        // ,params: {
        //   screen: 'Merchant',
        // }, });
      }, 1000);
    } else if (host === 'myinformation') {
      setTimeout(() => {
        window.deeplink = {
          type: 'myinformation',
          data: {},
          isDone: false,
        };
        const jumpToAction = TabActions.jumpTo('User');
        this.refs.navigation.dispatch(jumpToAction);
        // this.refs.navigation.navigate('Tab', { screen: 'User' });
      }, 1000);
    } else if (host === 'help') {
      setTimeout(() => {
        window.deeplink = {
          type: 'help',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen('User');
      }, 1000);
    } else if (host === 'locations') {
      setTimeout(() => {
        window.deeplink = {
          type: 'locations',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen('Home');
      }, 1000);
    } else if (host === 'tutorial') {
      setTimeout(() => {
        window.deeplink = {
          type: 'tutorial',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen('User');
      }, 1000);
    } else if (host === 'wallet') {
      setTimeout(() => {
        window.deeplink = {
          type: 'wallet',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen('User');
      }, 1000);
    } else if (host === 'monthlyoffers') {
      setTimeout(() => {
        window.deeplink = {
          type: 'monthlyoffers',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen('Home');
      }, 1000);
    } else if (host === 'ruleofuse') {
      setTimeout(() => {
        window.deeplink = {
          type: 'ruleofuse',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen('User');
      }, 1000);
    } else if (host === 'eula') {
      setTimeout(() => {
        window.deeplink = {
          type: 'eula',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen('User');
      }, 1000);
    } else if (host === 'categories') {
      setTimeout(() => {
        window.deeplink = {
          type: 'categories',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen('Home');
      }, 1000);
    } else if (host === 'getaway') {
      setTimeout(() => {
        window.deeplink = {
          type: 'getaway',
          data: {},
          isDone: false,
        };
        this.goTodeeplinkTabScreen('Home');
      }, 1000);
    }
    else
    {
      // setTimeout(() => {
      //   this.refs.navigation.reset('Auth');
      // }, 1000);
    }
  }

  branchBundleHandler = async (bundle,) => {
    console.log(bundle,"bundlebundle nomi1122")
    const params = bundle.params;
    const deeplink = params["+clicked_branch_link"]?params.deeplink:bundle.uri;
    const url = new Url_(deeplink);

    const host = url.host;

    console.log(host,"host nomi",bundle)
    this.invokeDeeplink(host,params);
  };

  UNSAFE_componentWillMount = async () => {
    //Initiliaze mongo with auth tokens
    console.log('In componentWillMount');
    mongoInit('cda6397940d3b191b7960e432be3f16f');
    // const dataStack = await getStackArrayMongo();
    // console.log(dataStack, 'getStackArrayMongo');
    //postMongoAnalytics();
  };

  // testBranchHandler=()=>{
  //   const bundle=getaway;
  //   if (bundle && bundle.params && !bundle.error) {
  //     this.branchBundleHandler(bundle)
  //   }
  // }

  // componentDidMount() {
  //   // this.branchHandler();
  //   this.testBranchHandler();
  // }

  homeExposeFunction = async (object) => {
    console.log('app.js home expose fucntion', object);

    const { type, data } = object;

    if (type === 'onCategoryClicked') {
      console.log('home data: ', data);

      const { displayName, apiName, location } = data;
      console.log('location: ', location);
      const passData = {
        category: displayName.replace('&', '%26'),
        key: apiName,
      };

      this.refs.navigation.navigate('Outlet', { screen: 'Outet' });
      // const nextUrl = '/outlet/outlet?category=' + displayName.replace('&', '%26') + '&key=' + apiName
      // this.props.history.push(nextUrl)
    } else if (type === 'onFeaturedTileClicked') {
      console.log('onFeature Expose ', data);

      const deepLink = data.deepLink;
      const url = new Url_(deepLink);
      console.log('url: ', deepLink);
      console.log('nominomi', url);
      console.log('url: protocol: ', url.protocol);
      console.log('url: hostname: ', url.host);
      console.log('url: pathname: ', url.pathname.replace(/[^a-zA-Z ]/g, ''));
      console.log('url: search: ', url.search);

      const pathName = url.pathname.replace(/[^a-zA-Z ]/g, '');
      console.log(pathName, 'pathName nomi');
      if (pathName === 'OpenCategory') {
        const category = qs.parse(url.search, { ignoreQueryPrefix: true })
          .category;

        console.log('url: category: ', category);
        let nextUrl = null;

        const categoryData = CategoryData[category];
        let apiName = '';
        let displayName = '';
        console.log('url: category Data: ', categoryData);
        if (categoryData) {
          displayName = categoryData.displayName;
          apiName = categoryData.apiName;
          nextUrl =
            '/outlet/outlet?category=' +
            categoryData.displayName.replace('&', '%26') +
            '&key=' +
            categoryData.apiName;
        } else {
          displayName = category;
          apiName = category;
          nextUrl = '/outlet/outlet?category=' + category + '&key=' + category;
        }

        const data = {
          apiName: apiName,
          displayName: displayName,
        };
        //await setItem('category', data); ///TODO: remove this

        this.props.onSetCategory(data)

        if (nextUrl) {
          console.log(nextUrl, 'nextUrlnextUrl');
          this.props.history.push(nextUrl);
        } else {
          console.log('invalid url');
        }
      } else if (pathName === 'appsearch') {
        const search = qs.parse(url.search, { ignoreQueryPrefix: true }).search;
        console.log('url: search: ', search);
        this.props.history.push(
          '/search/outlet_search?parent=home&searchText=' + search
        );
      } else if (pathName === 'Help') {
        const data = {
          title: 'Help & Live Chat',
          url: 'https://www.theentertainerme.com/CHB-FAQs',
        };
        //await setItem('webview', data);
        //this.props.history.push('/viewPage/external_webpage');
      } else if (url.protocol === 'https:') {
        const supported = await Linking.canOpenURL(deepLink);
        if (supported) {
          await Linking.openURL(deepLink);
        } else {
          Alert.alert(`Don't know how to open this URL: ${deepLink}`);
        }
      } else if (url.protocol !== 'https:' && url.protocol !== 'http:') {
        try {
          await Linking.openURL(deepLink);
        } catch (error) {
          Alert.alert(`Don't know how to open this URL: ${deepLink}`);
        }
        // const supported = await Linking.canOpenURL(deepLink);
        // if (supported) {
        //   await Linking.openURL(deepLink);
        // } else {
        //   Alert.alert(`Don't know how to open this URL: ${deepLink}`);
        // }
      }
    } else if (type === 'onSearchClicked') {
      this.refs.navigation.navigate('Search', { screen: 'Search' });
    } else if (type === 'logout') {
      console.log('I am in logout ');
      this.logout();
    }
  };

  logout = async () => {
    window.isBackButton=false;
    console.log('logout');
    // let keys = [
    //   'selectedFilters',
    // ];
    // await AsyncStorage.multiRemove(keys, (err) => {
    //   // keys k1 & k2 removed, if they existed
    //   // do most stuff after removal (if you want)
    // });
    // // AsyncStorage.clear();
    // // this.refs.navigation.navigate('Auth');



    //removing values from redux store
    this.props.onSetUserValues({userInfo: null,
      token: this.createJwt(),
      userSessionToken:''})
    this.props.onSetCategory(null)
    this.props.onSetHomeSection(null)
    this.props.onSetSelectedFilter(null)

    window.isDemographicCheck = undefined;
    this.refs.navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });

    // const resetAction = StackActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: 'Auth' })],
    // });
    // this.props.navigation.dispatch(resetAction);
    //   this.refs.navigation.dispatch(NavigationActions.reset({
    //     index: 0, key: null, actions: [NavigationActions.navigate({ routeName: 'Auth' })]
    //   }));
  };

  outletExposeFunction = (object) => {
    console.log('app.js expose fucntion outletExposeFunction', object);
    const { type, data } = object;

    if (type === 'onOutletClicked') {
      const { merchantId, favourite, outletId } = data;
      //setItem('merchantData', data); //TODO: remove this
      this.refs.navigation.navigate('Merchant', { screen: 'Merchant'});
    } else if (type === 'back') {
      this.refs.navigation.goBack();
    } else if (type === 'searchClieked') {
      this.refs.navigation.navigate('Search', { screen: 'Search' });
    } else if (type === 'logout') {
      this.logout();
    }
  };

  SearchExposeFunction = (object) => {
    console.log('app.js expose fucntion SearchExposeFunction', object);
    const { type, data } = object;

    if (type === 'cancel') {
      this.refs.navigation.goBack();
    } else if (type === 'onOutletClicked') {
      const { merchantId, favourite, outletId } = data;
      const nextUrl =
        '/merchant/merchant?merchantID=' +
        merchantId +
        '&outletID=' +
        outletId +
        '&favourite=' +
        favourite;
      //setItem('merchantData', data); //TODO:
      this.refs.navigation.navigate('Merchant', { screen: 'Merchant' });
      // this.props.history.push(nextUrl);
    } else if (type === 'logout') {
      // this.logout();
    }
  };

  merchantExposeFunction = async (object) => {
    console.log('app.js expose fucntion merchantExposeFunction', object);
    const { type, data } = object;
    console.log(type, data, 'type, data');
    if (type === 'back') {
      this.refs.navigation.goBack();
    } else if (type === 'favourite') {
      const { merchantId, outletId } = data;
      const nextUrl =
        '/merchant/merchant?merchantID=' +
        merchantId +
        '&outletID=' +
        outletId +
        '&favourite=' +
        true;

      //setItem('merchantData', {}); //TODO:
    }else if (type === 'logout') {
      this.logout();
    }
  };

  checkIsLoggedin = async () => {
    const token = this.props.userSessionToken
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  favExposeFunction = async (object) => {
    console.log('app.js expose fucntion merchantExposeFunction', object);
    const { type, data } = object;
    console.log(type, data, 'type, data');
    if (type === 'favourite') {
      const { merchantId, outletId } = data;
      const saveData = {
        merchantId: merchantId,
        outletId: outletId,
        favourite: true,
      };
      //setItem('merchantData', saveData); //TODO: 
      this.props.onSetMerchantData(saveData)
      this.refs.navigation.navigate('Merchant', { screen: 'Merchant' });
    } else if (type === 'logout') {
      this.logout();
    }
  };

  notificationExposeFunction = async (object) => {
    console.log('app.js expose fucntion notificationExposeFunction', object);
    const { type, data } = object;
    if (type === 'logout') {
      this.logout();
    }
  };

  authExposeFunction = async (object) => {
    console.log('Auth expose Function + Data == ',object);
    const { type} = object;
    if (type === 'login' || type === 'demographic' || type === 'skipMode') {
      this.refs.navigation.reset({
        index: 0,
        routes: [{ name: 'Tab' }],
      });
      //this.refs.navigation.navigate('Tab'); //removed because we need to reset stack
    } else {
      console.log('auth expose function this will never he');
    }
  };

  userProfileExposeFucntion = async (object) => {
    console.log('user profile expose fucntion');
    const { type, data } = object;
    if (type === 'logout') {
      console.log('loginHandler in user profile logout');
      // await AsyncStorage.clear();
      this.logout();
      // this.refs.navigation.navigate('Auth');
    } else if (type === 'logoutSkipMode') {
      // this.logout();
      window.isBackButton=true;
      this.refs.navigation.navigate("Auth")
    }
  };

  getTabBarVisible = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : route.params?.screen || 'Home';

    if (routeName === 'Merchant' || routeName === 'Search') {
      return false;
    }
    return true;
  };




  createJwt = () => {
    const payload = {
      api_token: this.props.appConfigs.apiToken,
    };
    const jwt = JWT.encode(payload, this.props.appConfigs.serectKey);
    return jwt;
  };

  skipModeHelper = async () => {
    try {
      const jwt=this.createJwt();
      this.props.onSetSkipMode(true)
      this.props.onSetToken(jwt)
      // await setItem('token', jwt);
      // await setItem('skipMode', 'true'); //TODO:remove
    } catch (e) {
      console.log('error in skip mode: ', e);
    }
  };

  render() {
    const { initialRoute } = this.props;

    return (
      <NavigationContainer ref={'navigation'}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="light-content" />
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name='Auth'
            component={AuthModule}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name='Tab'
            component={Tabs}
            options={{ headerShown: false }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


const mapStateToProps = createStructuredSelector({
  appConfigs:selectAppConfigs,
  token:selectUserToken,
  user:selectUserInfo,
  userSessionToken:selectUserSessionToken,
  homeSection:selectHomeSection,
  location:selectLocation
});

const mapDispatchToProps = (dispatch)=> ({
  onSetUser:(data)=>dispatch(setUser(data)),
  onSetToken:(data)=>dispatch(setToken(data)),
  onSetSkipMode:(data)=>dispatch(setSkipMode(data)),
  onSetUserValues:(data)=>dispatch(setUserValues(data)),
  onSetLocation:(data)=>dispatch(setHomeSelectedLocation(data)),
  onSetCategory:(data)=>dispatch(setHomeCategory(data)),
  onSetHomeSection:(data)=>dispatch(setHomeSection(data)),
  onSetSelectedFilter:(data)=>dispatch(setSelectedFilter(data)),
  onSetMerchantData:(data)=>dispatch(setMerchantData(data)),
  
})

export default connect(mapStateToProps, mapDispatchToProps)(index);
