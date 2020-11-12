import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import TextLabel from "../Text/Text";
import { AntDesign } from "@expo/vector-icons";
const halfWidth = Dimensions.get("window").width / 2;
class index extends React.Component {
  state = {
    tabs: [
      {
        id: 0,
        title: "ALL OFFERS",
      },
      {
        id: 1,
        title: "CHEERS",
      },
    ],
    ativeTabIndex: this.props.activeTab ? this.props.activeTab : 0,
  };

  onPressTabHandler = (index, tab) => {
    this.setState({ ativeTabIndex: index });
    this.props.onChangeTab && this.props.onChangeTab(index, tab);
  };

  render() {
    const { ativeTabIndex } = this.state;
    const { tabs } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          scrollEnabled={tabs.length > 2 ? true : false}
          contentContainerStyle={{ width: halfWidth * tabs.length }}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            {tabs.map((tabItem, index) => {
              return (
                <View style={{ width: halfWidth }}>
                  <TouchableOpacity
                    onPress={() => this.onPressTabHandler(index, tabItem)}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 35,
                      }}
                    >
                      <TextLabel style={{ fontSize: 14 }}>
                        {tabItem.name}
                      </TextLabel>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.line,
                      {
                        backgroundColor:
                          ativeTabIndex === index ? "#F1CE66" : "#FFFFFF",
                      },
                    ]}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: 35,
  },
  line: {
    width: halfWidth,
    height: 7,
  },
});

export default index;
