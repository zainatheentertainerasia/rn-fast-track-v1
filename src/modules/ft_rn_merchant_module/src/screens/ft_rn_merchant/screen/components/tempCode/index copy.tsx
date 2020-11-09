import React from 'react';

//Screen
import Merchant from '../../index';

//Port
import { Port as Contract } from '../../port';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getItem, setItem } from '../../../../../utils';
import * as Location from 'expo-location';
interface Props {}
import MerchantBL from '../../../../../MerchantBL';
interface position {
  lat: number;
  lng: number;
}
interface State {
  adaptor: Contract;
  sessionJwt: string;
  location_id: number;
  locationName: string;
  userId: number;
  position: position;
}

//glocal variables
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJjYmZlNWM1OC1mMjEzLTQ3MGMtYTk5OS0xNmI0YzM5Y2IzZjEiLCJzZXNzaW9uX3Rva2VuIjoiOWM2OTk4NGYtOTE0NC00Mjg3LWEzZmMtZmU1NGYwYjI5MGZiIiwiaWF0IjoxNTg5Nzc5MDE3fQ.tscQX4QbCwf2RI7GSdIQAO9BpZRqEAB5XKBiY6ee7AY';

const location = {
  active: true,
  lat: 25.300579,
  name: 'Dubai & N. Emirates',
  is_careem_enabled: 0,
  flag: 'AE',
  currency: 'AED',
  lng: 55.307709,
  reload_background: false,
  id: 1,
  is_show_category: false,
  background:
    'https://s3-us-west-2.amazonaws.com/product-locations/backgrounds/1.png',
  language: 'ar',
};

