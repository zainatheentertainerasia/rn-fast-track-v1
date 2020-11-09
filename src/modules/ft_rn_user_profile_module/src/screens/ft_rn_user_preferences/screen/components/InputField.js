import React, { Component } from 'react';
import {
  TextInput as RNTextInput
} from 'react-native';
import APP_COLORS from '../res/colors';
import i18n, {getFlipForRTLStyle, isRTL} from '../utils/localization/I18n';

export default class TextInput extends Component {

  focus() {
    this._field.focus();
  }

  blur() {
    this._field.blur();
  }

  render() {
    let {placeholder} = this.props;
    placeholder = placeholder && i18n.t(placeholder);
    return(
      <RNTextInput
        {...this.props}
        ref={(c) => this._field = c}
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor={APP_COLORS.LIGHT_GREY}
        autoCapitalize={this.props.autoCapitalize || 'none'}
        returnKeyType={this.props.returnKeyType || 'next'}
        style={[styles.textInput, isRTL && {textAlign: 'right'}, this.props.style, getFlipForRTLStyle()]}
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
};
