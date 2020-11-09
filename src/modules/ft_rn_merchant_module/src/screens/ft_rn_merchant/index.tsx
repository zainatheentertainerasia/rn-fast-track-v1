import React from 'react';
import {  SafeAreaView } from 'react-native-safe-area-context';


//Screen
import MerchantScreen from './screen/index';

import UserProfileBL from '../../../../../modules/ft_rn_user_profile_module/src/BL/UserProfileBL';

import MerchantBL from '../../BL/MerchantBL';
//Port
import { Port as Contract } from './screen/port';

//analytics
import { makeStackMongo } from '../../utils/horizonAnalytics';
import { isRTL } from './screen/utils/localization/I18n';
import horizonAnalytics from 'rn-horizon-analytics';
const { appboy } = horizonAnalytics;
const { afterRedemptionEvent } = appboy;

import {
  CustomComponents,
  design,
} from 'rn_fast_track_uilib';

//redux implementation
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectExposeFunction,
  selectAppConfigs,
  selectDeviceInfo
} from '../../../../../redux/appReducer/app.selectors';
import {
  selectUserInfo,
  selectUserToken,
} from '../../../../../redux/userReducer/user.selectors';
import {
  setAppLoading,

} from '../../../../../redux/appReducer/app.actions';
import {setUser} from '../../../../../redux/userReducer/user.actions'
import { selectLocation,selectCurrentLocation } from '../../../../../redux/location/location.selectors';
import { selectMerchantData,selectFavouriteList } from '../../../../../redux/outlet/outlet.selectors';
import {setFavouriteList} from '../../../../../redux/outlet/outlet.actions'
const { DemographicModal, isDemographicEnable } = CustomComponents;

import { EventRegister } from 'react-native-event-listeners';

interface Props {}

interface redemptionDataParams {
  offer_id: number;
  outlet_id: number;
  merchant_pin: number;
  product_id: number;
  currency: string;
  language: string;
}
interface State {
  adaptor: Contract;
  sessionJwt: string;
  location_id: number;
  locationName: string;
  position: { lat: number; lng: number };
  userId: number;
  currency: string;
  categoryObject: {};
  isLoaded: boolean;
  rulesOfUseURL: string;
  isDemographicVisible: boolean;
}

