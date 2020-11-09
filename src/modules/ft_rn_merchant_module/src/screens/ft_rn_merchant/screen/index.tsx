import React, { Component } from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { callBacks, datatype, OfferToDisplay } from './port';

import Offers from './components/offers';

import i18n, { isRTL, getFlipForRTLStyle } from './utils/localization/I18n';

import RedemptionModal from './components/wrapedComps/redemptionModal';
import RedemptionSuccessModal from './components/wrapedComps/redemptionSuccess';
import CongratulationsModal from './components/wrapedComps/congratulationsModal';


//redux implementation
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectExposeFunction,
  selectAppConfigs,
} from '../../../../../../redux/appReducer/app.selectors';
import {
  selectUserInfo,
  selectUserToken,
} from '../../../../../../redux/userReducer/user.selectors';
import {setUser} from '../../../../../../redux/userReducer/user.actions'
import { selectLocation,selectCurrentLocation } from '../../../../../../redux/location/location.selectors';
import { selectMerchantData,selectFavouriteList } from '../../../../../../redux/outlet/outlet.selectors';
import {setFavouriteList} from '../../../../../../redux/outlet/outlet.actions'

import {offers} from './res/static'

import { CustomComponents, FastTrackLibs, design } from 'rn_fast_track_uilib';

const {
  MerchantHeader,
  Loader,
  MerchantImageSlider,
  MerchantContactBar,
  CustomText,
  MerchantLocation,
  ChangeLocationModal,
  MerchantContinueModal,
  WebViewModal,
  ErrorModal
} = CustomComponents;


const { Feather } = FastTrackLibs;

const tempOffer = offers // for dummy response
interface propsInterface {
  CallBacks: callBacks;
  data: datatype;
}
interface stateInterface {
  changeLocationModal: boolean;
  showContinueOutletModal: boolean;
  showCongratulationsModal: boolean;
  selectedOffer: OfferToDisplay;
  product_id: number;
  expandOutletDetail: boolean;
  expandAmenties: boolean;
  webViewTitle: string;
  webViewUrl: string;
  showWebView: boolean;
}

interface onSelectOfferReturnType {
  selectedOffer: OfferToDisplay;
  product_id: number;
}

class Index extends Component<propsInterface, stateInterface> {
  constructor(props: propsInterface) {
    super(props);
    this.state = {
      changeLocationModal: false,
      showContinueOutletModal: false,
      showCongratulationsModal: false,
      selectedOffer: tempOffer,
      product_id: 0,
      expandOutletDetail: false,
      expandAmenties: false,
      webViewTitle: '',
      webViewUrl: '',
      showWebView: false,
    };
  }

  handleChangeLocation = () => {
    this.setState({ changeLocationModal: !this.state.changeLocationModal });
  };

  handleCloseRedemptionModal = () => {
    this.props.CallBacks.onCloseRedemptionModal();
  };
  handleContinueOutletModal = (data: onSelectOfferReturnType) => {
    this.props.CallBacks.onOfferSelected(data);
    this.setState({
      showContinueOutletModal: !this.state.showContinueOutletModal,
      selectedOffer: data.selectedOffer,
      product_id: data.product_id,
    });
  };

  changeOutletCallback = () => {
    this.setState(
      {
        showContinueOutletModal: false,
      },
      () => {
        setTimeout(() => {
          this.setState({
            changeLocationModal: true,
          });
        }, 150);
      }
    );
  };
  continueCallback = () => {
    this.setState({
      showContinueOutletModal: !this.state.showContinueOutletModal,
    });

    setTimeout(() => {
      //analytics
      const stackData = {
        current_screen: 'Redemption Card',
        action: 'click_open_card',
        merchant_id: this.props.data.merchant.id,
        outlet_id: this.props.data.selectedOutlet.id,
        offer_id: this.state.selectedOffer.offer_id,
        category_id: 0,
        categories: '',
        categories_analytics: '',
        location_id: 0,
        changeSequenceNumber: false,
      };
      this.props.CallBacks.pushAnalytics(stackData);

      this.props.CallBacks.onShowRedemptionModal();
    }, 200);
  };