class Index extends React.Component<Props, State> {
  watchID: any;
  constructor(props: Props) {
    super(props);

    this.state = {
      adaptor: {
        data: {
          selectedOutlet: {
            neighborhood: 'Sheung Wan',
            mall: '',
            name: 'Sheung Wan',
            id: 62531,
            lat: 22.284794,
            lng: 114.148445,
            human_location: '53 Sai Street',
            distance: 0,
            telephone: '+852 2857 5055',
          },
          favourite: true,
          merchant: {
            id: 35203,
            name: 'Choices',
            description:
              'Dining at Choices is a culinary delight of the highest standard. The open kitchen serves up a superb buffet breakfast, lunch and dinner in addition to an à la carte menu.',
            logo_small_url:
              'https://offerengine.theentertainerme.com/choices-x119968/merchant_primary_logo_%28non-retina%29_-_merchant.png',
            hero_urls: [
              'https://offerengine.theentertainerme.com/choices-x119968/merchant_profile_%22hero%22_image_%28retina%29.png',
              'https://offerengine.theentertainerme.com/choices-x119968/merchant_profile_%22hero%22_image_slide.1_%28retina%29.png',
              'https://offerengine.theentertainerme.com/choices-x119968/merchant_profile_%22hero%22_image_slide.2_%28retina%29.png',
              'https://offerengine.theentertainerme.com/choices-x119968/merchant_profile_%22hero%22_image_slide.3_%28retina%29.png',
              'https://offerengine.theentertainerme.com/choices-x119968/merchant_profile_%22hero%22_image_slide.4_%28retina%29.png',
            ],
            merchant_attributes: [
              {
                section_name: 'Amenities Offered',
                attributes: [
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/alcohol.png',
                    name: 'Alcohol',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/buffet.png',
                    name: 'Buffet',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/cuisine.png',
                    name: 'Cuisine: International',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/dress_code.png',
                    name: 'Dress Code: Smart Casual',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/halal.png',
                    name: 'Halal',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/kids_welcome.png',
                    name: 'Kids Welcome',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/live_entertainment.png',
                    name: 'Live Entertainment: Outlet Specific',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/outdoor_cooling.png',
                    name: 'Outdoor Cooling: Outlet Specific',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/outdoor_heating.png',
                    name: 'Outdoor Heating',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/outdoor_seating.png',
                    name: 'Outdoor Seating',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/parking.png',
                    name: 'Parking',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/valet_parking.png',
                    name: 'Valet Parking',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/wheelchair_accessible.png',
                    name: 'Wheelchair Accessible',
                  },
                  {
                    image_url:
                      'https://s3-us-west-2.amazonaws.com/merchhant-attribute-icons/wi_fi.png',
                    name: 'Wi-Fi',
                  },
                ],
              },
            ],
            outlets: [
              {
                id: 3845,
                lat: 25.268806,
                lng: 51.554058,
                name: 'Oryx Rotana Doha',
                human_location: 'Al Nahda School Street',
                distance: 0,
              },
            ],
            offers: [
              {
                product_id: 6748,
                section_name: 'Bank Muscat - Asalah 2019 - Qatar',
                offers_to_display: [
                  {
                    offer_id: 751096,
                    name: 'Buffet',
                    details: null,
                    voucher_type_image:
                      'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_types/voucher_type_food_1.png',
                    savings_estimate: 33,
                    redeemability: 2,
                    validity_date: '2019-11-01T12:00:00.916308+00:00',
                    outlet_ids: [3845],
                    sub_detail_label: '',
                    additional_details: [
                      {
                        image: '',
                        title: '',
                        color: 'de595b',
                      },
                    ],
                    voucher_details: [
                      {
                        image:
                          'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_types/voucher_type_food_1.png',
                        title: 'Buy 1 Get 1 Free',
                      },
                      {
                        image:
                          'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_restrictions/voucher_restriction_food_7.png',
                        title: 'food only',
                      },
                      {
                        image:
                          'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_restrictions/voucher_restriction_food_7.png',
                        title: 'Not Valid on Delivery',
                      },
                    ],
                  },
                  {
                    offer_id: 751097,
                    name: 'Buffet',
                    details: null,
                    voucher_type_image:
                      'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_types/voucher_type_food_1.png',
                    savings_estimate: 33,
                    redeemability: 2,
                    validity_date: '2019-11-01T12:00:00.916308+00:00',
                    outlet_ids: [3845],
                    sub_detail_label: '',
                    additional_details: [
                      {
                        image: '',
                        title: '',
                        color: 'de595b',
                      },
                    ],
                    voucher_details: [
                      {
                        image:
                          'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_types/voucher_type_food_1.png',
                        title: 'Buy 1 Get 1 Free',
                      },
                      {
                        image:
                          'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_restrictions/voucher_restriction_food_7.png',
                        title: 'food only',
                      },
                    ],
                  },
                  {
                    offer_id: 751098,
                    name: 'Buffet',
                    details: null,
                    voucher_type_image:
                      'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_types/voucher_type_food_1.png',
                    savings_estimate: 33,
                    redeemability: 2,
                    validity_date: '2019-11-01T12:00:00.916308+00:00',
                    outlet_ids: [3845],
                    sub_detail_label: '',
                    additional_details: [
                      {
                        image: '',
                        title: '',
                        color: 'de595b',
                      },
                    ],
                    voucher_details: [
                      {
                        image:
                          'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_types/voucher_type_food_1.png',
                        title: 'Buy 1 Get 1 Free',
                      },
                      {
                        image:
                          'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_restrictions/voucher_restriction_food_7.png',
                        title: 'food only',
                      },
                      {
                        image:
                          'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_restrictions/voucher_restriction_food_7.png',
                        title: 'Not Valid on Delivery',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          redemptionResponse: null,
          loadingOverlayActive: false,
          errorText: '',
          error: false,
          externalWebPage: {
            showExternalWebPage: true,
            headerText: 'hello',
            externalURL: 'hello',
            getHTMLapi: () => {},
          },
        },
        CallBacks: {
          onError: (data) => {
            this.ErrorHandler(data);
          },
          setFavourite: () => {
            //this.setFavourite();
          },
          addFavorite: (data) => {
            //this.merchantAddToFavorites(data);
          },
          removeFavorite: (data) => {
            //this.merchantRemoveFromFavorites(data);
          },
          redeemOffer: (data) => {
            this.redeemOffer(data);
          },
          activeLoader: (flag) => {
            //this.activeLoader(flag);
          },
          refreshMerchant: () => {
            //this.handleRefreshMerchant();
          },
          onBack: () => {
            //this.backHandler();
          },
          onSelectedOutletChange: (data) => {
            this.onSelectedOutletChangehandler(data);
          },
          onClickWebView: this.onClickWebView,
        },
      },
      sessionJwt: '',
      location_id: 0,
      locationName: '',
      userId: 0,
      position: { lat: 0, lng: 0 },
    };

    MerchantBL.init({
      mode: 'real',
      merchantServiceUrl:
        'https://apiutb2bmrhsrvrpy.theentertainerme.com/api_ets/v2/merchants/',
      redemptionServiceUrl:
        'https://apiutb2brdmsrvrpy.theentertainerme.com/api_ets/v2/',
    });

    this.watchID = null;
  }

  onClickWebView = async (title: any, url: any) => {
    console.log(url, title, 'url,title');

    // try {
    //   let appConfigs = await getItem('AppConfigs');
    //   console.log('appConfigs: ', appConfigs);
    //   const chat_flag = !appConfigs.is_live_chat_enabled;
    //   console.log('chat_flag: ', chat_flag);
    //   // ?no_chat=false
    //   url = url + '?no_chat=' + chat_flag;
    //   console.log('url: ', url);
    //   this.setState({
    //     adaptor: {
    //       data: {
    //         ...this.state.adaptor.data,
    //         externalWebPage: {
    //           externalURL: url ? url : '',
    //           headerText: title ? title : '',
    //           getHTMLapi: getHTMLapi,
    //           showExternalWebPage: url && title,
    //         },
    //       },
    //       CallBacks: this.state.adaptor.CallBacks,
    //     },
    //   });
    // } catch (error) {
    //   console.log('error web url: ', error.message);
    // }
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  async componentDidMount() {
    //TODO: if module then take module values and if template then take template values
    console.log('I am in componentDidMount');

    this.activeLoader(true);
    // const token = asyncObject[0][1];
    // const location = JSON.parse(asyncObject[1][1]);
    // const user = JSON.parse(asyncObject[2][1]);

    this.setState({
      location_id: location.id,
      locationName: location.name,
      //userId: user.userId,
      sessionJwt: token,
    });

    let urlParam = {
      merchantID: 35680,
      outletID: 60655,
      favourite: 'false',
    };

    let position = await this.getMyLocation();

    //for current position of user
    try {
      this.setState(
        {
          position: {
            lat: position.lat,
            lng: position.lng,
          },
        },
        () => {
          //fetching merchant details from live server
          this.getMerchant(urlParam.merchantID, urlParam.outletID, false);
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
          this.getMerchant(urlParam.merchantID, urlParam.outletID, false);
        }
      );
    }
  }

  // getcurrentPosition = (options = {}) => {
  //   return new Promise((resolve, reject) => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(resolve, reject, options);
  //     } else {
  //       console.log("can't get location");
  //       reject("can't get location");
  //     }
  //   });
  // };
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
    // const exposeData = {
    //   type: 'back',
    //   data: {},
    // };
    // this.props.exposeFunction && this.props.exposeFunction(exposeData);
  }

  handleRefreshMerchant = async () => {
    //   this.activeLoader(true);
    //   let urlParam = {
    //     merchantID: 0,
    //     outletID: 0,
    //     favourite: 'false',
    //   };
    //   let position = null;
    //   let fav = false;
    //   if (this.props.location && this.props.location.search) {
    //     urlParam = qs.parse(this.props.location.search, {
    //       ignoreQueryPrefix: true,
    //     });
    //     if (urlParam.favourite === 'true') {
    //       fav = true;
    //     }
    //     // position = await this.getMyLocation();
    //     // for current position of user
    //     try {
    //       const position: any = await this.getcurrentPosition();
    //       const { latitude, longitude } = position.coords;
    //       this.setState(
    //         {
    //           position: {
    //             lat: latitude,
    //             lng: longitude,
    //           },
    //         },
    //         () => {
    //           //fetching merchant details from live server
    //           this.getMerchant(urlParam.merchantID, urlParam.outletID, fav);
    //         }
    //       );
    //     } catch (error) {
    //       console.log('position error: ', error.message);
    //       this.setState(
    //         {
    //           position: {
    //             lat: 0,
    //             lng: 0,
    //           },
    //         },
    //         () => {
    //           //fetching merchant details from live server
    //           this.getMerchant(urlParam.merchantID, urlParam.outletID, fav);
    //         }
    //       );
    //     }
    //   }
    //   if (!urlParam.outletID) {
    //     urlParam['outletID'] = 0;
    //   }
    //   //fetching merchant details from live server
    //   this.getMerchant(
    //     this.state.adaptor.data.merchant.id,
    //     this.state.adaptor.data.selectedOutlet.id,
    //     fav
    //   );
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

  redeemOffer = async (data: any) => {
    console.log('redeemOffer');
    //this.activeLoader(true);
    // try {
    //   this.activeLoader(true);
    //   var that = this;
    //   interface redemptionDataParams {
    //     offer_id: number;
    //     outlet_id: number;
    //     merchant_pin: number;
    //     product_id: number;
    //   }
    //   const paramData: redemptionDataParams = {
    //     offer_id: data.offer_id,
    //     outlet_id: data.outlet_id,
    //     merchant_pin: data.merchant_pin,
    //     product_id: data.product_id,
    //   };
    //   const redemptionResponse = await MerchantBL.getRemption(
    //     this.state.sessionJwt,
    //     paramData
    //   );
    //   setTimeout(() => {
    //     this.setState(
    //       {
    //         adaptor: {
    //           data: {
    //             ...that.state.adaptor.data,
    //             redemptionResponse: redemptionResponse,
    //           },
    //           CallBacks: that.state.adaptor.CallBacks,
    //         },
    //       },
    //       function () {
    //         that.activeLoader(false);
    //       }
    //     );
    //   }, 1000);
    // } catch (e) {
    //   this.activeLoader(false);
    //   setTimeout(() => {
    //     if (e.message === 'logout') {
    //       const exposeData = {
    //         type: 'logout',
    //         data: null,
    //       };
    //       this.props.exposeFunction && this.props.exposeFunction(exposeData);
    //     } else {
    //       this.ErrorHandler({
    //         error: true,
    //         message: e.message,
    //       });
    //     }
    //   }, 100);
    // }
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
    // try {
    //   const locationName = this.state.locationName;
    //   const userId = this.state.userId;
    //   let favouriteList = await getItem('favouriteList');
    //   if (favouriteList === null || favouriteList === undefined) {
    //     favouriteList = {};
    //   } else {
    //     favouriteList = JSON.parse(favouriteList);
    //   }
    //   //checking if use exits in favourite List object or not.....if not.. adding userID into favourite List object
    //   if (!favouriteList[userId]) {
    //     favouriteList[userId] = {};
    //   }
    //   const userfavouriteList = favouriteList[userId];
    //   //checking if location is available in favourite List object or not.....if not.. adding location into favourite List object
    //   if (!userfavouriteList[locationName]) {
    //     const name = locationName;
    //     const merchantList = {};
    //     userfavouriteList[name] = merchantList;
    //   }
    //   //list of favourite from specific locaiton
    //   const list = userfavouriteList[locationName];
    //   //checking if it is already added to favourite Merchant object or not....if not.. adding merchantId and merchant into favourite Merchant object
    //   const merchant = { ...this.state.adaptor.data.merchant };
    //   if (list[merchant.id] == undefined) {
    //     list[merchant.id] = {
    //       merchantName: merchant.name,
    //       merchantLogo: merchant.logo_small_url,
    //       attributes: merchant.merchant_attributes,
    //       outletId: this.state.adaptor.data.selectedOutlet.id,
    //     };
    //   }
    //   console.log('favouriteList: ', favouriteList);
    //   await setItem('favouriteList', JSON.stringify(favouriteList));
    // } catch (error) {
    //   this.activeLoader(false);
    //   setTimeout(() => {
    //     this.ErrorHandler({
    //       error: true,
    //       message: error.message,
    //     });
    //   });
    // }
  };

  merchantRemoveFromFavorites = async (data: any) => {
    try {
      const locationName = this.state.locationName;
      const userId = this.state.userId;

      let favouriteList = await getItem('favouriteList');
      favouriteList = JSON.parse(favouriteList);
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

      await setItem('favouriteList', JSON.stringify(favouriteList));
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

  fetchParamsAndLocation = () => {};

  setFavourite = () => {
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
          this.state.adaptor.CallBacks.addFavorite({
            locationName: 'test',
            merchant: this.state.adaptor.data.merchant,
          });
        } else {
          this.state.adaptor.CallBacks.removeFavorite({
            locationName: 'test',
            merchantId: this.state.adaptor.data.merchant.id,
          });
        }
      }
    );
  };

  async getMyLocation() {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
    }
    let location = await Location.getCurrentPositionAsync({});
    return new Promise((resolve) => {
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;
      resolve({ lat, lng });
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
      };

      const merchantData: any = await MerchantBL.getMerchantById(
        this.state.sessionJwt,
        merchantID,
        outletID,
        params
      );
      console.log(merchantData, 'I am here');
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
            },
            CallBacks: this.state.adaptor.CallBacks,
          },
        },
        () => {}
      );
      this.activeLoader(false);
    } catch (e) {
      console.log(e);
      this.activeLoader(false);

      setTimeout(() => {
        this.ErrorHandler({
          error: true,
          message: e.message,
        });
      });
    }
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Merchant {...this.state.adaptor} />
      </SafeAreaView>
    );
  }
}

export default Index;
