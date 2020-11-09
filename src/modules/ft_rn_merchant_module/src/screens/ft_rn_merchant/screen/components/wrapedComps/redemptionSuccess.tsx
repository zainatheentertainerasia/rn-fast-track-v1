import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';

import { OfferToDisplay, RedeemData } from '../../port';
import APP_COLORS from '../../res/colors';

import { CustomComponents, FastTrackLibs } from 'rn_fast_track_uilib';

const { Loader, CustomText, ErrorModal } = CustomComponents;
const { Ionicons, Modal, SmoothPinCodeInput } = FastTrackLibs;
interface STATE {
  code: string;
}

interface PROPS {
  isVisible: boolean;
  merchantLogo: string;
  selectedOffer: OfferToDisplay;
  merchantName: string;
  closeRemptionSuccessModal: () => void;
  redemptionResponse: any;
}
export default class RedemptionModal extends Component<PROPS, STATE> {
  constructor(props: PROPS) {
    super(props);
    this.state = {
      code: '',
    };
  }

  UNSAFE_componentWillMount() {}

  handleClose = () => {
    console.log('handleSubmit');
    //
  };

  render() {
    const {
      isVisible,
      merchantName,
      merchantLogo,
      selectedOffer,
      closeRemptionSuccessModal,
      redemptionResponse,
    } = this.props;
    const { validity_date } = selectedOffer;
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    let validDate = new Date(validity_date);

    if (redemptionResponse === undefined || redemptionResponse === null) {
      return <View></View>;
    }
    console.log(redemptionResponse);
    return (
      <Modal
        animationIn='fadeIn'
        animationInTiming={100}
        animationOut='fadeOut'
        animationOutTiming={10}
        isVisible={isVisible}
        hasBackdrop={false} //true due to design requirement
        coverScreen={true}
        style={styles.modalStyle} //commented out due to android design
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.cmParent}>
            <View style={styles.cmHeader}>
              <Ionicons
                name='md-close'
                style={styles.cmCloseButton}
                size={25}
                color='#000'
                onPress={() => {
                  closeRemptionSuccessModal();
                }}
              />
            </View>
            <View style={styles.logoParent}>
              <Image
                style={styles.logo}
                source={{
                  uri: merchantLogo,
                }}
              />
              <CustomText style={styles.outletName}>{merchantName}</CustomText>
            </View>

            <View style={styles.paretntTwo}>
              <CustomText
                style={{
                  marginTop: 18,
                  //fontFamily: 'MuseoSans300',
                  fontSize: 14,
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: '#000000',
                }}
              >
                Redemption Completed
              </CustomText>
              <CustomText
                style={{
                  //fontFamily: 'MuseoSans300',
                  fontSize: 25,
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: '#000000',
                  marginBottom: 10,
                }}
              >
                {redemptionResponse.redemption_code}
              </CustomText>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.okButton}
                activeOpacity={1}
                onPress={() => {
                  closeRemptionSuccessModal();
                }}
              >
                <CustomText style={styles.textStyle}>Done</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    textAlign: 'center',
    //fontFamily: 'MuseoSans300',
  },
  modalStyle: {
    margin: 0,
  },
  okButton: {
    height: 45,
    borderRadius: 2,
    padding: 10,
    width: '65%',
    elevation: 2,
    backgroundColor: APP_COLORS.COLOR_BUTTON,
    justifyContent: 'center',
    marginTop: 40,
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
    height: 60,
    width: 60,
  },
  paretntTwo: {
    height: 100,
    backgroundColor: '#efefef',
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  outletName: {
    marginTop: 20,
    //fontFamily: 'MuseoSans',
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
