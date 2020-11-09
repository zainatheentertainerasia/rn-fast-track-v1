import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

const loadingImg = require('../res/images/loading_icon.gif');

export default class Loader extends Component<any> {

  render() {
    return (
      <View style={styles.loadingModal}>
        <Image
          style={{
            height: 65,
            width: 65,
            borderRadius: 10,
          }}
          source={loadingImg}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingModal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});