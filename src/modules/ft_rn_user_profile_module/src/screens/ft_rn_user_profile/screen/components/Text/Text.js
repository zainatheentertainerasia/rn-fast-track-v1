import React, { Component } from "react";
import { Text, View } from "react-native";
import i18n, { i18n_Init, changeLanguage, withTransation } from '../../utils/localization/I18n';

class index extends Component {
  render() {
    const { children, style, localize } = this.props;
    return (
      <View>
        <Text
          style={[{
            fontFamily: "MuseoSans500",
            fontSize: 16,
            fontWeight: "500",
            fontStyle: "normal",
            letterSpacing: 0,
            textAlign: "center",
            color: "#2a2a2a"
          },style]}
        >
          { localize ? i18n.t(children) : children}
        </Text>
      </View>
    );
  }
}

export default index;
