import React, { Component, useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Text from '../Text/Text';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

interface STATE {
  email: string;
  textError: boolean;
}

interface PROPS {
  outletName: string;
  isVisible: boolean;
  changeOutlet: () => void;
  continueWithCurrentOutlet: () => void;
}
export default class ContinueModal extends Component<PROPS, STATE> {
  constructor(props: PROPS) {
    super(props);
    this.state = {
      email: '',
      textError: false,
    };
  }

  render() {
    const {
      outletName,
      isVisible,
      changeOutlet,
      continueWithCurrentOutlet,
    } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        animationIn='fadeIn'
        animationInTiming={100}
        animationOutTiming={100}
        animationOut='fadeOut'
        backdropOpacity={0.4}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.outletTitle}>{outletName}</Text>

            <Text style={styles.modalText}>
              Are you sure you're at this outlet? if not, choose the correct one
              from the locations screen.
            </Text>

            <View style={styles.buttonParent}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  changeOutlet();
                }}
                style={styles.buttonParentChildLeft}
              >
                <Text style={styles.buttonText}>Change Outlet</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  continueWithCurrentOutlet();
                }}
                style={styles.buttonParentChildRight}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  modalView: {
    //margin: 20,
    backgroundColor: 'rgba(240,240,240,1)',
    padding: 5,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: 'center',

    borderRadius: 10,
    width: '85%',
  },
  outletTitle: {
    fontSize: 16,
    fontFamily: 'MuseoSans500',
    textAlign: 'center',
    paddingTop: 20,
    color: 'black',
    letterSpacing: 0,
  },
  buttonParent: {
    height: 50,
    flexDirection: 'row',
    borderTopWidth: 0.5,

    width: '100%',
    justifyContent: 'center',
  },
  buttonParentChildLeft: {
    borderRightWidth: 0.5,
    justifyContent: 'center',
    flex: 1,
  },

  buttonParentChildRight: {
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'MuseoSans300',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 14,
  },
  modalText: {
    paddingTop: 10,
    paddingBottom: 30,
    color: 'black',
    fontFamily: 'MuseoSans300',
    textAlign: 'center',
    lineHeight: 20,
    width: '98%',
    fontSize: 14,
  },
  iconStyle: {
    position: 'absolute',
    right: 8,
    marginTop: 2,
  },
});

// export default App;
