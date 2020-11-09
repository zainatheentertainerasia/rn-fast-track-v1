import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

class index extends Component {
  render() {
    const { title, onPress, backgroundColor } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[{ backgroundColor }, styles.btn]}>
          <Text>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 15,
  },
});
