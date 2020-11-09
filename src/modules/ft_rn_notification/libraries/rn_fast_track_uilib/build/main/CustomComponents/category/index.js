import React, { Component } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import CustomText from '../Text/Text';

class index extends Component {
  render() {
    const { category, onPress } = this.props;
    return (
      <TouchableOpacity onPress={()=>onPress(category)}>
        <View style={{marginRight:5}}>
          <Image source={{uri:category.image}} style={{ width: 54, height: 54 }} />
          <CustomText
            style={{
              marginTop:16,
              width: 51,
              height: 21,
              fontSize: 9,
              fontStyle: "normal",
              lineHeight: 10,
              letterSpacing: 0,
              textAlign: "center",
              color: "#2a2a2a",
            }}
          >
            {category.displayName}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  }
}

export default index;