  handleRedemptionSuccessDone = () => {
    setTimeout(() => {
      const stackData = {
        current_screen: 'Redemption Success Card',
        action: 'click_done',
        merchant_id: this.props.data.merchant.id,
        outlet_id: this.props.data.selectedOutlet.id,
        category_id: 0,
        categories: '',
        categories_analytics: '',
        location_id: 0,
        changeSequenceNumber: false,
      };
      this.props.CallBacks.pushAnalytics(stackData);
      this.props.CallBacks.onCloseRedemptionSuccessModal();
    }, 300);

    setTimeout(() => {
      this.handleCongratulationsModal();
    }, 500);
  };

  handleCongratulationsModal = () => {
    this.setState({
      showCongratulationsModal: !this.state.showCongratulationsModal,
    },()=>{
      if(this.state.showCongratulationsModal === false){
        this.props.CallBacks.refreshMerchant();
        setTimeout(() => {
          this.props.checkDemographic("post_redemption");
          }, 1000);
      }
      
    });

    
  };

  disableWebView = () => {
    this.setState({ showWebView: false });
  };

  render() {
    const {
      onBack,
      setFavourite,
      activeLoader,
      onSelectedOutletChange,
      redeemOffer,
      hideError,
      onCloseRedemptionModal,
      pushAnalytics,
    } = this.props.CallBacks;
    const {
      merchant,
      selectedOutlet,
      loadingOverlayActive,
      favourite,
      error,
      errorText,
      redemptionResponse,
      showRedemptionModal,
      showRedemptionSuccessModal,
      menu,
      website,
      ruleOfUseURL,
    } = this.props.data;

    //console.log(ruleOfUseURL, 'rule of use');

    // if (merchant.id === 0) {
    //   return (
    //     <View style={{ flex: 1 }}>
    //       <Loader isVisible={loadingOverlayActive} />
    //     </View>
    //   );
    // }
    const amenties =
      merchant.merchant_attributes.length > 0
        ? merchant.merchant_attributes[0].attributes
        : {};

    //state variables
    const { changeLocationModal, showContinueOutletModal } = this.state;

    let mallValue = selectedOutlet.mall;

    if (mallValue === null || mallValue === undefined || mallValue === '') {
      mallValue = '';
    }

    let webValue = website;
    if (webValue === null || webValue === undefined || webValue === '') {
      webValue = '';
    }

    let menuValue = menu;
    if (menuValue === null || menuValue === undefined || menuValue === '') {
      menuValue = '';
    }

    return (
      <View style={{ flex: 1, ...getFlipForRTLStyle(), backgroundColor:"#FFFFFF" }}>
        {/* Modals start */}

        <WebViewModal
          urlString={this.state.webViewUrl}
          headerString={this.state.webViewTitle}
          isVisible={this.state.showWebView}
          disableCalback={() => this.disableWebView()}
        />

        <Loader isVisible={loadingOverlayActive} />

        <ChangeLocationModal
          isVisible={changeLocationModal}
          title={merchant.name}
          selectedOutlet={selectedOutlet}
          outlets={merchant.outlets}
          onDone={(data: any) => {
            this.setState(
              {
                changeLocationModal: false,
              },
              () => {
                onSelectedOutletChange(data);
              }
            );
          }}
          disable={this.handleChangeLocation}
          isRTL={isRTL}
          i18n={i18n}
        />
        <MerchantContinueModal
          outletName={selectedOutlet.name}
          isVisible={showContinueOutletModal}
          changeOutlet={this.changeOutletCallback}
          continueWithCurrentOutlet={this.continueCallback}
        />

        <RedemptionModal
          outletID={selectedOutlet.id}
          merchantID={merchant.id}
          product_id={this.state.product_id}
          closeRemptionModal={this.handleCloseRedemptionModal}
          merchantLogo={merchant.logo_small_url}
          merchantName={merchant.name}
          selectedOffer={this.state.selectedOffer}
          redeeemOffer={(data: any) => redeemOffer(data)}
          overlayLoader={loadingOverlayActive}
          isVisible={showRedemptionModal}
          showError={error}
          errorMsg={errorText}
          disableError={hideError}
          redemptionResponse={redemptionResponse}
          showRedemptionSuccessModal={showRedemptionSuccessModal}
          pushAnalytics={pushAnalytics}
          ruleOfUseURL={ruleOfUseURL}
        />

        <RedemptionSuccessModal
          redemptionResponse={redemptionResponse}
          merchantLogo={merchant.logo_small_url}
          merchantName={merchant.name}
          selectedOffer={this.state.selectedOffer}
          isVisible={showRedemptionSuccessModal}
          closeRemptionSuccessModal={this.handleRedemptionSuccessDone}
        />

          <ErrorModal
            isVisible={error}
            dataString={errorText}
            disable={()=>{
              hideError()
            }}
            buttonText={'OK'}
          />
        <CongratulationsModal
          msg={this.state.selectedOffer.savings_estimate}
          isVisible={this.state.showCongratulationsModal}
          closeModal={this.handleCongratulationsModal}
        />

        {/* Modals end here */}

        <MerchantHeader
          fav={favourite}
          headerTitle={merchant.name}
          onBack={onBack}
          onSetFavourite={setFavourite}
        />

        <ScrollView>
          <MerchantImageSlider
            urls={merchant.hero_urls}
            outletID={selectedOutlet.id}
            merchantID={merchant.id}
            pushAnalytics={pushAnalytics}
          />
          <MerchantContactBar
            email={selectedOutlet.email}
            phone={selectedOutlet.telephone}
            location={{ lat: selectedOutlet.lat, lng: selectedOutlet.lng }}
            merchant={merchant}
            selectedOutlet={selectedOutlet}
            pushAnalytics={pushAnalytics}
          />
          <View style={{ backgroundColor: design['--global--tertiary--BackgroundColor']?design['--global--tertiary--BackgroundColor']:"#FFFFFF" }}>
            <MerchantLocation
              name={selectedOutlet.name}
              handleChangeLocation={this.handleChangeLocation}
              isRTL={isRTL}
              i18n={i18n}
            />
            <Offers
              offers={merchant.offers}
              onOfferSelected={this.handleContinueOutletModal}
            />
            {/* Outlet Details */}
            <View style={{ flexDirection: 'column' }}>
              {/* title */}
              <CustomText
                isRTL={isRTL}
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 15,
                  fontFamily: 'MuseoSans300',
                  fontSize: 15,
                  fontStyle: 'normal',
                  lineHeight: 20,
                  letterSpacing: 0,
                  color: '#000000',
                }}
              >
                {i18n.t('Outlet Details')}
              </CustomText>
              <CustomText
                isRTL={isRTL}
                style={{
                  paddingHorizontal: 10,
                  paddingTop: 3,
                  fontFamily: 'MuseoSans500',
                  fontSize: 15,
                  lineHeight: 20,
                  letterSpacing: 0,
                  color: '#000000',
                }}
              >
                {selectedOutlet.name}
              </CustomText>
              <View style={{ flexDirection: 'row' }}>
                <CustomText
                  isRTL={isRTL}
                  style={{
                    paddingHorizontal: 10,
                    paddingTop: 3,
                    fontFamily: 'MuseoSans500',
                    fontSize: 15,
                    lineHeight: 20,
                    letterSpacing: 0,
                    color: '#000000',
                  }}
                >
                  {i18n.t('Location')}
                </CustomText>
                <CustomText
                  isRTL={isRTL}
                  numberOfLines={1}
                  style={{
                    //paddingHorizontal: 10,
                    paddingTop: 3,
                    paddingEnd: 10,
                    fontFamily: 'MuseoSans300',
                    fontSize: 12,
                    lineHeight: 20,
                    letterSpacing: 0,
                    color: '#000000',
                  }}
                >
                  {selectedOutlet.human_location}
                </CustomText>
              </View>
              {mallValue !== '' ? (
                <View style={{ flexDirection: 'row' }}>
                  <CustomText
                    isRTL={isRTL}
                    style={{
                      paddingHorizontal: 10,
                      paddingTop: 3,
                      fontFamily: 'MuseoSans500',
                      fontSize: 15,
                      lineHeight: 20,
                      letterSpacing: 0,
                      color: '#000000',
                    }}
                  >
                    {i18n.t('Mall')}
                  </CustomText>
                  <CustomText
                    isRTL={isRTL}
                    style={{
                      //paddingHorizontal: 10,
                      paddingTop: 3,
                      fontFamily: 'MuseoSans300',
                      fontSize: 12,
                      lineHeight: 20,
                      letterSpacing: 0,
                      color: '#000000',
                    }}
                  >
                    {selectedOutlet.mall}
                  </CustomText>
                </View>
              ) : null}
              <View style={{ flexDirection: 'row' }}>
                <CustomText
                  isRTL={isRTL}
                  style={{
                    paddingHorizontal: 10,
                    paddingTop: 3,
                    fontFamily: 'MuseoSans500',
                    fontSize: 15,
                    lineHeight: 20,
                    letterSpacing: 0,
                    color: '#000000',
                  }}
                >
                  {i18n.t('Area')}
                </CustomText>
                <CustomText
                  isRTL={isRTL}
                  style={{
                    //paddingHorizontal: 10,
                    paddingTop: 3,
                    fontFamily: 'MuseoSans300',
                    fontSize: 12,
                    lineHeight: 20,
                    letterSpacing: 0,
                    color: '#000000',
                  }}
                >
                  {selectedOutlet.neighborhood}
                </CustomText>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <CustomText
                  isRTL={isRTL}
                  style={{
                    paddingHorizontal: 10,
                    paddingTop: 3,
                    fontFamily: 'MuseoSans500',
                    fontSize: 15,
                    lineHeight: 20,
                    letterSpacing: 0,
                    color: '#000000',
                  }}
                >
                  {i18n.t('Distance')}
                </CustomText>
                <CustomText
                  isRTL={isRTL}
                  style={{
                    //paddingHorizontal: 10,
                    paddingTop: 3,
                    fontFamily: 'MuseoSans300',
                    fontSize: 12,
                    lineHeight: 20,
                    letterSpacing: 0,
                    color: '#000000',
                  }}
                >
                  {selectedOutlet.distance}
                </CustomText>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <CustomText
                  isRTL={isRTL}
                  numberOfLines={
                    this.state.expandOutletDetail === false ? 2 : 0
                  }
                  style={{
                    paddingStart: 10,
                    paddingEnd: 10,
                    paddingTop: 10,
                    fontFamily: 'MuseoSans300',
                    fontSize: 12,
                    lineHeight: 20,
                    letterSpacing: 0,
                    color: '#000000',
                  }}
                >
                  {merchant.description}
                </CustomText>
                <Feather
                  style={{ paddingEnd: 20 }}
                  name='more-horizontal'
                  size={35}
                  color='grey'
                  onPress={() => {
                    this.setState({
                      expandOutletDetail: !this.state.expandOutletDetail,
                    });

                    if (this.state.expandOutletDetail === false) {
                      //analytics
                      const stackData = {
                        current_screen: 'Merchant Detail',
                        action: 'click_detail',
                        merchant_id: merchant.id,
                        outlet_id: selectedOutlet.id,
                        category_id: 0,
                        categories: '',
                        categories_analytics: '',
                        location_id: 0,
                        changeSequenceNumber: false,
                      };
                      pushAnalytics(stackData);
                    }
                  }}
                />
              </View>
            </View>
          </View>
          {/* Amenties details */}

