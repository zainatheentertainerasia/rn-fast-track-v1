import React, { Component } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from '../Text/Text';
import OutletCheckBoxFilter from '../checkbox/index';


class checkBoxListing extends Component {
  render() {
    const { options,selectedAmenities } = this.props;
    // console.log(selectedAmenities,"selectedAmenities")
    return (
      <View>
        {options.map((optionsItems) => {

          return (
            <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginHorizontal:15
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={{ uri: optionsItems.image_url }}
                      style={{ height: 30, width: 30 }}
                    />
                    <CustomText
                      style={{
                        fontSize: 15,
                        paddingTop: 8,
                        paddingRight: 16,
                        paddingBottom: 8,
                        paddingLeft: 16,
                      }}
                    >
                      {optionsItems.name}
                    </CustomText>
                  </View>

                  <OutletCheckBoxFilter value={selectedAmenities[optionsItems.key]?selectedAmenities[optionsItems.key].flag:"none"}  onChange={(flag)=>this.props.addAmenity(optionsItems.key,{ name: optionsItems.name, flag: flag })} />
                </View>
              <View
                style={{
                  width: "100%",
                  height: 1,
                  borderWidth: 0.5,
                  borderColor: "#D1D1D1",
                }}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

export default checkBoxListing;

const styles = StyleSheet.create({});
