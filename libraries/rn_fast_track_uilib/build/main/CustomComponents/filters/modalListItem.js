import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import tickModal from "../../../design/images/tickModal.png";
import CustomText from '../Text/Text';

export default class modalListItem extends Component {
  render() {
    const { item, onPress, isSelected } = this.props;
    return (
      <TouchableOpacity onPress={()=>onPress(item)}>
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: isSelected ? "rgb(217, 217, 217)" : "#FFFFFF",
            },
          ]}
        >
          <CustomText>{item.name}</CustomText>
          {isSelected && <Image source={tickModal} />}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 10,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
