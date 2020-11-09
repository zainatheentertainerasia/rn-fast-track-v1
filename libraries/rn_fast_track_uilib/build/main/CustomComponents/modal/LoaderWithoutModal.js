import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import LOADING_GIF from '../../../design/images/loading_icon.gif';

export default class LoaderWithoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.loaderContainer}>
        <Image style={styles.loadingImage} source={LOADING_GIF} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingImage: {
    height: 65,
    width: 65,
    borderRadius: 10,
    resizeMode: 'contain',
  }
});