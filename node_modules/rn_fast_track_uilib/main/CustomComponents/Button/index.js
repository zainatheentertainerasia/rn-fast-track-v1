import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from "../Text/Text";
import design from '../../../design/DesignSystem/design.json'

class blueButton extends Component {
  render() {
    const { onPress, title, backgrounColor, height,isRTL } = this.props;
    return (
      <TouchableOpacity onPressIn ={onPress}>
        <View
          style={{
            backgroundColor: backgrounColor ? backgrounColor : design["--button--BackgroundColor"],
            height: height ? height : 50,
            justifyContent: "center",
            alignItems: "center",
            width:"100%",
            borderRadius:design['--global--button-BorderRadius']?design['--global--button-BorderRadius']:0,
            borderColor :design['--button--BorderColor']?design['--button--BorderColor']:"transparent"
          }}
        >
          <CustomText style={{ color: design['--button--TextColor']?design['--button--TextColor']:"#FFFFFF",fontSize:16 }} isRTL={isRTL}>{title}</CustomText>
        </View>
      </TouchableOpacity>
    );
  }
}
export default blueButton;

const styles = StyleSheet.create({});
