import React, { Component, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CustomComponents, FastTrackLibs } from 'rn_fast_track_uilib';

const { Loader, CustomText, ErrorModal } = CustomComponents;
const { Ionicons, Modal, SmoothPinCodeInput } = FastTrackLibs;

interface PROPS {
  isVisible: boolean;
  msg: number;
  closeModal: () => void;
}
export default class ContinueModal extends Component<PROPS, any> {
  constructor(props: PROPS) {
    super(props);
    this.state = {};
  }

  render() {
    const { msg, isVisible, closeModal } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        animationIn='fadeIn'
        animationInTiming={100}
        animationOutTiming={100}
        animationOut='fadeOut'
      >
        <View style={styles.cmParent}>
          <View style={styles.cmHeader}>
            <Ionicons
              name='md-close'
              style={styles.cmCloseButton}
              size={25}
              color='#000'
              onPress={() => {
                closeModal();
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 20,
                marginTop: '30%',
              }}
            >
              <CustomText
                style={{
                  fontFamily: 'MuseoSans500',
                  fontSize: 20,
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  textAlign: 'center',
                  color: 'rgb(79,153,210)',
                }}
              >
                Congratulations!
              </CustomText>
            </View>
            <View
              style={{ borderWidth: 1, width: '90%', borderColor: 'grey' }}
            ></View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <CustomText
                style={{
                  fontFamily: 'MuseoSans300',
                  marginTop: 50,
                  fontSize: 18,
                  fontStyle: 'normal',
                  lineHeight: 30,
                  letterSpacing: 0,
                  textAlign: 'center',
                  color: '#000000',
                }}
              >
                You’ve just saved
              </CustomText>
              <CustomText
                style={{
                  fontFamily: 'MuseoSans300',
                  fontSize: 18,
                  fontStyle: 'normal',
                  lineHeight: 30,
                  letterSpacing: 0,
                  textAlign: 'center',
                  color: '#000000',
                }}
              >
                <CustomText
                  style={{
                    fontFamily: 'MuseoSans500',
                    fontSize: 18,
                    fontStyle: 'normal',
                    lineHeight: 30,
                    letterSpacing: 0,
                    textAlign: 'center',
                    color: '#000000',
                  }}
                >
                  {msg}
                </CustomText>{' '}
                With your
              </CustomText>
              <CustomText
                style={{
                  fontFamily: 'MuseoSans300',
                  fontSize: 18,
                  fontStyle: 'normal',
                  lineHeight: 30,
                  letterSpacing: 0,
                  textAlign: 'center',
                  color: '#000000',
                }}
              >
                Chalhoub Entertainer app!
              </CustomText>
            </View>
          </View>
        </View>
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
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  cmHeader: {
    alignItems: 'center',
    flexDirection: 'row',
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

// export default App;
