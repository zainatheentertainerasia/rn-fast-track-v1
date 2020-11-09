import React, { Component } from "react";
import { TouchableWithoutFeedback, View, Image } from "react-native";
import CustomText from '../Text/Text';

class index extends Component {
  render() {
    const { category, onPress } = this.props;
    return (
      <TouchableWithoutFeedback onPress={()=>onPress(category)}>
        <View style={{marginRight:5,justifyContent:"center",alignItems:"center"}}>
          <Image source={{uri:category.image}} style={{ width: 47, height: 47 }} />
          <CustomText
            style={{
              marginTop:10,
              width: 65,
              height: 21,
              fontSize: 8,
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
      </TouchableWithoutFeedback>
    );
  }
}

export default index;
