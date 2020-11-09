import React, { Component } from "react";
import { Image, StyleSheet, View, TouchableOpacity,Dimensions } from "react-native";
import search_icon from "../../../design/images/search_icon.png";
import filters_image from "../../../design/images/filters-image.png";
import {Badge } from 'react-native-elements'

const width=Dimensions.get("screen").width;
class index extends Component {
  render() {
    const { onSearch,onClickFilter,onSearchPress,badge, textRender } = this.props;
    const offset=badge===0?0:15;
    return (
      <View style={{ height: 43, justifyContent: "space-between" }}>
      <View
          style={{
            width: "100%",
            height: 2,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#D8D8D8",
          }}
        />
        <View style={styles.filterInputWrapper}>

        <TouchableOpacity onPress={onSearchPress}>
        <View style={{flexDirection:"row",alignItems:"center",width:width-44-offset,height: 43}}>
       
        <View style={{
          flex: 1,
        }}>
        {textRender}
        </View>

          <Image
            source={search_icon}
            style={{ width: 13, height: 13, tintColor: "#a5a5a5",marginRight:13 }}
          />
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClickFilter}>
            <View style={[styles.filterWrapper,{width:44+offset}]}>
            {badge!==0 &&
              <View style={{marginRight:5}}>
            <Badge value={badge} status="error" />
            </View>  }

              <Image source={filters_image} style={styles.filter} />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: "100%",
            height: 2,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#D8D8D8",
          }}
        />
      </View>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  filter: {
    width: 19,
    height: 14,
    tintColor: "#ffffff",
  },
  filterInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterWrapper: {
    height: 43,
    // width: 44,
    minWidth:44,
    backgroundColor: "#c0c0c0",
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
  },
});
