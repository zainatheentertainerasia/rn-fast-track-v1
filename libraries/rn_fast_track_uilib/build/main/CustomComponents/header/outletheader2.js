import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
const halfWidth = Dimensions.get("window").width / 2;
const fullWidth = Dimensions.get("window").width
import CustomText from '../Text/Text';
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

  componentWillReceiveProps(props) {
    const {activeTab} = props;
    if (activeTab !== null && activeTab !== undefined) {
      this.setState({ativeTabIndex: activeTab});
    }
  }

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
                <View style={{ width: tabs.length ===1 ? fullWidth: halfWidth }}>
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
                      <CustomText localize style={{ fontSize: 14 }}>
                        {tabItem.name}
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={[
                      styles.line,
                      {
                        width: tabs.length ===1 ? fullWidth: halfWidth,
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
