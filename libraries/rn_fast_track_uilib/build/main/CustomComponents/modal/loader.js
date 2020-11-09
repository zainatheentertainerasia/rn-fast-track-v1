import React, { Component, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import LOADING_GIF from "../../../design/images/loading_icon.gif";
export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isVisible } = this.props;
    return isVisible ? (
      <View style={styles.centeredView}>
        <Image
          style={{
            height: 65,
            width: 65,
            borderRadius: 10,
          }}
          source={LOADING_GIF}
        />
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0,0.5)",
    zIndex:99999,
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: "98%",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 6,
  },
  textStyle: {
    textAlign: "center",
    fontFamily: "MuseoSans500",
    fontSize: 15,
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff",
  },
  modalText: {
    fontFamily: "MuseoSans300",
    fontSize: 16,
    padding: 15,

    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    color: "#000000",
  },
  iconStyle: {
    color: "red",
  },
});

// export default App;
