import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import cheersLogo from "../../images/cheers_logo.png";
import i18n, {isRTL, getFlipForRTLStyle} from '../../utils/localization/I18n';

import {CustomComponents} from 'rn_fast_track_uilib';
const {CustomText,BlueButton,CustomCheckbo2}=CustomComponents;

export default class index extends Component {
  state = {
    cheersCheck: this.props.cheersChecked ? this.props.cheersCheck : false,
    checked: this.props.cheersChecked,
  };

  componentDidMount() {
    if (!this.props.cheersRules) {
      this.props.getCheersData();
    }
  }

  render() {
    if (!this.props.cheersRules) {
      console.log("false");
      return null;
    }

    const cheersRules = this.props.cheersRules;

    return (
      <View style={styles.container}>
        <Image
          source={cheersLogo}
          style={{ width: 130, ...getFlipForRTLStyle() }}
          resizeMode="contain"
        />
        <CustomText
          style={{
            fontFamily: "MuseoSans300",
            color: "#ff7175",
            marginTop: 0,
            marginRight: 16,
            marginBottom: 16,
            marginLeft: 16,
            ...getFlipForRTLStyle()
          }}
        >
          {cheersRules.product_information
            ? cheersRules.product_information
            : ""}
        </CustomText>

        <View style={{ width: "100%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <CustomCheckbo2
              checked={this.state.checked && this.state.cheersCheck}
              onChange={() => {
                this.setState({ cheersCheck: true, checked: true });
              }}
            />
            <CustomText
              style={{
                fontFamily: "MuseoSans300",
                textAlign: isRTL ? 'right' : "left",
                marginLeft: 10,
                marginRight:15,
                ...getFlipForRTLStyle()
              }}
            >
              {cheersRules.drinking_age_confirmation_message
                ? cheersRules.drinking_age_confirmation_message
                : ""}
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 35,
            }}
          >
            <CustomCheckbo2
              checked={this.state.checked && !this.state.cheersCheck}
              onChange={() => {
                this.setState({ cheersCheck: false, checked: true });
              }}
            />
            <CustomText
              style={{
                fontFamily: "MuseoSans300",
                textAlign: "left",
                marginLeft: 10,
                ...getFlipForRTLStyle()
              }}
            >
              {cheersRules.not_interested_in_cheers_offers_message
                ? cheersRules.not_interested_in_cheers_offers_message
                : ""}
            </CustomText>
          </View>

          <BlueButton
            title="OK"
            backgrounColor="#ff7175"
            onPress={() => {
              this.props.cheersSubmit({
                cheersCheck: this.state.cheersCheck,
                cheersChecked: this.state.checked,
              });
            }}
            isRTL={isRTL}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
