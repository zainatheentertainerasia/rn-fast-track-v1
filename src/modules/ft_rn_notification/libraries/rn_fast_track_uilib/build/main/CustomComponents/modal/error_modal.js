import React, { Component, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../Text/Text';
import { Ionicons } from '@expo/vector-icons';
import APP_COLORS from '../../../design/colors';
import Modal from 'react-native-modal';

export default class ErrorModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataString, isVisible, disable, i18n, isRTL, buttonText } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        animationIn='fadeIn'
        animationOut='fadeOut'
        animationInTiming={15}
        animationOutTiming={10}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Ionicons
              style={styles.iconStyle}
              name='md-close-circle'
              size={35}
              color='#000'
              onPress={() => {
                disable();
              }}
            />
            <Text style={styles.modalText}>{dataString}</Text>

            <TouchableOpacity
              style={styles.okButton}
              activeOpacity={1}
              onPress={() => {
                disable();
              }}
            >
              <Text style={styles.textStyle}>{buttonText}</Text>
            </TouchableOpacity>
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '98%',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
  },
  okButton: {
    height: 45,
    borderRadius: 2,
    padding: 10,
    width: '95%',
    elevation: 2,
    backgroundColor: APP_COLORS.COLOR_BUTTON,
    justifyContent: 'center',
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: 'MuseoSans500',
    fontSize: 15,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#ffffff',
  },
  modalText: {
    fontFamily: 'MuseoSans300',
    fontSize: 16,
    padding: 15,

    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: '#000000',
  },
  iconStyle: {
    color: 'red',
  },
});

// export default App;
