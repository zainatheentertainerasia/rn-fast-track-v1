import React from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  Alert,
  BackHandler,
  StatusBar
} from 'react-native';
import { Port as port } from './port';
const AnimatedImageBackground=Animated.createAnimatedComponent(Image);
import Header from './components/header';
import Locations from './components/locations';
import offerIcon from './images/offer-icon1.png';
import homeTotalOfferIcon from './images/home_total_offers.png';
import i18n, {withTransation} from './utils/localization/I18n';
import { isRTL, currentLanguage } from './../screen/utils/localization/I18n';

import {FastTrackLibs, CustomComponents, design} from 'rn_fast_track_uilib';
import { EventRegister } from "react-native-event-listeners";
import HomeBL from '../../../BL/HomeBL';
const {Swiper, AntDesign} = FastTrackLibs;
const {
    CustomText,
    CustomBottomSheet,
    ScreenIntro,
    CustomCarousel,
    CustomCategoryHome,
} = CustomComponents;
import ParallaxScrollView from './components/parallex';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {setAppLoading,setErrorObject} from '../../../../../../redux/appReducer/app.actions';
import { selectExposeFunction,selectAppConfigs, selectSkipMode } from '../../../../../../redux/appReducer/app.selectors';
import { setHomeSection, setHomeCategory } from '../../../../../../redux/home/home.actions';
import {selectHomeSection} from '../../../../../../redux/home/home.selectors';
import { setLocationValues, setLocationList, setHomeSelectedLocation, setUserCurrentLocation } from '../../../../../../redux/location/location.actions';
import {selectLocationReducer} from '../../../../../../redux/location/location.selectors';
import {selectUserToken,selectUserInfo} from '../../../../../../redux/userReducer/user.selectors';
import * as Location from "expo-location";
import {exposeHome} from '../../../../../../registerEvents';
import { defaultLocations } from './defaults';

import {
    makeStackMongo,
    getStackArrayMongo,
    updateSessions,
  } from '../../../utils/horizonAnalytics';

const {width,height}=Dimensions.get("window");
const ParallaxHeight=height*0.45;
export const HEADER_IMAGE_HEIGHT = width / 3;

const goToSettingAlert=async ()=>{
    Alert.alert(
      "No Location Permission",
      "please goto setting and on location permission manual",
      [
        { text: "cancel", onPress: () => console.log("cancel") },
        { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
      ],
      { cancelable: false }
    );
  }
  
  const getUserLocation = async (props) => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        goToSettingAlert();
        return;
      }
      const option = {
        accuracy: Location.Accuracy.Balanced,
        timeout: 4000,
        maximumAge: 0,
      };
      let location = await Location.getCurrentPositionAsync(option);
  
      props.onSetUserCurrentLocation(location);
      // return location;
    } catch (error) {
      // alert("something went wrong with location Permission");
      const location={
        coords:{
          latitude:0,
          longitude:0
        }
      }
      return location;
    }
  };

class HomeScreen extends React.Component<port> {
  swiper = React.createRef();
  locationRef = React.createRef();
  scrollY:any;
  constructor(props) {
    super(props);
    this.state = {
      isShowScreenIntro: false,
      isLoadedData: false,
      isLoctionSelected: false,
      selectedId: '',
      slideIndex: 0,
      //
      showPageContent: false,
      selectedLocation: { name: 'Select a Locaiton' },
      homeSections: [],
      //
      main_cover: null,
      main_cover_messaging_tile: null,
      main_cover_savings_tile: null,
      savings_tile: null,
      categories: null,
      featured_sections: null,
      //
      locationList: defaultLocations, //
        // selectedLocation: null, //
        homeSections: null, //
        currency: 'USD', // 90%
        errorText: '', //
        error: false, //
    };
    this.scrollY = new Animated.Value(0)
  }

