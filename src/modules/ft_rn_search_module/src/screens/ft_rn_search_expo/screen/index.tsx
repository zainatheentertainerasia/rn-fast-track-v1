import React from "react";
import { StyleSheet, SafeAreaView, Platform, View } from "react-native";
import { getFlipForRTLStyle } from "../screen/utils/localization/I18n";
import * as i18nCollection from "../screen/utils/localization/I18n";

import { CustomComponents } from "rn_fast_track_uilib";
const {
  Loader,
  ErrorModal,
  CustomListing,
  CustomNoRecord,
  CustomSearch,
  CustomText,
} = CustomComponents;

import { Port as port } from "./port";
export default class OutletScreen extends React.Component<port> {
  constructor(props) {
    super(props);
    this.state = {
      searchText: props.data.searchText||"",
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.data.searchText)
    {
      this.setState({searchText:nextProps.data.searchText})
    }
  }

  onDoneEditing = () => {
    this.props.CallBacks.search(this.state.searchText);
  };

  hideErrorPopup = () => {
    this.props.CallBacks.onError({ error: false, message: "" });
  };

  onEndReached = () => {
    this.props.CallBacks.loadMoreOutlet();
  };

  onRefresh = () => {
    this.props.CallBacks.outletRefresh();
  };

  onSearchHandler = (text) => {
    console.log(text, "texttexttext");
    this.setState({ searchText: text });
  };

  onPressCancel = () => {
    this.props.CallBacks.onCancle();
  };

  /**
   * This method renders custom search bar, this opens keyboard on mounting screen with auto focus prop
   */
  renderCustomSearch() {
    const {searchText = ""} = this.state
    return (
      <CustomSearch
          onPressCancel={this.onPressCancel}
          inputProps={{
            value: searchText,
            returnKeyType: "search",
            onSubmitEditing: this.onDoneEditing,
            onChangeText: this.onSearchHandler,
            autoFocus:true
          }}
          i18nCollection={i18nCollection}
        />
    ) 
  }
  render() {
    const {
      outletList,
      loadingOverlayActive,
      error,
      errorText,
    } = this.props.data;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          paddingTop: Platform.OS === "android" ? 30 : 0,
          ...getFlipForRTLStyle(),
        }}
      >
        <Loader isVisible={loadingOverlayActive} />
        <ErrorModal
          dataString={errorText}
          isVisible={error}
          disable={this.hideErrorPopup}
          buttonText={'OK'}
        />
        {this.renderCustomSearch()}
        {outletList.length !== 0 && (
          <View style={{ flex: 1 }}>
            <View style={styles.searchResult}>
              <CustomText>Search results</CustomText>
            </View>
            <CustomListing
              data={outletList}
              isSearch={true}
              onEndReached={this.onEndReached}
              onRefresh={this.onRefresh}
              onOutletClick={this.props.CallBacks.onOutletClick}
              i18nCollection={i18nCollection}
            />
          </View>
        )}

        {outletList.length === 0 && this.props.data.searched && (
          <CustomNoRecord i18nCollection={i18nCollection} />
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  searchResult: {
    marginTop: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8FA",
    borderTopColor: "#D1D1D1",
    borderTopWidth: 1,
    borderBottomColor: "#D1D1D1",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
});
