import React, { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { getFlipForRTLStyle } from '../../utils/localization/I18n';

import {
  CustomComponents,
  init_font,
  FastTrackLibs,
} from 'rn_fast_track_uilib';

const {
  ErrorModal,
  Loader,
  CustomText,
  TextLabel,
  HeaderWithBackButton,
  WebViewModal,
  ResetPasswordModal,
  ResetPasswordSuccessModal,
} = CustomComponents;
const {} = FastTrackLibs;

const screenWidth = Dimensions.get('window').width;
export default class index extends Component {
  state = {
    screenWidth: screenWidth,
  };
  render() {
    let { progress, text, headText } = this.props;
    if (progress > 100) {
      progress = 100;
    }
    const width = (progress / 100) * this.state.screenWidth;
    return (
      <View style={styles.container}>
        <CustomText
          style={{ marginBottom: 5, color: '#ccc', ...getFlipForRTLStyle() }}
        >
          {headText}
        </CustomText>
        <View
          style={{ height: 20, backgroundColor: '#ccc' ,justifyContent: 'center'}}
          onLayout={(event) => {
            this.setState({ screenWidth: event.nativeEvent.layout.width });
          }}
        >
          <CustomText style={[styles.textStyle, getFlipForRTLStyle()]}>
              {text}
            </CustomText>
          <View style={[{ width: width }, styles.barContainer]}>
            
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  barContainer: {
    height: 20,
    backgroundColor: '#4bb190',
    justifyContent: 'center',
    alignItems: 'flex-start',
    
  },
  textStyle: {
    paddingHorizontal: 10,
    fontSize: 12,
    color: 'white',
    position: 'absolute',
    zIndex:5,
  },
});
