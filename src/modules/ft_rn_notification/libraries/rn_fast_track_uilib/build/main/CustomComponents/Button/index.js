import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from "../Text/Text";
class blueButton extends Component {
  render() {
    const { onPress, title, backgrounColor, height,isRTL } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            backgroundColor: backgrounColor ? backgrounColor : "#5490CA",
            height: height ? height : 50,
            justifyContent: "center",
            alignItems: "center",
            width:"100%"
          }}
        >
          <CustomText style={{ color: "#FFFFFF" }} isRTL={isRTL}>{title}</CustomText>
        </View>
      </TouchableOpacity>
    );
  }
}
export default blueButton;

const styles = StyleSheet.create({});
