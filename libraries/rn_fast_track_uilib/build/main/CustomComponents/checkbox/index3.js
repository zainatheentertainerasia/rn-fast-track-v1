import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import checkedImage from "./images/loc-tick-img.png";

class index extends Component {
  render() {
    const { checked } = this.props;
    return (
      <View>
        {!checked && <View style={styles.button} />}
        {checked && <Image source={require('./images/loc-tick-img.png')} style={styles.button} />}
      </View>
    );
  }
}
export default index;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#D3E0EE",
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
  },
});
