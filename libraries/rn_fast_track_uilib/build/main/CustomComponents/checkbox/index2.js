import React, { Component } from "react";
import {  StyleSheet, View } from "react-native";
import { CheckBox } from "react-native-elements";

export default class index2 extends Component {
  state = {
    checked: false,
  };

  render() {
    const {checked,onChange}=this.props;
    return (
      <View style={{height:50,width:40}}>
      <CheckBox
        checkedIcon="check-square"
        checked={checked}
        onPress={onChange}
        checkedColor='black'
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
