import React, { Component } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import Chip from "../chip";

const padding = 7;
const { width } = Dimensions.get("window");

export default class index extends Component {
  state = {
    contentWidth: 0,
  };
  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ contentWidth: contentWidth });
  };
  render() {
    const scrollEnabled = this.state.contentWidth > width;
    const { chipsData, onDeleteChip } = this.props;
    return (
      <View style={{ paddingTop: padding }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
          <View style={styles.container}>
            {chipsData.map((chipsItem) => {
              return (
                <Chip
                  value={chipsItem.title}
                  type="removable"
                  subType={chipsItem.value ? "success" : "danger"}
                  onPress={()=>onDeleteChip(chipsItem)}
                />
              );
            })}
          </View>
        </ScrollView>

        <View
          style={{
            width: "100%",
            // height: 2,
            borderStyle: "solid",
            // borderWidth: 1,
            // borderColor: "#D8D8D8",
            paddingTop: padding,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 0,
  },
});
