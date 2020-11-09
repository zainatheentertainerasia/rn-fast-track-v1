import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import TextLabel from '../Text/Text';
const Chips = (props) => {
  const {
    value,
    onPress,
    chipStyle,
    type,
    selected,
    chipCloseStyle,
    valueStyleSelected,
    chipStyleSelected,
    valueStyle,
    subType
  } = props;
  const returnStyles = () => {
    if (type == "removable") {
      return selectableStyles;
    }
    return selectableStyles;
  };
  const returnRemovable = () => {
    if (type == "removable") {
      return (
        <TextLabel style={[returnStyles().chipCloseBtnTxt, chipCloseStyle]}>x</TextLabel>
      );
    }
  };
  return (
    <View
      style={
        selected
          ? [
              { flexDirection: "row" },
              returnStyles().chipSelected,
              chipStyle,
              chipStyleSelected,
            ]
          : [returnStyles().chip,{ flexDirection: "row",backgroundColor:subType==="success"?"#4DA39E":"#D64038" },  chipStyle]
      }
    >
      <TextLabel
        style={
          selected
            ? [
                { paddingHorizontal: 5 },
                returnStyles().valueStyleSelected,
                valueStyle,
                valueStyleSelected,
              ]
            : [{ paddingHorizontal: 5 }, returnStyles().valueStyle, valueStyle]
        }
      >
        {value}
      </TextLabel>
      <TouchableOpacity onPress={onPress}>{returnRemovable()}</TouchableOpacity>
    </View>
  );
};

const selectableStyles = StyleSheet.create({
  chipCloseBtnTxt: {
    color: "#FFF",
  },
  chip: {
    backgroundColor: "#4DA39E",
    margin: 3,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  valueStyle: {
    color: "#FFFFFF",
  },
  chipSelected: {
    backgroundColor: "#2196F3",
    margin: 5,
    padding: 6,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  valueStyleSelected: {
    color: "#FFFFFF",
  },
});
export default Chips;
