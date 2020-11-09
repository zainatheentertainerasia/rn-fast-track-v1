import React, { Component } from "react";
import { Text, View } from "react-native";

class index extends Component {
  render() {
    const { children,style } = this.props;
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
          {children}
        </Text>
      </View>
    );
  }
}

export default index;
