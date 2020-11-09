import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import TextLabel from "../Text/Text";
import { AntDesign } from "@expo/vector-icons";

class index extends React.Component {
  render() {
    const {title1,title2,onPressBack,onPressRightButton,rightButtonType}=this.props;
    return (
      <View style={styles.container}>

      <View style={{position:"absolute",right:0,left:0}}>
          <TextLabel>{title1}</TextLabel>
          <TextLabel style={{fontSize:11}}>{title2}</TextLabel>
        </View>

        <View style={{marginLeft:6}}>
          <TouchableOpacity onPress={onPressBack}>
            <View style={{padding:10}}>
              <AntDesign name="caretleft" size={14} color="#9F9F9F" />
            </View>
          </TouchableOpacity>
        </View>


        <View style={{position:"absolute",right:16}}>
          <TouchableOpacity onPress={onPressRightButton}>
            <View style={{padding:10}}>
              {rightButtonType==="List"&&<TextLabel style={{ fontSize: 14 }}>Map</TextLabel>}
              {rightButtonType==="Map"&&<TextLabel style={{ fontSize: 14 }}>List</TextLabel>}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    height:50
    // justifyContent: "space-between",
    // marginTop:10
  },
});

export default index;
