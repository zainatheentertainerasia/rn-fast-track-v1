import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "../Text/Text";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectAppLoading } from "../../../../../../src/redux/appReducer/app.selectors";
import { selectOutletList } from "../../../../../../src/redux/outletNotPersisted/outletNotPersisted.selectors";
class index extends Component {
  render() {
    const { i18nCollection, OutletList, isLoading } = this.props;
    const i18n = i18nCollection.default;
    if (OutletList&&OutletList.length !== 0||isLoading) {
      return null;
    }
    return (
      <View style={styles.container}>
        <CustomText
          styles={{ fontSize: 20, fontWeight: "700", textAlign: "center" }}
        >
          {i18n.t("Sorry no result found")}
        </CustomText>
        <CustomText
          style={{
            fontSize: 18,
            fontWeight: "500",
            fontFamily: "MuseoSans300",
            textAlign: "center",
          }}
        >
          {i18n.t("Consider broadening your filters")}
        </CustomText>
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  OutletList: selectOutletList,
  isLoading: selectAppLoading
});

export default connect(mapStateToProps, null)(index);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