  willMountHelper=(nextProps)=>{

    setTimeout(() => {
        console.log(nextProps.locationReducerState.location,"nextProps.data.selectedLocation: nomi nomi",this.props.locationReducerState.location)
       if (nextProps.locationReducerState.location) {
           this.setState(
               {
                   selectedLocation: this.props.locationReducerState.location,
                   showPageContent: true,
               },
               () => {
                   let main_cover = null;
                   let main_cover_messaging_tile = null;
                   let main_cover_savings_tile = null;
                   let savings_tile = null;
                   let categories = null;
                   let featured_sections = null;

                   console.log(this.props.homeSection, 'Home Section');
                   if (this.props.homeSection !== null)
                       this.props.homeSection.map((section) => {
                           if (section.sectionIdentifier === 'main_cover') {
                               main_cover = section.data;
                               console.log(main_cover);
                           } else if (section.sectionIdentifier === 'savings_tile') {
                               savings_tile = section.data;
                           } else if (section.sectionIdentifier === 'categories') {
                               categories = section.data;
                           } else if (section.sectionIdentifier === 'featured_sections') {
                               featured_sections = section.data;
                           }
                       });

                   let isLoadedData = false;
                   main_cover &&
                   main_cover.map((main_cover_item) => {
                       if (main_cover_item.tileIdentifier === 'messaging_tile') {
                           main_cover_messaging_tile = main_cover_item.data;
                       } else if (main_cover_item.tileIdentifier === 'savings_tile') {
                           main_cover_savings_tile = main_cover_item.data;
                           isLoadedData = true;
                       }
                   });
                   this.setState(
                       {
                           main_cover,
                           main_cover_messaging_tile,
                           main_cover_savings_tile,
                           savings_tile,
                           categories,
                           featured_sections,
                           isLoadedData,
                       },
                       () => {
                           console.log(this.state.main_cover_messaging_tile, 'afsdfasdfs');
                       }
                   );
               }
           );
       } else {
           console.log('else part runinng?');
           setTimeout(() => {
               this.setState({isShowScreenIntro: true});
           },400)
           
       }
   }, 200);

  }

    componentWillReceiveProps(nextProps: Readonly<Port>, nextContext: any): void {
        this.willMountHelper(nextProps);
    }

    componentDidMount() {
        try {
            if (window.deeplink) {
                const type = window.deeplink.type;
                if (type === 'locations') {
                    const isDone = window.deeplink.isDone;
                    if (!isDone) {
                        window.deeplink.isDone = true;
                        this.onOpenLocation();
                    }
                }
            }
        } catch (error) {
        }
        // setInterval(() => {
        // this.swiper.current.scrollBy(1)
        // this.setState({slideIndex:1})
        // }, 3000);
        this.willMountHelper(this.props);
    }

    onPressOffershandler = (offer) => {
        console.log(offer, 'offeroffer');
        this.onFeaturedTileClickHandler(offer);
    };

    onPressCategoryHandler = (category) => {
        this.onCategoryClickHandler(category);
        // this.props.navigation.navigate('Outlet')
    };

    onOpenLocation = () => {
        this.refs.bottomSHeet.onOpenBottomSheet();
    };

    onDoneHanlder = () => {
        this.refs.bottomSHeet.onClose();
        const location = this.locationRef.current.getSelectedLocation();
        this.props.onSetHomeSelectedLocation(location);
        // this.setState({selectedLocation: location}, () => {
            this.onLocationChangeHandler(location);
        // });
        setTimeout(() => {
            // this.setState({ isLoadedData: true });
        }, 500);
        // alert(this.state.selectedId)
    };

    onOkayPressHandler = () => {
        this.setState({isShowScreenIntro: false}, () => {
            setTimeout(() => {
                this.refs.bottomSHeet.onOpenBottomSheet();
            }, 100);
        });
    };

    onChangeLocation = (id) => {
        this.setState({selectedId: id, isLoctionSelected: true});
    };

    onPrssRightSwap = () => {
        this.setState({slideIndex: 1});
        this.swiper.current.scrollBy(1);
    };

    onPrssLeftSwap = () => {
        this.swiper.current.scrollBy(-1);
        setTimeout(() => {
            this.setState({slideIndex: 0});
        }, 400);
    };


    // below outlet outer index functions