class Merchant extends React.Component<any, State> {
  merchantDetail = {};
  constructor(props: Props) {
    super(props);

    this.state = {
      adaptor: {
        data: {
          selectedOutlet: {
            lat: 0,
            neighborhood: '',
            mall: '',
            name: '',
            email: '',
            id: 0,
            lng: 0,
            human_location: '',
            distance: '0',
            telephone: '',
          },
          favourite: false,
          merchant: {
            id: 0,
            name: '',
            description: '',
            logo_small_url: '',
            hero_urls: [],
            merchant_attributes: [],
            outlets: [],
            offers: [],
          },
          redemptionResponse: null,
          loadingOverlayActive: true,
          errorText: '',
          error: false,
          showRedemptionModal: false,
          showRedemptionSuccessModal: false,
          selectedOffer: {
            product_id: 0,
            OfferToDisplay: {
              voucher_type_image: '',
              name: '', //outlet
              additional_details: [],
              voucher_details: [],
              outlet_ids: [],
              redeemability: 0,
              offer_id: 0,
              savings_estimate: 0, //
              validity_date: 'string',
              sub_detail_label: 'string',
              details: '',
            },
          },
          menu: '',
          website: '',
          companyName: this.props.appConfig.company,
          ruleOfUseURL: this.props.appConfig.rulesOfUserURL,
        },
        CallBacks: {
          onError: (data) => {
            this.ErrorHandler(data);
          },
          hideError: () => {
            if (this.state.adaptor.data.errorText === 'Token not found') {
              this.setState(
                {
                  adaptor: {
                    data: {
                      ...this.state.adaptor.data,
                      error: false,
                      errorText: '',
                    },
                    CallBacks: this.state.adaptor.CallBacks,
                  },
                },
                () => {
                  // const exposeData = {
                  //   type: 'logout',
                  //   data: {},
                  // };
                  // this.props.exposeFunction && this.props.exposeFunction(exposeData);
                }
              );
            } else {
              this.setState({
                adaptor: {
                  data: {
                    ...this.state.adaptor.data,
                    error: false,
                    errorText: '',
                  },
                  CallBacks: this.state.adaptor.CallBacks,
                },
              });
            }
          },
          setFavourite: () => {
            this.setFavourite();
          },
          addFavorite: (data) => {
            this.merchantAddToFavorites(data);
          },
          removeFavorite: (data) => {
            this.merchantRemoveFromFavorites(data);
          },
          redeemOffer: (data) => this.redeemOffer(data),
          activeLoader: (flag) => this.activeLoader(flag),
          refreshMerchant: () => {
            this.handleRefreshMerchant();
          },
          onBack: () => {
            this.backHandler();
          },
          onSelectedOutletChange: (data) => {
            this.onSelectedOutletChangehandler(data);
          },
          onClickWebView: () => {
            this.onClickWebView;
          },
          onOfferSelected: (data: any) => {
            this.handleOnOfferSelected(data);
          },
          onShowRedemptionModal: () => {
            this.setState({
              adaptor: {
                data: {
                  ...this.state.adaptor.data,
                  showRedemptionModal: true,
                },
                CallBacks: this.state.adaptor.CallBacks,
              },
            });
          },
          onCloseRedemptionModal: () => {
            this.setState({
              adaptor: {
                data: {
                  ...this.state.adaptor.data,
                  showRedemptionModal: false,
                },
                CallBacks: this.state.adaptor.CallBacks,
              },
            });
          },
          onShowRedemptionSuccessModal: () => {
            this.handleOnShowRedemptionSuccessModal();
          },
          pushAnalytics: (stackData) => {
            this.makeCustomAnalyticsStack(stackData);
          },
          onCloseRedemptionSuccessModal: () => {
            this.setState({
              adaptor: {
                data: {
                  ...this.state.adaptor.data,
                  showRedemptionSuccessModal: false,
                },
                CallBacks: this.state.adaptor.CallBacks,
              },
            });
          },
        },
      },
      sessionJwt: '',
      location_id: 0,
      locationName: '',
      userId: 0,
      currency: 'USD',
      position: { lat: 0, lng: 0 },
      categoryObject: {},
      isLoaded: false,
      isDemographicVisible: false,
    };
  }

  checkDemographic = async (screenName) => {
    try {
      const isDemographicVisible = await isDemographicEnable(screenName);
      this.setState({ isDemographicVisible: isDemographicVisible });
    } catch (error) {}
  };

  onDismissDemographicModalHandler = () => {
    this.setState({ isDemographicVisible: false });
  };

  makeCustomAnalyticsStack = async (stackData) => {
    //console.log('stack data', stackData);
    makeStackMongo(stackData);
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
    makeStackMongo(stackData);
  };

  getChatFlag = async () => {
    try {
      const chat_flag = !this.props.appConfig.is_live_chat_enabled;
      return chat_flag;
    } catch (error) {
      return false;
    }
  };



