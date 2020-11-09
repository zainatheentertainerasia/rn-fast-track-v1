import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class index extends Component {
  render() {
    const {text1,text2}=this.props;
    return (
      <View style={styles.container}>
        {text1}
        {text2}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"orange",
    paddingHorizontal:20,
    paddingVertical:20
  }
});