    checkDemographic=async ()=>{
        try {
          const isDemographicVisible=await isDemographicEnable("home_screen");
          this.setState({isDemographicVisible:isDemographicVisible})
        } catch (error) {
        }
      }
    
      onDismissDemographicModalHandler=()=>{
        this.setState({isDemographicVisible:false})
      }


  componentDidMount() {
    getUserLocation(this.props);
    EventRegister.addEventListener("homerefresh", (data) => {
      if(this.state.selectedLocation)
    this.deeplinkHandler(window.deeplink);
    });
  }

  back_Button_Press = () => {
    // Put your own code here, which you want to exexute on back button press.
    // Alert.alert(
    //   ' Exit From App ',
    //   ' Do you want to exit From App ?',
    //   [
    //     { text: 'Yes', onPress: () => BackHandler.exitApp() },
    //     { text: 'No', onPress: () => console.log('NO Pressed') },
    //   ],
    //   { cancelable: false }
    // );

    if (this.props.navigation.canGoBack()) {
      this.props.navigation.goBack();
    } else {
      BackHandler.exitApp();
    }
    // Return true to enable back button over ride.
    return true;
  };



  async UNSAFE_componentWillMount() {

    try {
      const {locationReducerState}=this.props;
      console.log(locationReducerState,"locationReducerState")
    
      const token = this.props.token;
      let location = locationReducerState.location;
      const homeSections = this.props.homeSection;
      const user = this.props.user;
      const skipMode = this.props.skipMode;
      const configslocationListVersion = this.props.AppConfigs.locations;
      const LocationListVersion = locationReducerState.LocationListVersion;
      const LocationList = locationReducerState.LocationList;



      console.log(skipMode, 'skipMode');
      console.log(token, 'token,oka');
      // const token=this.state.sessionJwt;
      // const location=null;
      // const homeSections=[];

      //analytics
      const locationID = location === null ? 0 : location.id;

      if(skipMode === true ){
        location = {name: 'Select a Locaiton'}
      }
      console.log('locationListVersion: ', homeSections);
      console.log('location_id', locationID);
      //added check due to user was null
      if(user){
        updateSessions(user.userId, locationID);
      }
      //   let sessionsData = await getSessions();
      //   console.log(sessionsData);

      console.log('in componentDidMount');
      this.makeAnalyticsStack('Home', 'open', '', '', '', locationID, true);
      this.props.onSetLocationValues({LocationList:LocationList ? LocationList: defaultLocations,location: skipMode === true ? null : location})
      this.props.onSetHomeSection(homeSections)
      this.setState({},async ()=>{
        console.log("update State: ",this.state)
        try{
             if(configslocationListVersion !== LocationListVersion){
                const result = await HomeBL.getLocationList(token,currentLanguage())
                this.props.onSetLocationValues({LocationList:result.locationList,LocationListVersion:result.version})
                /**
                 * todo: remove below two lines
                 */
                // await setItem('LocationList', result.locationList);
                // await setItem('LocationListVersion', result.version+"");
                this.setState({
                  adaptor: {
                    data: {
                      
                      locationList: result.locationList
                    },
                  },
                },()=>{
                })
                // this.props.onSetLocationList({
                //     locationList : result.locationList,
                //     locationListVersion: result.version
                // })


            }
        }catch (e) {
            console.log(e,"resultresult nomi nomi error")
        }
      });
      console.log('async storage token: ', token);
      console.log('async storage location: ', location);
      console.log('async storage homeSection: ', homeSections);

      //bug fix https://entertainerproducts.atlassian.net/browse/NH-1310
      if (
        location
      ) {
        console.log('in if statement')
        if(location.name!=="Select a Locaiton")
        this.onLocationChangeHandler(location);
      }else {
        console.log('in else statement')
      }

      //bug fix https://entertainerproducts.atlassian.net/browse/NH-1277
      BackHandler.addEventListener('hardwareBackPress', this.back_Button_Press);
    } catch (e) {
      const data = {
        error: true,
        message: e.message,
      };
      this.ErrorHandler(data);
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.back_Button_Press
    );
  }

