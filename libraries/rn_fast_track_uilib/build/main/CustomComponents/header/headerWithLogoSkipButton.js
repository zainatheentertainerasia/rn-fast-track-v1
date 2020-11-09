import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import APP_COLORS from '../../../design/colors';
import Text from '../Text/Text';
import design from '../../../design/DesignSystem/design.json';
import arrow_back_triangle from './arrow_back_triangle.png';
import { withNavigation } from '@react-navigation/compat';

class headerWithLogo extends Component {
  render() {
    const { getFlipForRTLStyle, skipModeCallback } = this.props;
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: design['--global--primary--BackgroundColor']?design['--global--primary--BackgroundColor']:APP_COLORS.COLOR_WHITE,
          justifyContent: 'center',
          alignItems:"center"
        }}
      >
      
        <View style={{ flex: 1 }}>
        <TouchableOpacity
          disabled={!window.isBackButton}
          activeOpacity={1}
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{
            // flex: 1,
            justifyContent: 'center',
            marginLeft:15,
            padding:5
          }}
        >
        {window.isBackButton&&<Image source={arrow_back_triangle} style={{height:15,width:15}} resizeMode="contain" />}
        </TouchableOpacity></View>
        

        <View style={{ flex: 2, paddingHorizontal: 50 }}>
          <Image
            style={{
              alignSelf: 'center',
              resizeMode: 'contain',
              height: 50,
              width: 200,
              marginTop: 0,
              ...getFlipForRTLStyle(),
            }}
            source={require('../../../design/images/companyHeader.png')}
          />
        </View>
        
          <TouchableOpacity
          disabled={window.isBackButton}
          activeOpacity={1}
          onPress={() => {
            skipModeCallback();
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        {!window.isBackButton&&<Text style={{ textAlign: 'center' }}>Skip</Text>}
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(headerWithLogo)

const styles = StyleSheet.create({});
