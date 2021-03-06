import React, { Component } from 'react';
import { Alert, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import APP_COLORS from '../res/colors';
import Modal from 'react-native-modal';
import Text from './Text';

const doneImg = require('../res/images/done.png');

export default class ResetSuccessModal extends Component<any> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataString, isVisible, hide } = this.props;
    return (
      <Modal
        isVisible={isVisible}
        animationIn='fadeIn'
        animationOut='fadeOut'
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.doneImg} source={doneImg} />
            <Text style={styles.sureText}>Password reset link sent to your email address!</Text>
            <TouchableOpacity onPress={() => hide()} style={styles.button}><Text style={{color: 'white'}}>Ok</Text></TouchableOpacity>
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
  },
  modalView: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    width: '90%',
    borderRadius: 4,
  },
  doneImg: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  sureText: {
    textAlign: 'center',
    marginTop: 18,
    color: APP_COLORS.LIGHT_TEXT,
    fontFamily: 'MuseoSans300',
  },
  button: {
    marginTop: 12,
    height: 36,
    borderRadius: 2,
    width: '100%',
    backgroundColor: APP_COLORS.COLOR_BUTTON,
    justifyContent: 'center',
    alignItems: 'center',
  },
});