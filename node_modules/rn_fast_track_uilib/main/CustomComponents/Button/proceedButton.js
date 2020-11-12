import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../Text/Text';
import design from '../../../design/DesignSystem/design.json'
export default class proceedButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.handleProceed}
        style={{
          marginTop: 50,
          justifyContent: 'center',
          backgroundColor: design["--button--BackgroundColor"],
          height: 60,
          alignSelf: 'center',
          width: '50%',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'MuseoSans500',
            fontSize: 18,
          }}
        >
          PROCEED
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({});