  activeLoader(flag: boolean): void {
    this.props.onSetAppLoading(flag)
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

  onSearchClickHandler = () => {
    console.log('search clicked');

    //analytics
    let stateLocation =
      this.state.selectedLocation === null
        ? { id: 0 }
        : this.state.selectedLocation;

    this.makeAnalyticsStack(
      'Home',
      'click_Search',
      '',
      '',
      '',
      stateLocation.id,
      false
    );

    const exposeData = {
      type: 'onSearchClicked',
      data: {},
    };
    exposeHome(exposeData);
  };

   onLocationChangeHandler(location: any) {
    console.log('location: ', location);

    //analytics
    let stateLocation =
      this.state.selectedLocation === null
        ? { id: 0 }
        : this.state.selectedLocation;

    const stackData = {
      current_screen: 'Home',
      action: 'select_location',
      category_id: '',
      categories: '',
      categories_analytics: '',
      location_id: stateLocation.id,
      changeSequenceNumber: false,
    };
    this.makeCustomAnalyticsStack(stackData);

    this.setSelectedLocation(location);
    const exposeData = {
      type: 'locationChange',
      data: location,
    };
    exposeHome(exposeData);

    /**
     * todo remove this live
     */
    // setTimeout(async () => {
      
    //   // if(position)
    //   // await setItem('position', position);
    // }, 1000);
    
  }

  onCategoryClickHandler = async (category: any) => {
    this.props.onSetHomeCategory(category);
    /**
     * todo remove below line
     */
    // await setItem('category', category);

    const exposeData = {
      type: 'onCategoryClicked',
      data: category,
    };

    exposeHome(exposeData);
    
    //analytics
    let stateLocation =
      this.state.selectedLocation === null
        ? { id: 0 }
        : this.state.selectedLocation;

    const stackData = {
      current_screen: 'Home',
      action: 'select_category',
      category_id: category.category_id + '',
      categories: category.displayName,
      categories_analytics: category.analytics_category_name,
      location_id: stateLocation.id,
      changeSequenceNumber: false,
    };
    this.makeCustomAnalyticsStack(stackData);


  };

  onFeaturedTileClickHandler = (featured: any) => {
    console.log('featured: ', featured);

    //analytics
    let stateLocation =
      this.state.selectedLocation === null
        ? { id: 0 }
        : this.state.selectedLocation;

    const stackData = {
      current_screen: 'Home',
      action: 'click_feautured',
      category_id: '',
      categories: '',
      categories_analytics: '',
      entity_id: featured.entity_id,
      location_id: stateLocation.id,
      changeSequenceNumber: false,
    };
    this.makeCustomAnalyticsStack(stackData);

    const exposeData = {
      type: 'onFeaturedTileClicked',
      data: featured,
    };
    exposeHome(exposeData);
  };

  setSelectedLocation(location: any) {
    console.log('set location: ', location);
    this.setState(
      {
        adaptor: {
          data: {
            
            selectedLocation: location,
          },
        },
      },
      async () => {
        this.props.onSetHomeSelectedLocation(location);
        /**
         * todo remove this line and check selectedLocation
         */
        // await setItem('location', location ? JSON.stringify(location):null);
        this.invokeHomeApi(location.id);
      }
    );
  }

  invokeHomeApi = async (id) => {

    this.activeLoader(true);
    try {
      const token = this.props.token || this.state.sessionJwt;
      const skipMode = this.props.skipMode;

      let okayToken = '';
      if (skipMode) {
        okayToken = this.state.sessionJwt;
      } else {
        okayToken = token;

      }
      const HomeResult = await HomeBL.homeSections({
        token: okayToken,
        currency: 'USD',
        locationID: id,
        language: isRTL ? 'ar' : 'en',
      });

      console.log('HomeResult: ', HomeResult);
      this.props.onSetHomeSection(HomeResult)
      /*
      Todo: remove line
      */
      // await setItem('homeSection', HomeResult);
      this.activeLoader(false);
      setTimeout(() => {
      this.checkDemographic()
      }, 100);
    } catch (e) {
      console.log('error test: HomeResult ', e.message);
      this.activeLoader(false);

      setTimeout(() => {
        this.ErrorHandler({
          error: true,
          message: e.message,
        });
      }, 100);
      console.log('error: ', e.message);
    }
  };

  ErrorHandler = (data: any) => {
    const { error, message } = data;
    const errorObj={
      status:error,
      message
    }
    this.props.onSetErrorObject(errorObj)
  };



    render() {
        console.log('selected',this.state)
        const {
            isShowScreenIntro,
            isLoadedData,
            isLoctionSelected,
            slideIndex,
            //
            main_cover_messaging_tile,
            main_cover_savings_tile,
            categories,
            featured_sections,
            selectedId,
        } = this.state;
        console.log('selected',isShowScreenIntro)
        let rand = 0;
        if (main_cover_messaging_tile) {
            let max = main_cover_messaging_tile.messages.length;
            let min = 0;
            rand = Math.floor(Math.random() * (max - min)) + min;
        }

        return (
            <View
                style={{flex: 1}}
                onTouchStart={() => {
                    this.refs.bottomSHeet.onClose();
                }}
            >
                <SafeAreaView
                    // forceInset={{ bottom: "never" }}
                    style={{
                        flex: 1,
                        backgroundColor: design['--global--primary--BackgroundColor'] ? design['--global--primary--BackgroundColor'] : "#FFFFFF",
                        paddingTop: Platform.OS === 'android' ? 30 : 0,
                        paddingBottom: -100,
                    }}
                >
                    <View style={{backgroundColor: "#FFFFFF", flex: 1}}>
                        <View style={{
                            zIndex: 5,
                            marginBottom: 5,
                            backgroundColor: design['--global--primary--BackgroundColor'] ? design['--global--primary--BackgroundColor'] : "#FFFFFF"
                        }}>
                            <Header
                                selectedLocation={this.state.selectedLocation}
                                onOpenLocation={this.onOpenLocation}
                                isShowScreenIntro={isShowScreenIntro}
                                onSearchPress={this.onSearchClickHandler}
                            />
                        </View>

          {!isShowScreenIntro && isLoadedData && (
            <View
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                flexDirection: 'column',
              }}
            >
              <ParallaxScrollView
                scrollEvent={(e)=>{
                  this.scrollY.setValue(e.nativeEvent.contentOffset.y)
                  console.log(e.nativeEvent.contentOffset.y)
                }}
                outputScaleValue={2}
                stickyHeaderHeight={300}
                backgroundColor='#FFFFFF'
                parallaxHeaderHeight={ParallaxHeight}
                renderForeground={() => (
                  <View style={{ height: ParallaxHeight }}>
                    <Swiper
                      ref={this.swiper}
                      // scrollEnabled={true}
                      showsPagination={false}
                      // showsButtons={true}
                      // index={this.state.slideIndex}
                      // loop={true}
                    >
                      <View style={styles.slide}>
                        <AnimatedImageBackground
                          style={[styles.parallexBackgroundImage,{
                            height:this.scrollY.interpolate({
                              inputRange: [-ParallaxHeight, 0],
                              outputRange: [ParallaxHeight*2, ParallaxHeight],
                              extrapolateLeft:"extend",
                              extrapolateRight:"clamp"
                            }),
                            // width:this.scrollY.interpolate({
                            //   inputRange: [-100, 0],
                            //   outputRange: [width+100, width],
                            //   // extrapolateLeft: 'clamp',
                            //   extrapolate:"extend"
                            // })
                            transform: [
                              // s
                              // {
                              //   scale: this.scrollY.interpolate({
                              //     inputRange: [-ParallaxHeight/2, 0],
                              //     outputRange: [1.5,1],
                              //     extrapolate: 'clamp'
                              //   })
                              // }
                            ]
                          }]}
                          source={{
                            uri: main_cover_messaging_tile.mainTopImage,
                            cache:"force-cache"
                          }}
                        ></AnimatedImageBackground>

                    <View style={styles.rectangle}>
                      <View style={{ flex: 1 }} />

                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <CustomText style={{ width: 269, color: '#000000' }}>
                          {main_cover_messaging_tile.messages[rand]}
                        </CustomText>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          marginRight: 10,
                        }}
                      >
                        <TouchableOpacity onPress={this.onPrssRightSwap}>
                          <View style={{ padding: 5 }}>
                            <AntDesign name='right' size={15} color='#FFFFFF' />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                      </View>
                      
                      <View style={{ flex: 1, backgroundColor: '#EBECED',justifyContent:"flex-end" }}>
                          
                        <View
                          style={{
                            // flex: 1,
                            borderBottomWidth: 1,
                            borderBottomColor: '#CCCCCC',
                            justifyContent:"center",
                          }}
                        >
                          <Animated.View
                            style={[

                              { borderBottomWidth: 0,
                                justifyContent:"center",
                                height:this.scrollY.interpolate({
                                  inputRange: [-ParallaxHeight, 0],
                                  outputRange: [ParallaxHeight, ParallaxHeight/2],
                                  extrapolate:"clamp"
                                })
                              },
                            ]}
                          >
                             <View
                                style={[
                                    styles.savedWrapper,
                                    {borderBottomWidth: 0},
                                ]}
                            >
                                <Image
                                    source={offerIcon}
                                    style={{height: 80, width: 80}}
                                    resizeMode="contain"
                                />
                                <View style={{alignItems:"center"}}>
                                    <CustomText style={{fontSize: 30, padding: 9}}>
                                        {main_cover_savings_tile.savingThisYear}
                                    </CustomText>
                                    <CustomText>
                                        {i18n.t('SAVED_THIS_YEAR')}
                                    </CustomText>
                                </View>
                            </View>
                          </Animated.View>


                        </View>
                        

                        <Animated.View style={[styles.savedWrapper,{
                          height:this.scrollY.interpolate({
                            inputRange: [-ParallaxHeight, 0],
                            outputRange: [ParallaxHeight, ParallaxHeight/2],
                          }),
                        }]}>
                            <View style={{position:"absolute",top:-12,left:5}}>
                             <TouchableOpacity onPress={this.onPrssLeftSwap}>
                                <View style={{padding: 5}}>
                                    <AntDesign name='left' size={15} color='#000'/>
                                </View>
                            </TouchableOpacity>
                            </View>
                         <Image
                            source={homeTotalOfferIcon}
                            style={{height: 80, width: 80}}
                            resizeMode="contain"
                        />
                        <View style={{alignItems:"center"}}>
                            <CustomText style={{fontSize: 30, padding: 9}}>
                                {main_cover_savings_tile.offersUsed}
                            </CustomText>
                            <CustomText>{i18n.t('OFFERS_USED_SO_FAR')}</CustomText>
                        </View>
                        </Animated.View>

                      </View>
                    </Swiper>
                  </View>
                )}
                fadeOutForeground={false}
                renderForegroundd={() =>
                  this.state.slideIndex === 0 ? (
                    <View style={styles.rectangle}>
                      <View style={{ flex: 1 }} />

                                                <View
                                                    style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <CustomText style={{width: 269, color: '#ffffff'}}>
                                                        {main_cover_messaging_tile.messages[rand]}
                                                    </CustomText>
                                                </View>

                                                <View
                                                    style={{
                                                        flex: 1,
                                                        alignItems: 'flex-end',
                                                        marginRight: 10,
                                                    }}
                                                >
                                                    <TouchableOpacity onPress={this.onPrssRightSwap}>
                                                        <View style={{padding: 5}}>
                                                            <AntDesign name='right' size={15} color='#FFFFFF'/>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ) : (
                                            <View
                                                style={[
                                                    styles.rectangle,
                                                    {backgroundColor: 'transparent', height: 150},
                                                ]}
                                            >
                                                <View
                                                    style={{
                                                        flex: 6,
                                                    }}
                                                >
                                                    <TouchableOpacity onPress={this.onPrssLeftSwap}>
                                                        <View style={{padding: 5}}>
                                                            <AntDesign name='left' size={15} color='#000'/>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }
                                >
                                    <View
                                        style={{
                                            backgroundColor: design['--global--secondary--BackgroundColor'] ? design['--global--secondary--BackgroundColor'] : "#FFFFFF"}}>
                                        <View style={{justifyContent:"center",alignItems:"center"}}>
                                        <View style={styles.category}>
                                            {categories.map((categoriesItem) => (
                                                <CustomCategoryHome
                                                    category={categoriesItem}
                                                    onPress={this.onPressCategoryHandler}
                                                />
                                            ))}
                                        </View>
                                        </View>

                                        {
                                            (featured_sections && featured_sections.length !== 0) ?
                                                <>
                                                    <View style={styles.offers}>
                                                        <CustomText style={styles.offersText}>
                                                            {i18n.t('FEATURED')}
                                                        </CustomText>
                                                    </View>
                                                    <View style={{height: 191, backgroundColor: '#FFFFFF'}}>
                                                        <CustomCarousel
                                                            carouselItems={featured_sections}
                                                            onPress={this.onPressOffershandler}
                                                        />
                                                    </View>
                                                </>
                                                :
                                                null
                                        }

                                    </View>
                                </ParallaxScrollView>
                            </View>
                        )}