  async componentDidMount() {
    try {

      this.props.onSetAppLoading(false)

      const {token,location,merchantData} = this.props
      const user = this.props.userInfo;
      // for current position of user
      let position = this.props.currentUserLocation

      if(!position){
        position = {coords:{
          latitude:0,
          longitude:0
        }}
      }

      if(!merchantData){
        //TODO: implement go back as merchant data is not found
      }

      if(!token){
        //TODO: implement go back as merchant data is not found
      }

      

      //console.log(merchantData, 'merchantData');
      const { merchantId, outletId, favourite } = merchantData;

      const language = isRTL ? 'ar' : 'en';
      let queryParams = '?language=' + language;
      if (!this.props.appConfig.is_live_chat_enabled) {
        queryParams = queryParams + '&no_chat=true';
      }

      let urlParam = {
        merchantID: merchantId,
        outletID: outletId,
      };

      

      if (!urlParam.outletID) {
        urlParam['outletID'] = 0;
      }

      
      const { latitude, longitude } = position.coords;

      this.setState(
        {
          position: {
            lat: latitude,
            lng: longitude,
          },
          location_id: location.id,
          locationName: location.name,
          userId: user.userId,
          currency: user.currency,
          sessionJwt: token,
        },
        () => {
          //fetching merchant details from live server
          console.log(urlParam,'fetching merchant details from live server')
          this.getMerchant(urlParam.merchantID, urlParam.outletID, favourite);
          //analytics
          const stackData = {
            current_screen: 'Merchant Detail',
            action: 'open',
            merchant_id: urlParam.merchantID,
            outlet_id: urlParam.outletID,
            category_id: 0,
            categories: '',
            categories_analytics: '',
            location_id: this.state.location_id,
            changeSequenceNumber: true,
          };
          this.makeCustomAnalyticsStack(stackData);
        }
      );
    } catch (error) {
      console.log('position error: ', error.message);
      //fixed bug https://entertainerproducts.atlassian.net/browse/NH-1400
      this.setState(
        {
          position: {
            lat: 0,
            lng: 0,
          },
          location_id: this.props.location.id,
          locationName: this.props.location.name,
          userId: this.props.userInfo.userId,
          currency: this.props.userInfo.currency,
          sessionJwt: this.props.token,
        },
        () => {
          //fetching merchant details from live server
          this.getMerchant(urlParam.merchantID, urlParam.outletID, this.props.merchantData.favourite);
        }
      );
    }

    setTimeout(() => {
      this.checkDemographic('pre_redemption');
    }, 1000);
  }

  handleOnOfferSelected = (data: any) => {
    
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          selectedOffer: data,
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  };
  handleOnShowRedemptionSuccessModal = () => {
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          showRedemptionSuccessModal: true,
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  };

