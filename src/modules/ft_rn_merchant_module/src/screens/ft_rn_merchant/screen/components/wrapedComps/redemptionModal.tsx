import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { OfferToDisplay, RedeemData } from '../../port';

import { CustomComponents, FastTrackLibs } from 'rn_fast_track_uilib';

const { Loader, CustomText, ErrorModal, WebViewModal } = CustomComponents;
const { Ionicons, Modal, SmoothPinCodeInput } = FastTrackLibs;
const tempOffers = [
  {
    title: 'Buy 1 Get 1 Free',
    image:
      'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_types/voucher_type_food_1.png',
  },
  {
    title: 'dine-in only',
    image:
      'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_restrictions/voucher_restriction_food_5.png',
  },
  {
    title: 'dine-in only',
    image:
      'https://s3.amazonaws.com/entertainer-app-assets/icons/voucher_restrictions/voucher_restriction_food_5.png',
  },
];
interface STATE {
  code: string;
  showWebView: boolean;
}

interface PROPS {
  outletID: number;
  merchantID: number;
  isVisible: boolean;
  merchantLogo: string;
  selectedOffer: OfferToDisplay;
  merchantName: string;
  closeRemptionModal: () => void;
  redeeemOffer: (data: RedeemData) => void;
  disableError: () => void;
  overlayLoader: boolean;
  showError: boolean;
  errorMsg: string;
  redemptionResponse: any;
  product_id: number;
  showRedemptionSuccessModal: boolean;
  pushAnalytics: (data: any) => void;
  ruleOfUseURL: string;
}
export default class RedemptionModal extends Component<PROPS, STATE> {
  constructor(props: PROPS) {
    super(props);
    this.state = {
      code: '',
      showWebView: false,
    };
  }

  UNSAFE_componentWillMount() {}

  componentDidMount() {
  }

  handleClose = () => {
    //console.log('handleSubmit');
    //
  };

  disableWebView = () => {
    this.setState({ showWebView: false });
  };

  render() {
    const {
      outletID,
      merchantID,
      isVisible,
      merchantName,
      merchantLogo,
      selectedOffer,
      redeeemOffer,
      closeRemptionModal,
      overlayLoader,
      showError,
      errorMsg,
      disableError,
      product_id,
      redemptionResponse,
      showRedemptionSuccessModal,
      ruleOfUseURL,
    } = this.props;
    
    const { validity_date } = selectedOffer;
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    let validDate = new Date(validity_date);

    return (
      <Modal
        animationIn='slideInDown'
        animationInTiming={700}
        animationOut='slideOutUp'
        animationOutTiming={700}
        isVisible={isVisible}
        hasBackdrop={false} //true due to design requirement
        coverScreen={true}
        style={styles.modalStyle} //commented out due to android design
        onBackButtonPress={() => closeRemptionModal()} // for android back button handling
      >
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
        <SafeAreaView style={{ flex: 1 }}>

            <Loader isVisible={overlayLoader} />

            <ErrorModal
              isVisible={showError}
              dataString={errorMsg}
              disable={disableError}
              buttonText={'OK'}
            />

            <WebViewModal
              urlString={ruleOfUseURL}
              headerString={'Rule of Use'}
              isVisible={this.state.showWebView}
              disableCalback={() => this.disableWebView()}
            />

            <View style={styles.cmParent}>
              <View style={styles.cmHeader}>
                <Ionicons
                  name='md-close'
                  style={styles.cmCloseButton}
                  size={25}
                  color='#000'
                  onPress={() => {
                    const stackData = {
                      current_screen: 'Redemption Card',
                      action: 'click_close',
                      merchant_id: this.props.merchantID,
                      outlet_id: this.props.outletID,
                      category_id: 0,
                      categories: '',
                      categories_analytics: '',
                      location_id: 0,
                      offer_id: this.props.selectedOffer.offer_id,
                      changeSequenceNumber: false,
                    };
                    this.props.pushAnalytics(stackData);
                    closeRemptionModal();
                  }}
                />
              </View>
              <View style={styles.logoParent}>
                <Image style={styles.logo} source={{ uri: merchantLogo }} />
                <CustomText style={styles.outletName}>
                  {selectedOffer.name}
                </CustomText>
              </View>

              <View style={styles.offerFeaturesParetnt}>
                {selectedOffer.voucher_details.map(
                  (of_detail: any, index: number) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          style={{ height: 50, width: 50 }}
                          source={{ uri: of_detail.image }}
                        />
                        <CustomText
                          style={{
                            marginTop: 10,
                            fontSize: 14,
                            fontStyle: 'normal',
                            letterSpacing: 0,
                            color: '#000000',
                          }}
                        >
                          {of_detail.title}
                        </CustomText>
                      </View>
                    );
                  }
                )}
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CustomText
                  style={{
                    fontFamily: 'MuseoSans300',
                    fontSize: 14,
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    color: '#000000',
                    marginTop: 10,
                  }}
                >
                  Your Estimated Savings
                </CustomText>
                <CustomText
                  style={{
                    fontFamily: 'MuseoSans500',
                    fontSize: 21,
                    fontWeight: '500',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    textAlign: 'center',
                    color: '#2a2a2a',
                    paddingTop: 10,
                  }}
                >
                  {selectedOffer.savings_estimate}
                </CustomText>

