import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Text from "../Text/Text";
import { Header } from "react-native-elements";
import Swiper from "react-native-swiper";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import APP_COLORS from "../../../design/colors";
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const imageHeight = Dimensions.get("screen").height * 0.7;
const imageWidth = Dimensions.get("screen").width * 0.9;

export default class SwiperModal extends Component {
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

  headerCenterComponent() {
    return (
      <Text numberOfLines={1} style={{ fontSize: 14 }}>
        {this.props.headerString}
      </Text>
    );
  }

  headerRightComponent() {
    const { disableCalback } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          disableCalback();
        }}
        style={{ marginRight: 8 }}
      >
        <Ionicons
          name="md-close"
          size={32}
          color={APP_COLORS.LIGHT_GREY}
          onPress={() => disableCalback()}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { slidesData, isVisible } = this.props;
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
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
          <View style={{ width: "100%", height: "100%" }}>
            <Header
              containerStyle={{
                borderBottomColor: APP_COLORS.LIGHT_GREY,
                borderBottomWidth: 1,
                paddingTop: 0,
                height: 45,
                backgroundColor: "#fff",
              }}
              backgroundColor={"White"}
              centerComponent={this.headerCenterComponent()}
              rightComponent={this.headerRightComponent()}
            />

            <Swiper showsPagination={false} showsButtons={false}>
              {slidesData &&
                slidesData.map((item, index) => (
                  <View
                    key={`slides-to-swiper-${index}-${item.text}`}
                    style={styles.slide}
                  >
                    <Text
                      style={{
                        fontSize: 24,
                        marginTop: 10,
                        textAlign: "center",
                      }}
                    >
                      {item.text.split("\\n")[0]}
                    </Text>
                    <Text style={{ marginTop: 5 }}>
                      {item.text.split("\\n")[1]}
                    </Text>
                    <Image
                      style={{
                        marginTop: 20,
                        height: imageHeight,
                        width: imageWidth,
                        resizeMode: "contain",
                      }}
                      source={{
                        uri: item.url,
                      }}
                    />
                  </View>
                ))}
            </Swiper>
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
    backgroundColor: "#cacaca",
    width: "100%",
    height: 50,
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
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