  onClickWebView = async (title: any, url: any) => {
    console.log(url, title, 'url,title');

    try {
      const chat_flag = !this.props.appConfig.is_live_chat_enabled;
      console.log('chat_flag: ', chat_flag);
      // // ?no_chat=false
      url = url + '?no_chat=' + chat_flag;
      // //console.log('url: ', url);
      //       this.setState({
      //         adaptor: {
      //           data: {
      //             ...this.state.adaptor.data,
      //             externalWebPage: {
      //               externalURL: url ? url : '',
      //               headerText: title ? title : '',
      //               getHTMLapi: getHTMLapi,
      //               showExternalWebPage: url && title,
      //             },
      //           },
      //           CallBacks: this.state.adaptor.CallBacks,
      //         },
      //       });
    } catch (error) {
      console.log('error web url: ', error.message);
    }
  };
  getcurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      } else {
        console.log("can't get location");
        reject("can't get location");
      }
    });
  };
  onSelectedOutletChangehandler = (data: any) => {
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          selectedOutlet: data,
        },
        CallBacks: { ...this.state.adaptor.CallBacks },
      },
    });
  };

  backHandler() {
    //analytics
    const stackData = {
      current_screen: 'Merchant Detail',
      action: 'click_back',
      category_id: 0,
      categories: '',
      categories_analytics: '',
      location_id: this.state.location_id,
      changeSequenceNumber: false,
    };
    this.makeCustomAnalyticsStack(stackData);

    const exposeData = {
      type: 'back',
      data: {},
    };
    this.props.exposeFunction && this.props.exposeFunction(exposeData);
  }

  handleRefreshMerchant = async () => {
    console.log('refreshMerchant');
    this.activeLoader(true);

    const {merchantData} = this.props

      //console.log(merchantData, 'merchantData');
      const { merchantId, outletId, favourite } = merchantData;

    let urlParam = {
      merchantID: merchantId,
      outletID: outletId,
      favourite: favourite,
    };



    if (this.props.location && this.props.location.search) {
      // urlParam = qs.parse(this.props.location.search, {
      //   ignoreQueryPrefix: true,
      // });

      // position = await this.getMyLocation();
      // for current position of user
      try {
        const position =  this.props.currentUserLocation
        const { latitude, longitude } = position.coords;

        this.setState(
          {
            position: {
              lat: latitude,
              lng: longitude,
            },
          },
          () => {
            //fetching merchant details from live server
            this.getMerchant(urlParam.merchantID, urlParam.outletID, urlParam.favourite);
          }
        );
      } catch (error) {
        console.log('position error: ', error.message);

        this.setState(
          {
            position: {
              lat: 0,
              lng: 0,
            },
          },
          () => {
            //fetching merchant details from live server
            this.getMerchant(urlParam.merchantID, urlParam.outletID, urlParam.favourite);
          }
        );
      }
    }

    if (!urlParam.outletID) {
      urlParam['outletID'] = 0;
    }

    //fetching merchant details from live server
    this.getMerchant(
      this.state.adaptor.data.merchant.id,
      this.state.adaptor.data.selectedOutlet.id,
      urlParam.favourite
    );

    //this is done due to refreshing user data after success full redemptions
    const token = this.state.sessionJwt;
    const currency = this.state.currency;
    const language = isRTL ? 'ar' : 'en';

    const userProfile = await UserProfileBL.userProfile(token, language, currency); //TODO: user profile takes langauge and currency

    //EventRegister.emit('updateProfile', userProfile); //auto update user profile //removed due to redux
    this.props.onSetUser(userProfile)
  };

  activeLoader(flag: boolean): void {
    // this.setState({
    //   adaptor: {
    //     data: {
    //       ...this.state.adaptor.data,
    //       loadingOverlayActive: flag,
    //     },
    //     CallBacks: this.state.adaptor.CallBacks,
    //   },
    // });
  }

  redeemOffer = async (data: any) => {
    try {
      this.activeLoader(true);
      var that = this;

      const paramData: redemptionDataParams = {
        offer_id: data.offer_id,
        outlet_id: data.outlet_id,
        merchant_pin: data.merchant_pin,
        product_id: data.product_id,
        currency: this.state.currency,
        language: 'en',
      };

      const stackData = {
        current_screen: 'Redemption Card',
        action: 'click_redeem',
        merchant_id: this.state.adaptor.data.merchant.id,
        outlet_id: paramData.outlet_id,
        category_id: 0,
        categories: '',
        categories_analytics: '',
        location_id: 0,
        offer_id: paramData.offer_id,
        changeSequenceNumber: false,
      };
      this.makeCustomAnalyticsStack(stackData);

      const redemptionResponse = await MerchantBL.getRemption(
        this.state.sessionJwt,
        paramData
      );

      setTimeout(() => {
        this.setState(
          {
            adaptor: {
              data: {
                ...that.state.adaptor.data,
                redemptionResponse: redemptionResponse,
                showRedemptionModal: false,
              },
              CallBacks: that.state.adaptor.CallBacks,
            },
          },
          function () {
            that.activeLoader(false);
            console.log('redemptionDataParams', redemptionResponse);
            const stackData = {
              current_screen: 'Redemption Card',
              action: 'redeemption_success_card',
              merchant_id: this.state.adaptor.data.merchant.id,
              outlet_id: paramData.outlet_id,
              category_id: 0,
              categories: '',
              categories_analytics: '',
              location_id: 0,
              offer_id: paramData.offer_id,
              changeSequenceNumber: false,
            };
            that.makeCustomAnalyticsStack(stackData);
          }
        );
      }, 100);
      setTimeout(() => {
        this.handleOnShowRedemptionSuccessModal();
        const {
          merchant,
          selectedOutlet,
          selectedOffer,
        } = this.state.adaptor.data;
        const redemptionEventData = {
          MerchantName: merchant.name,
          OutletName: selectedOutlet.name,
          Savings: selectedOffer.selectedOffer.savings_estimate,
          Currency: this.state.currency,
        };
        afterRedemptionEvent(redemptionEventData);
      }, 1000);
    } catch (e) {
      this.activeLoader(false);
      console.log(e);
      setTimeout(() => {
        if (e.message === 'logout') {
          const exposeData = {
            type: 'logout',
            data: null,
          };
          this.props.exposeFunction && this.props.exposeFunction(exposeData);
        } else {
          console.log(e.message);

          const paramData: redemptionDataParams = {
            offer_id: data.offer_id,
            outlet_id: data.outlet_id,
            merchant_pin: data.merchant_pin,
            product_id: data.product_id,
            currency: this.state.currency,
            language: 'en',
          };

          const stackData = {
            current_screen: 'Redemption Card',
            action: 'error_incorrect_pin',
            merchant_id: this.state.adaptor.data.merchant.id,
            outlet_id: paramData.outlet_id,
            category_id: 0,
            categories: '',
            categories_analytics: '',
            location_id: 0,
            offer_id: paramData.offer_id,
            changeSequenceNumber: false,
          };
          this.makeCustomAnalyticsStack(stackData);

          this.ErrorHandler({
            error: true,
            message: e.message,
          });
        }
      }, 100);
    }
  };

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

  merchantAddToFavorites = async (data: any) => {
    try {
      //analytics
      const stackData = {
        current_screen: 'Merchant Detail',
        action: 'click_add_favourite',
        merchant_id: this.state.adaptor.data.merchant.id,
        outlet_id: this.state.adaptor.data.selectedOutlet.id,
        category_id: 0,
        categories: '',
        categories_analytics: '',
        location_id: this.state.location_id,
        changeSequenceNumber: false,
      };
      this.makeCustomAnalyticsStack(stackData);

      const locationName = this.state.locationName;
      const userId = this.state.userId;
      let favouriteList = this.props.favouriteList
      console.log(favouriteList, 'fetched 123');

      if (favouriteList === null || favouriteList === undefined) {
        favouriteList = {};
      } else {
        //favouriteList = {list: favouriteList}
      }

      //checking if use exits in favourite List object or not.....if not.. adding userID into favourite List object
      if (!favouriteList[userId]) {
        favouriteList[userId] = {};
      }

      const userfavouriteList = favouriteList[userId];
      //checking if location is available in favourite List object or not.....if not.. adding location into favourite List object
      if (!userfavouriteList[locationName]) {
        const name = locationName;
        const merchantList = {};

        userfavouriteList[name] = merchantList;
      }

      //list of favourite from specific locaiton
      const list = userfavouriteList[locationName];
      console.log(list, 'addMerchant');
      //checking if it is already added to favourite Merchant object or not....if not.. adding merchantId and merchant into favourite Merchant object
      const merchant = { ...this.state.adaptor.data.merchant };

      if (list[merchant.id] == undefined) {
        list[merchant.id] = {
          merchantName: merchant.name,
          merchantLogo: merchant.logo_small_url,
          attributes: merchant.merchant_attributes,
          outletId: this.state.adaptor.data.selectedOutlet.id,
        };
      }

      //console.log('favouriteList: ', favouriteList);
      //await setItem('favouriteList', JSON.stringify(favouriteList)); //TODO: removed async
      this.props.onSetFavourite(favouriteList)
    } catch (error) {
      console.log(error);
      this.activeLoader(false);

      setTimeout(() => {
        this.ErrorHandler({
          error: true,
          message: error.message,
        });
      });
    }
  };

  merchantRemoveFromFavorites = async (data: any) => {
    try {
      //analytics
      const stackData = {
        current_screen: 'Merchant Detail',
        action: 'click_remove_favourite',
        merchant_id: this.state.adaptor.data.merchant.id,
        outlet_id: this.state.adaptor.data.selectedOutlet.id,
        category_id: 0,
        categories: '',
        categories_analytics: '',
        location_id: 0,
        changeSequenceNumber: false,
      };
      this.makeCustomAnalyticsStack(stackData);

      const locationName = this.state.locationName;
      const userId = this.state.userId;

      let favouriteList = this.props.favouriteList
      //checking if user exits in favourite List object or not.....if not.. return
      if (!favouriteList[userId]) {
        // return
        throw new Error('!favouriteList[userId]: ' + favouriteList[userId]);
      }
      let userFavouriteList = favouriteList[userId];
      //checking if location is available in favourite List object or not.....if not.. return
      if (!userFavouriteList[locationName]) {
        // return
        throw new Error(
          'userFavouriteList[locationName]: ' + userFavouriteList[locationName]
        );
      }

      //merchantList have favourite from specific locaiton
      const merchantList = userFavouriteList[locationName];

      const merchantId = this.state.adaptor.data.merchant.id;
      //checking if merchantID  exits in favourite Merchant object or not....if not.... return satte
      if (!merchantList[merchantId]) {
        // return
        throw new Error(
          'merchantList[merchantId]: ' + merchantList[merchantId]
        );
      }

      delete merchantList[merchantId];

      //checking if merchant list is empty...delete it
      if (Object.keys(merchantList).length === 0) {
        delete userFavouriteList[locationName];
      }

      //await setItem('favouriteList', favouriteList); //TODO: removed due to redux
      this.props.onSetFavourite(favouriteList)
    } catch (e) {
      this.activeLoader(false);
      setTimeout(() => {
        this.ErrorHandler({
          error: true,
          message: e.message,
        });
      });
    }
  };

  setFavHandlerForOutletListing = () => {
      EventRegister.emit('is_refresh_outlet_listing', {
        ...this.props.merchantData,
        favourite:!this.props.merchantData.favourite
      });
  };

  setFavourite = () => {
    console.log('here');
    this.setFavHandlerForOutletListing();
    this.setState(
      {
        adaptor: {
          data: {
            ...this.state.adaptor.data,
            favourite: !this.state.adaptor.data.favourite,
          },
          CallBacks: this.state.adaptor.CallBacks,
        },
      },
      () => {
        if (this.state.adaptor.data.favourite) {
          console.log('fav', this.state.adaptor.data.merchant);
          this.state.adaptor.CallBacks.addFavorite({
            locationName: 'test',
            merchant: this.state.adaptor.data.merchant,
          });
        } else {
          console.log('fav', this.state.adaptor.data.merchant);
          this.state.adaptor.CallBacks.removeFavorite({
            locationName: 'test',
            merchantId: this.state.adaptor.data.merchant.id,
          });
        }
      }
    );
  };

  async getMyLocation() {
    return new Promise((resolve) => {
      const location = window.navigator && window.navigator.geolocation;
      location.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        resolve({ lat, lng });
      });
    });
  }

  getMerchant = async (
    merchantID: number,
    outletID: number,
    favourite: boolean
  ) => {
    try {
      const params = {
        location_id: this.state.location_id,
        lat: this.state.position.lat,
        lng: this.state.position.lng,
        currency: this.state.currency,
        language: 'en',
      };

      // console.log(params, merchantID, outletID, 'params');
      // console.log('in get merhcantById', this.state.sessionJwt);
      const merchantData: any = await MerchantBL.getMerchantById(
        this.state.sessionJwt,
        merchantID,
        outletID,
        params
      );

      // console.log(merchantData, 'merchantDATA');
      //console.warn(merchantData, 'hello');
      this.setState(
        {
          adaptor: {
            data: {
              ...this.state.adaptor.data,
              selectedOutlet: merchantData.selectedOutlet
                ? merchantData.selectedOutlet
                : this.state.adaptor.data.selectedOutlet,
              merchant: merchantData.merchant,
              favourite: favourite,
              menu: merchantData.menu,
              website: merchantData.website,
            },
            CallBacks: this.state.adaptor.CallBacks,
          },
        },
        () => {}
      );
      this.activeLoader(false);
    } catch (e) {
      this.activeLoader(false);
      //console.log(e,'asdfasdfasdfs');
      setTimeout(() => {
        this.ErrorHandler({
          error: true,
          message: e.message,
        });
      }, 100);
    }
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: design['--global--primary--BackgroundColor']
            ? design['--global--primary--BackgroundColor']
            : 'transparent',
        }}
      >
        <MerchantScreen
          {...this.state.adaptor}
          checkDemographic={this.checkDemographic}
        />
        <DemographicModal
          isVisible={this.state.isDemographicVisible}
          onCancel={this.onDismissDemographicModalHandler}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  appConfig: selectAppConfigs,
  deviceInfo: selectDeviceInfo,
  userInfo: selectUserInfo,
  token: selectUserToken,
  location: selectLocation,
  merchantData: selectMerchantData,
  currentUserLocation:selectCurrentLocation,
  favouriteList:selectFavouriteList
});


const mapDispatchToProps = (dispatch)=> ({
  onSetAppLoading:(data) => dispatch(setAppLoading(data)),
  onSetUser:(data)=>dispatch(setUser(data)),
  onSetFavourite:(data)=>dispatch(setFavouriteList(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Merchant);
