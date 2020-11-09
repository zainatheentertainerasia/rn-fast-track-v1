import React, { Component } from 'react';
import { Alert, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import APP_COLORS from '../../../design/colors';
import Modal from 'react-native-modal';
import Text from '../Text/Text';
import {Portal} from 'react-native-paper'
const doneImg = require('../../../design/images/done.png');

export default class ResetSuccessModal extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { dataString, isVisible, hide } = this.props;
    return isVisible?
    <Portal>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.doneImg} source={doneImg} />
            <Text style={styles.sureText}>
            {dataString}
            </Text>
            <TouchableOpacity onPress={() => hide()} style={styles.button}>
              <Text style={{ color: 'white' }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Portal>
      :null
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.5)",
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "90%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
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