          {merchant.merchant_attributes.length === 0 ? null : (
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  expandAmenties: !this.state.expandAmenties,
                });
              }}
              activeOpacity={1}
              style={{ flexDirection: 'column', backgroundColor: 'white' }}
            >
              {/* title */}
              {merchant.merchant_attributes.length > 0 && (
                <CustomText
                  isRTL={isRTL}
                  style={{
                    paddingStart: 10,
                    paddingTop: 15,
                    fontFamily: 'MuseoSans300',
                    fontSize: 15,

                    lineHeight: 20,
                    letterSpacing: 0,
                    color: '#000000',
                  }}
                >
                  {merchant.merchant_attributes[0].section_name}
                </CustomText>
              )}

              <View
                style={{
                  padding: 10,
                  marginRight: -5,
                  flexDirection: 'row',
                  flexWrap:
                    this.state.expandAmenties === false ? 'nowrap' : 'wrap',
                }}
              >
                {merchant.merchant_attributes.length > 0 &&
                  amenties.map((item: any, index: number) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'column',
                          justifyContent: 'center',
                          paddingBottom: 10,
                          alignItems: 'center',
                          width: '25%',
                        }}
                        key={index}
                      >
                        <Image
                          style={{
                            height: 35,
                            width: 35,
                            ...getFlipForRTLStyle(),
                          }}
                          source={{ uri: item.image_url }}
                        />
                        <CustomText
                          isRTL={isRTL}
                          numberOfLines={2}
                          style={{
                            fontSize: 10,
                            fontFamily: 'MuseoSans300',
                            textAlign: 'center',
                          }}
                        >
                          {item.name}
                        </CustomText>
                      </View>
                    );
                  })}
              </View>

              {this.state.expandAmenties === true ? (
                <View>
                  {webValue === '' ? null : (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        this.setState({
                          webViewTitle: merchant.name,
                          webViewUrl: webValue,
                          showWebView: true,
                        });
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                      }}
                    >
                      <Image
                        style={{ height: 25, width: 25 }}
                        source={require('../screen/res/images/ic_web_blue.png')}
                      />
                      <CustomText
                        style={{
                          flex: 1,
                          fontFamily: 'MuseoSans300',
                          fontSize: 14,
                          textDecorationLine: 'underline',
                          paddingStart: 10,
                        }}
                      >
                        {website}
                      </CustomText>
                    </TouchableOpacity>
                  )}
                  {menuValue === '' ? null : (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => {
                        this.setState({
                          webViewTitle: merchant.name,
                          webViewUrl: menuValue,
                          showWebView: true,
                        });
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                      }}
                    >
                      <Image
                        style={{ height: 25, width: 25 }}
                        source={require('../screen/res/images/ic_menu_book.png')}
                      />
                      <CustomText
                        style={{
                          flex: 1,
                          fontFamily: 'MuseoSans300',
                          fontSize: 14,
                          textDecorationLine: 'underline',
                          paddingStart: 10,
                        }}
                      >
                        Download Menu
                      </CustomText>
                    </TouchableOpacity>
                  )}
                </View>
              ) : null}

              <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                <Feather
                  onPress={() => {
                    this.setState({
                      expandAmenties: !this.state.expandAmenties,
                    });
                  }}
                  style={{ paddingEnd: 20 }}
                  name='more-horizontal'
                  size={35}
                  color='grey'
                />
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}



const mapStateToProps = createStructuredSelector({
  exposeFunction: selectExposeFunction,
  appConfig: selectAppConfigs,
  userInfo: selectUserInfo,
  token: selectUserToken,
  location: selectLocation,
  merchantData: selectMerchantData,
  currentUserLocation:selectCurrentLocation,
  favouriteList:selectFavouriteList
});


const mapDispatchToProps = (dispatch)=> ({
  onSetUser:(data)=>dispatch(setUser(data)),
  onSetFavourite:(data)=>dispatch(setFavouriteList(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);