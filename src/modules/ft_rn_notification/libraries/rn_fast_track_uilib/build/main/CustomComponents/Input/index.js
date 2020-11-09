import React, { Component } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import APP_COLORS from '../../../design/colors';

export default class TextInput extends Component {
  focus() {
    this._field.focus();
  }

  blur() {
    this._field.blur();
  }

  render() {
    let { isRTL } = this.props;
    return (
      <RNTextInput
        {...this.props}
        ref={(c) => (this._field = c)}
        autoCorrect={false}
        placeholderTextColor={APP_COLORS.LIGHT_GREY}
        autoCapitalize={this.props.autoCapitalize || 'none'}
        returnKeyType={this.props.returnKeyType || 'next'}
        style={[
          styles.textInput,
          isRTL && { textAlign: 'right' },
          this.props.style,
          isRTL && styles.flipStyle,
        ]}
      />
    );
  }
}

const styles = {
  textInput: {
    width: '100%',
    // backgroundColor: 'red',
    // padding: 10,
    height: 30,
    fontWeight: '300',
    // textAlign: 'center',
    color: 'black',
    fontFamily: 'MuseoSans500',
  },
  flipStyle: {
    transform: [{ scaleX: -1 }],
  },
};
