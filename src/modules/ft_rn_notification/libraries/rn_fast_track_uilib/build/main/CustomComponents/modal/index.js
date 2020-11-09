import React, { Component, Children } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import { Feather } from "@expo/vector-icons";
import TextLabel from "../Text/Text";
import Button from "../Button";

const height = Dimensions.get("window").height;

export default class ChangeLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_outlet: null,
    };
  }

  render() {
    const {
      isVisible,
      title,
      isDoneButton,
      doneButtonText,
      type,
      onPress,
      children
    } = this.props;

    let modalHeight = height;
    switch (type) {
      case "lg":
        modalHeight = height / 1.2;
        break;

      case "md":
        modalHeight = height / 1.5;
        break;

      case "sm":
        modalHeight = height / 2;
        break;
    }

    return (
      <Modal
        animationIn="slideInDown"
        animationInTiming={700}
        animationOut="slideOutUp"
        animationOutTiming={700}
        isVisible={isVisible}
        hasBackdrop={true} //true due to design requirement
        backdropOpacity={0.5}
        //style={STYLES.modalStyle} //commented out due to android design
      >
        <View
          style={[
            {
              height: modalHeight,
            },
            styles.container,
          ]}
        >
          <View style={styles.headerContainer}>
            <TextLabel
              style={{
                fontSize: 16,
                color: "rgb(37, 100, 171)",
                fontFamily: "MuseoSans700",
              }}
            >
              {title}
            </TextLabel>
          </View>

          <View style={{}}>{children}</View>

          {isDoneButton && (<View style={styles.footerContainer}>
            
              <View style={{ width: 100 }}>
                <Button
                  onPress={onPress}
                  title={doneButtonText}
                  height={30}
                  style={{
                    fontSize: 14,
                  }}
                />
              </View>
          </View>
            )}
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
  },
  headerContainer: {
    alignItems: "center",
    height: 50,
    backgroundColor: "rgb(237, 237, 237)",
    justifyContent: "center",
    borderBottomColor: "rgb(37, 100, 171)",
    borderBottomWidth: 4,
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(237, 237, 237)",
  },
});

// export default App;
