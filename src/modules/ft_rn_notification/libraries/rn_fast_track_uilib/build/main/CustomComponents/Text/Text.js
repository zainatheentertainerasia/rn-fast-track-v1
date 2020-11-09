import React, { PureComponent } from 'react';
import { Text as RNText } from 'react-native';
import APP_COLORS from '../../../design/colors';

export default class Text extends PureComponent {
  render() {
    let { children, placeholder, isRTL } = this.props;
    return (
      <RNText
        {...this.props}
        allowFontScaling={false}
        style={[
          styles.text,
          isRTL && { textAlign: 'right' },
          this.props.style,
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
    color: APP_COLORS.TEXT,
    fontFamily: 'MuseoSans500',
    letterSpacing: 0,
  },
  flipStyle: {
    transform: [{ scaleX: -1 }],
  },
};