                        {isShowScreenIntro && (
                            <ScreenIntro
                                onPress={this.onOkayPressHandler}
                                i18n={i18n}
                                visible={isShowScreenIntro}
                            />
                        )}
                    </View>
                </SafeAreaView>
                {console.log(this.state.selectedLocation.name, 'nnnnnnn')}
                <CustomBottomSheet
                    initialSnap={0}
                    snapPoints={[0, '45%']}
                    renderHeader={() => {
                        return (
                            <View style={styles.doneBtnWrapper}>
                                {(this.state.selectedLocation.name !== 'Select a Locaiton' ||
                                    selectedId !== '') && (
                                    <TouchableOpacity onPress={this.onDoneHanlder}>
                                        <View style={styles.doneBtn}>
                                            <CustomText style={{color: '#FFFFFF', fontSize: 10}}>
                                                {i18n.t('DONE')}
                                            </CustomText>
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </View>
                        );
                    }}
                    renderContent={() => {
                        return (
                            <Locations
                                ref={this.locationRef}
                                selectedLocation={this.state.selectedLocation}
                                onChangeLocation={this.onChangeLocation}
                            />
                        );
                    }}
                    ref='bottomSHeet'
                />
            </View>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    exposeFunction: selectExposeFunction,
    locationReducerState: selectLocationReducer,
    AppConfigs: selectAppConfigs,
    skipMode: selectSkipMode,
    homeSection: selectHomeSection,
    token: selectUserToken,
    user: selectUserInfo,
  });

const mapDispatchToProps = (dispatch, props) => ({
    onSetHomeSection: (data) => dispatch(setHomeSection(data)),
    onSetHomeCategory: (data) => dispatch(setHomeCategory(data)),
    onSetLocationValues: (data) => dispatch(setLocationValues(data)),
    onSetLocationList: (data) => dispatch(setLocationList(data)),
    onSetHomeSelectedLocation: (data) => dispatch(setHomeSelectedLocation(data)),
    onSetUserCurrentLocation: (data) => dispatch(setUserCurrentLocation(data)),
    onSetAppLoading: (data) => dispatch(setAppLoading(data)),
    onSetErrorObject: (data) => dispatch(setErrorObject(data)),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(withTransation(HomeScreen));
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parallexBackgroundImage: {
    width: '100%',
    height: ParallaxHeight,
  },
  rectangle: {
    flex: 1,
    width: '100%',
    height: 78,
    opacity: 0.9,
    backgroundColor: 'rgb(169,169,169)',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  category: {
    marginTop: 16,
    marginBottom: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 11,
  },
  offers: {
    width: '100%',
    height: 37,
    backgroundColor: '#7F526E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offersText: {
    color: '#ffffff',
  },
  doneBtnWrapper: {
    backgroundColor: '#D1D1D1',
    height: 45,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  doneBtn: {
    height: 30,
    width: 60,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  savedWrapper: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
});
