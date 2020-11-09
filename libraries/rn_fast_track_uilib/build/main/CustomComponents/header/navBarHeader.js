import React from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import TextLabel from "../Text/Text";
import NavigationBar from "react-native-navbar";

class index extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <View>
        <NavigationBar
          statusBar={{ style: "light-content", tintColor: "#FFFFFF" }}
          title={{ title }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 1,
            borderWidth: 0.5,
            borderColor: "#C4BE9F",
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default index;
