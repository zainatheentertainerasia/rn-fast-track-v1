import React, { PureComponent } from 'react';
import APP_COLORS from '../../../design/colors';
import { Text as RNText } from 'react-native';

export default class Text extends PureComponent {
  render() {
    let { children, placeholder, isRTL, style } = this.props;
    return (
      <RNText
        {...this.props}
        allowFontScaling={false}
        style={[
          styles.text,
          style,
          !children && { color: APP_COLORS.LIGHT_GREY },
          isRTL && styles.flipStyle,
        ]}
      >
        {children ? children : placeholder}
      </RNText>
    );
  }
}

const styles = {
  text: {
    color: '#2a2a2a',
    fontFamily: 'MuseoSans500',
    letterSpacing: 0,
    textAlign: 'center',
    fontSize: 16,
  },
  flipStyle: {
    transform: [{ scaleX: -1 }],
  },
};
