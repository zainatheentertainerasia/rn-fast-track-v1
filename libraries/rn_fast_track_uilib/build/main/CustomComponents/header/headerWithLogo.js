import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import APP_COLORS from '../../../design/colors';
import design from '../../../design/DesignSystem/design.json';
import Text from '../Text/Text';
export default class headerWithLogo extends Component {
  render() {
    const { getFlipForRTLStyle } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: design['--global--primary--BackgroundColor']?design['--global--primary--BackgroundColor']:APP_COLORS.COLOR_WHITE,
          justifyContent: 'center',
        }}
      >
        <Image
          style={{
            alignSelf: 'center',
            resizeMode: 'contain',
            height: 50,
            marginTop: 0,
            ...getFlipForRTLStyle(),
          }}
          source={require('../../../design/images/companyHeader.png')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
