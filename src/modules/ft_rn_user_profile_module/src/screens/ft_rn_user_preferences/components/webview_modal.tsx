import React, { Component, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Header } from "react-native-elements";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class WebViewModal extends Component<any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        color="#009688"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  onError = (errorName) => {
    return (
      <View style={styles.WebViewStyle}>
        <Text
          style={{
            textAlign: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {errorName}
        </Text>
      </View>
    );
  };

  render() {
    const { urlString, isVisible, disableCalback, headerString } = this.props;
    return (
      <Modal
        animationIn="slideInDown"
        animationInTiming={700}
        animationOut="slideOutUp"
        animationOutTiming={700}
        isVisible={isVisible}
        hasBackdrop={false}
        coverScreen={true}
        style={styles.modalStyle}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View
            style={{ backgroundColor: "white", width: "100%", height: "100%" }}
          >
            <View style={styles.headerStyle}>
              <Text>{headerString}</Text>
              <Ionicons
                style={styles.iconStyle}
                name="md-close"
                size={32}
                color="grey"
                onPress={() => disableCalback()}
              />
            </View>

            <WebView
              style={styles.WebViewStyle}
              //Loading URL
              source={{ uri: urlString }}
              //Enable Javascript support
              javaScriptEnabled={true}
              //For the Cache
              domStorageEnabled={true}
              cacheEnabled={true}
              //show vertical scrol indicator
              showsVerticalScrollIndicator={true}
              //View to show while loading the webpage
              renderLoading={this.ActivityIndicatorLoadingView}
              // //Want to show the view or not
              startInLoadingState={true}
              onLoad={(syntheticEvent) => {}}
              //error handling
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.log("WebView error: ", nativeEvent);
              }}
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;

                let f_errorName = "Web View Error";
                let f_errorMessage =
                  "Web View Http Error => " + nativeEvent.statusCode;

                //console.warn('WebView received error status code: ', nativeEvent.statusCode);
              }}
              renderError={(errorName) => this.onError(errorName)}
            />
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
  },
  headerStyle: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: '#cacaca',
    width: "100%",
    height: 50,
    borderBottomWidth: 0.2,
  },
  iconStyle: {
    position: "absolute",
    right: 16,
  },
  WebViewStyle: {
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  ActivityIndicatorStyle: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

// export default App;