                <CustomText
                  style={{
                    fontFamily: 'MuseoSans300',
                    fontSize: 14,
                    fontWeight: '300',
                    fontStyle: 'normal',
                    letterSpacing: 0,
                    textAlign: 'center',
                    color: '#000000',
                    paddingTop: 10,
                    paddingBottom: 10,
                  }}
                >
                  Please ask {merchantName} to enter their PIN
                </CustomText>

                <View
                  style={{
                    height: 40,
                    width: '60%',
                    backgroundColor: '#ffffff',
                    elevation: 1,
                    borderColor: '#a5a5a5',
                    borderWidth: 1,
                    alignItems: 'center',
                  }}
                >
                  <SmoothPinCodeInput
                    placeholder={
                      <CustomText style={{ color: '#a5a5a5', fontSize: 40 }}>
                        *
                      </CustomText>
                    }
                    mask={
                      <CustomText style={{ color: 'black', fontSize: 40 }}>
                        *
                      </CustomText>
                    }
                    maskDelay={0}
                    password={true}
                    cellStyle={null}
                    codeLength={4}
                    cellStyleFocused={null}
                    value={this.state.code}
                    onTextChange={(code) => {
                      this.setState({ code });
                      if (this.state.code.length === 1) {
                        const stackData = {
                          current_screen: 'Redemption Card',
                          action: 'type_merchant_pin',
                          merchant_id: this.props.merchantID,
                          outlet_id: this.props.outletID,
                          category_id: 0,
                          categories: '',
                          categories_analytics: '',
                          location_id: 0,
                          offer_id: this.props.selectedOffer.offer_id,
                          changeSequenceNumber: false,
                        };
                        this.props.pushAnalytics(stackData);
                      }
                    }}
                    onFulfill={() => {
                      setTimeout(() => {
                        const currentDate = new Date();
                        const transactionID =
                          'Last Sync: ' +
                          currentDate.getDate() +
                          '/' +
                          (currentDate.getMonth() + 1) +
                          '/' +
                          currentDate.getFullYear() +
                          ' @ ' +
                          currentDate.getHours() +
                          ':' +
                          currentDate.getMinutes() +
                          ':' +
                          currentDate.getSeconds();
                        

                        let redemption: any = {
                          outlet_id: outletID,
                          offer_id: selectedOffer.offer_id,
                          merchant_pin: parseInt(this.state.code),
                          transaction_id: transactionID,
                          product_id: product_id,
                        };
                        redeeemOffer(redemption);
                        this.setState({ code: '' });
                      }, 100);
                    }}
                  />
                </View>

                <CustomText
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#000000',
                    paddingTop: 10,
                    paddingBottom: 30,
                    fontFamily: 'MuseoSans300',
                  }}
                >
                  VALID TO {validDate.toLocaleDateString('en-US', options)}
                </CustomText>

                <View
                  style={{
                    borderWidth: 1,
                    width: '90%',
                    borderColor: '#24348b',
                  }}
                ></View>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    this.setState({ showWebView: true });
                  }}
                  style={{ flexDirection: 'row', marginTop: 10 }}
                >
                  <CustomText
                    style={{
                      fontSize: 12,

                      fontStyle: 'normal',
                      letterSpacing: 0,
                      textAlign: 'center',
                      color: '#000000',
                      fontFamily: 'MuseoSans300',
                    }}
                  >
                    Offers are subject to
                  </CustomText>

                  <CustomText
                    style={{
                      fontSize: 11,
                      fontStyle: 'normal',
                      letterSpacing: 0,
                      textAlign: 'center',
                      color: '#000000',
                      textDecorationLine: 'underline',
                      lineHeight: 14,
                      fontFamily: 'MuseoSans300',
                    }}
                  >
                    {' '}
                    Rules of Use
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>

        </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'MuseoSans300',
  },
  modalStyle: {
    margin: 0,
  },
  cmParent: {
    flex: 1,
    backgroundColor: 'white',
  },
  cmHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  cmCloseButton: {
    paddingEnd: 10,
    paddingTop: 3,
    paddingBottom: 0,
  },
  logoParent: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  logo: {
    height: 80,
    width: 80,
  },
  offerFeaturesParetnt: {
    height: 100,
    backgroundColor: '#efefef',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  outletName: {
    marginTop: 10,
    fontFamily: 'MuseoSans300',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#2a2a2a',
  },

  cmOutletsCount: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 35,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  cmOutletsCountText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'MuseoSans500',
    color: 'white',
    paddingStart: 10,
  },

  doneButton: {
    fontSize: 14,
    fontFamily: 'MuseoSans500',
    paddingEnd: 10,
  },
  listItemSelected: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    color: '#A9A9A9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingStart: 15,
    backgroundColor: 'rgb(237, 237, 237)',
  },
  listItem: {
    flexDirection: 'row',
    height: 65,
    color: 'grey',
    alignItems: 'center',
    paddingStart: 15,
    borderBottomWidth: 0.7,
  },
  listItemText: {
    color: 'grey',
    flex: 1,
    fontFamily: 'MuseoSans500',
  },
  distanceText: {
    color: 'grey',
    paddingEnd: 20,
    fontFamily: 'MuseoSans500',
  },

  cmFooterParent: {
    backgroundColor: '#f2f1f1',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eightPointBurst: {},
  eightPointBurst20: {
    width: 20,
    height: 20,
    backgroundColor: 'red',
    transform: [{ rotate: '20deg' }],
  },
  eightPointBurst155: {
    width: 20,
    height: 20,
    position: 'absolute',
    backgroundColor: 'red',
    top: 0,
    left: 0,
    transform: [{ rotate: '155deg' }],
  },
});

// export default App;
