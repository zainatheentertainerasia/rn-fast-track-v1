import React, { Component } from "react";
import {  StyleSheet, View, TouchableOpacity } from "react-native";
import Switch from "../switch";
import CheckboxListing from "./checkBoxListing";
import CustomText from '../Text/Text';


class sectionlist extends Component {
  
  render() {
    const { title, data } = this.props;
    let TYPE = data ? data.section_name : "";
    let sectionName = "";
    switch (TYPE) {
      case "Type":
        sectionName = "SELECT TYPE...";
        break;
      case "Cuisine":
        sectionName = "SELECT CUISINE...";
        break;

      default:
        sectionName = TYPE;
        break;
    }
    const {i18nCollection}=this.props;

    const { getFlipForRTLStyle}=i18nCollection;
    const i18n=i18nCollection.default;
    return (
      <View style={{}}>
        <View
          style={{
            alignItems: "flex-start",
            backgroundColor: "#EFEFF3",
            paddingTop: 4,
            paddingRight: 16,
            paddingBottom: 4,
            paddingLeft: 16,
          }}
        >
          <CustomText
            style={{
              fontSize: 14,
              fontFamily: "MuseoSans700",
              color: "#000000",
              ...getFlipForRTLStyle()
            }}
          >
            {title}
          </CustomText>
        </View>

        {TYPE !== "Amenities Offered" && (
          <View>
            <TouchableOpacity onPress={() =>this.props.onPress(TYPE,data)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginRight: 20,
                }}
              >
                <CustomText
                  style={{
                    fontSize: 15,
                    paddingTop: 8,
                    paddingRight: 16,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    ...getFlipForRTLStyle()
                  }}
                >
                  {i18n.t(sectionName)}
                </CustomText>
                {TYPE === "offers" && <Switch
                onChange={this.props.onChange}
                checked={this.props.checked}
                />}

                {TYPE === "Type" && (
                  <CustomText
                    style={{
                      fontFamily: "MuseoSans700",
                      ...getFlipForRTLStyle()
                    }}
                  >
                    { this.props.selectedType == "" ? "All" : this.props.selectedType}
                  </CustomText>
                )}

                {TYPE === "Cuisine" && (
                  <CustomText
                    style={{
                      fontFamily: "MuseoSans700",
                      ...getFlipForRTLStyle()
                    }}
                  >
                    { this.props.selectedCuisine.length>0 ? this.props.selectedCuisine.map(selectedCuisineItem=>selectedCuisineItem.name).join(","):""}
                  </CustomText>
                )}
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                height: 1,
                borderWidth: 0.5,
                borderColor: "#D1D1D1",
              }}
            />
          </View>
        )}

        {TYPE === "Amenities Offered" && (
          <CheckboxListing selectedAmenities={this.props.selectedAmenities} options={data.options} addAmenity={this.props.addAmenity} />
        )}
      </View>
    );
  }
}

export default sectionlist;

const styles = StyleSheet.create({});
