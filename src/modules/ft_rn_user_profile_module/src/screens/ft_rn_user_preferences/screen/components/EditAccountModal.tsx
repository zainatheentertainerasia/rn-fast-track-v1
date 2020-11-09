import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import moment from "moment";
import APP_COLORS from "../res/colors";
import InputField from "./InputField";
import SelectCurrencyModal from "./SelectCurrencyModal";
import i18n, {
  changeLanguage,
  withTransation,
  getFlipForRTLStyle,
  isRTL,
} from "../utils/localization/I18n";
import { CustomComponents, FastTrackLibs, design } from "rn_fast_track_uilib";

const {
  ErrorModal,
  LoaderWithoutModal,
  CustomText,
  SelectCountryModal,
  SelectDateModal,
} = CustomComponents;
const { Ionicons, Header, Modal } = FastTrackLibs;

class EditAccountModal extends Component<any> {
  state = {
    countryModalVisible: false,
    nationalityModalVisible: false,
    isDatePickerVisible: false,
    currencyModalVisible: false,
    dateOfBirth: this.props.data.user.dateOfBirth,
    selectedCountry: this.props.data.user.countryOfResidence,
    selectedNationality: this.props.data.user.nationality,
    pushNotifications: this.props.data.user.pushNotifications,
    mobilePhone: this.props.data.user.mobilePhone,
    selectedCurrency: this.props.data.user.currency,
    isEnglishLanguage: i18n.language === "en" ? true : false,
  };

  async componentWillMount() {
    // const lang=await AsyncStorage.getItem("lang","ar");
  }

  componentWillReceiveProps(props) {
    const {
      dateOfBirth,
      countryOfResidence,
      nationality,
      pushNotifications,
      mobilePhone,
      currency,
    } = props.data.user;

    this.setState({
      dateOfBirth,
      selectedCountry: countryOfResidence,
      selectedNationality: nationality,
      pushNotifications: pushNotifications === 1 ? true : false,
      mobilePhone,
      selectedCurrency: currency,
    });
  }

  updateCountry = (country) => {
    this.props.CallBacks.updateCountryOfResidency(country);
    this.setState({ selectedCountry: country, countryModalVisible: false });
  };

  updateCurrency = (currency) => {
    this.props.CallBacks.updateCurrencyPreference(currency);
    this.setState({ selectedCurrency: currency, currencyModalVisible: false });
  };

  updateNationality = (country) => {
    this.setState({
      selectedNationality: country,
      nationalityModalVisible: false,
    });
  };

  handleDatePickerOpen = () => {
    this.setState({ isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  handleDateChange = (event, date) => {
    if (Platform.OS === "android") {
      if (date !== undefined) {
        this.setState({
          dateOfBirth: moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
            "DD/MM/YYYY"
          ),
          isDatePickerVisible: false,
        });
      }
    } else if (Platform.OS === "ios") {
      this.setState({
        dateOfBirth: moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
          "DD/MM/YYYY"
        ),
      });
    }
  };

  handleCancelOnDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  onUpdate = async () => {
    const resp = await this.props.CallBacks.onUpdate({
      countryOfResidence: this.state.selectedCountry,
      currency: this.state.selectedCurrency,
      mobilePhone: this.state.mobilePhone,
      pushNotifications: this.state.pushNotifications,
      nationality: this.state.selectedNationality,
      dateOfBirth: this.state.dateOfBirth,
    });
    if (resp) {
      this.props.CallBacks.hideEdit();
    }
  };

  headerLeftComponent() {
    return (
      <TouchableOpacity onPress={this.props.CallBacks.hideEdit}>
        <CustomText isRTL={isRTL}>{i18n.t("Cancel")}</CustomText>
      </TouchableOpacity>
    );
  }

  headerCenterComponent() {
    return (
      <CustomText isRTL={isRTL} style={{ fontSize: 18 }}>
        {i18n.t("My Information")}
      </CustomText>
    );
  }

  headerRightComponent() {
    return (
      <TouchableOpacity onPress={() => this.onUpdate()}>
        <CustomText isRTL={isRTL}>{i18n.t("Update")}</CustomText>
      </TouchableOpacity>
    );
  }

  onChangeLanguge = () => {
    const isEnglishLanguage = this.state.isEnglishLanguage;
    changeLanguage(isEnglishLanguage ? "ar" : "en");
    this.setState({ isEnglishLanguage: !isEnglishLanguage });
  };

  handleCancelOnDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  render() {
    const { isVisible, data } = this.props;
    const { firstName, lastName, email } = data.user;
    const { error, errorText, loadingOverlayActive } = data;
    const {
      countryModalVisible,
      nationalityModalVisible,
      currencyModalVisible,
      isDatePickerVisible,
      dateOfBirth,
      selectedNationality,
      selectedCountry,
      selectedCurrency,
      mobilePhone,
      pushNotifications,
    } = this.state;
    return (
      <Modal
        animationIn="slideInUp"
        hasBackdrop={false}
        animationOut="slideOutDown"
        isVisible={isVisible}
        style={styles.modalStyle}
      >
        <SelectDateModal
          isVisible={isDatePickerVisible}
          date={moment(dateOfBirth, "DD/MM/YYYY").toDate()}
          handleDone={this.hideDatePicker}
          handleDateChange={this.handleDateChange}
          handleCancel={this.hideDatePicker}
        />
        <View
          style={{
            height: "100%",
          }}
        >
          <Header
            containerStyle={{
              borderBottomColor: APP_COLORS.LIGHT_GREY,
              borderBottomWidth: 1,
              ...getFlipForRTLStyle(),
            }}
            backgroundColor={
              design["--global--primary--BackgroundColor"]
                ? design["--global--primary--BackgroundColor"]
                : APP_COLORS.COLOR_BACKGROUND
            }
            leftComponent={this.headerLeftComponent()}
            centerComponent={this.headerCenterComponent()}
            rightComponent={this.headerRightComponent()}
          />
          <ScrollView
            scrollEnabled={false}
            contentContainerStyle={[getFlipForRTLStyle()]}
          >
            <View style={styles.infoRow}>
              <CustomText isRTL={isRTL} style={styles.rowLabel}>
                {i18n.t("First name")}
              </CustomText>
              <CustomText
                style={[
                  styles.valueText,
                  getFlipForRTLStyle(),
                  { textAlign: isRTL ? "left" : "right" },
                ]}
              >
                {firstName}
              </CustomText>
              <Ionicons
                name="md-lock"
                size={20}
                style={{ marginLeft: 10 }}
                color={APP_COLORS.LIGHT_GREY}
              />
            </View>
            <View style={styles.infoRow}>
              <CustomText isRTL={isRTL} style={styles.rowLabel}>
                {i18n.t("Last name")}
              </CustomText>
              <CustomText
                style={[
                  styles.valueText,
                  getFlipForRTLStyle(),
                  { textAlign: isRTL ? "left" : "right" },
                ]}
              >
                {lastName}
              </CustomText>
              <Ionicons
                name="md-lock"
                size={20}
                style={{ marginLeft: 10 }}
                color={APP_COLORS.LIGHT_GREY}
              />
            </View>
            <View style={styles.infoRow}>
              <CustomText isRTL={isRTL} style={styles.rowLabel}>
                {i18n.t("Email")}
              </CustomText>
              <CustomText
                style={[
                  styles.valueText,
                  getFlipForRTLStyle(),
                  { textAlign: isRTL ? "left" : "right" },
                ]}
              >
                {email}
              </CustomText>
              <Ionicons
                name="md-lock"
                size={20}
                style={{ marginLeft: 10 }}
                color={APP_COLORS.LIGHT_GREY}
              />
            </View>

            {dateOfBirth !== "" ? (
              <View style={styles.infoRow}>
                <CustomText isRTL={isRTL} style={styles.rowLabel}>
                  {i18n.t("Date of birth")}
                </CustomText>
                <CustomText
                  onPress={this.handleDatePickerOpen}
                  placeholder="Date of birth"
                  style={[
                    styles.valueText,
                    getFlipForRTLStyle(),
                    { textAlign: isRTL ? "left" : "right" },
                  ]}
                >
                  {dateOfBirth}
                </CustomText>
                <Ionicons
                  name="md-lock"
                  size={20}
                  style={{ marginLeft: 10 }}
                  color={APP_COLORS.LIGHT_GREY}
                />
              </View>
            ) : (
              <View style={styles.infoRow}>
                <CustomText isRTL={isRTL} style={styles.rowLabel}>
                  {i18n.t("Date of birth")}
                </CustomText>
                <CustomText
                  onPress={this.handleDatePickerOpen}
                  placeholder="Date of birth"
                  style={[
                    styles.valueText,
                    getFlipForRTLStyle(),
                    { textAlign: isRTL ? "left" : "right" },
                  ]}
                >
                  {dateOfBirth}
                </CustomText>
              </View>
            )}

            {selectedNationality !== "" ? (
              <View style={styles.infoRow}>
                <CustomText isRTL={isRTL} style={styles.rowLabel}>
                  {i18n.t("Nationality")}
                </CustomText>
                <CustomText
                  placeholder="Nationality"
                  style={[
                    styles.valueText,
                    getFlipForRTLStyle(),
                    { textAlign: isRTL ? "left" : "right" },
                  ]}
                  onPress={() => {
                    //this.setState({ nationalityModalVisible: true });
                  }}
                >
                  {selectedNationality}
                </CustomText>
                <Ionicons
                  name="md-lock"
                  size={20}
                  style={{ marginLeft: 10 }}
                  color={APP_COLORS.LIGHT_GREY}
                />
              </View>
            ) : (
              <View style={styles.infoRow}>
                <CustomText isRTL={isRTL} style={styles.rowLabel}>
                  {i18n.t("Nationality")}
                </CustomText>
                <CustomText
                  placeholder="Nationality"
                  style={[
                    styles.valueText,
                    getFlipForRTLStyle(),
                    { textAlign: isRTL ? "left" : "right" },
                  ]}
                  onPress={() => {
                    this.setState({ nationalityModalVisible: true });
                  }}
                >
                  {selectedNationality}
                </CustomText>
              </View>
            )}

            <View style={styles.infoRow}>
              <CustomText isRTL={isRTL} style={styles.rowLabel}>
                {i18n.t("Country of residence")}
              </CustomText>
              <CustomText
                placeholder="Country"
                onPress={() => this.setState({ countryModalVisible: true })}
                style={[
                  styles.valueText,
                  getFlipForRTLStyle(),
                  { textAlign: isRTL ? "left" : "right" },
                ]}
              >
                {selectedCountry}
              </CustomText>
            </View>
            <View style={styles.infoRow}>
              <CustomText isRTL={isRTL} style={styles.rowLabel}>
                {i18n.t("Mobile number")}
              </CustomText>
              <InputField
                keyboardType="number-pad"
                onChangeText={(v) =>
                  this.setState({ mobilePhone: v }, () => {
                    this.props.CallBacks.updateMobileNumber(
                      this.state.mobilePhone
                    );
                  })
                }
                value={mobilePhone}
                placeholder="Mobile number"
                style={[
                  styles.valueText,
                  getFlipForRTLStyle(),
                  { textAlign: isRTL ? "left" : "right" },
                ]}
              />
            </View>
            <View style={styles.infoRow}>
              <CustomText isRTL={isRTL} style={styles.rowLabel}>
                {i18n.t("Currency Preference")}
              </CustomText>
              <CustomText
                placeholder="Currency"
                onPress={() => this.setState({ currencyModalVisible: true })}
                style={[
                  styles.valueText,
                  getFlipForRTLStyle(),
                  { textAlign: isRTL ? "left" : "right" },
                ]}
              >
                {selectedCurrency}
              </CustomText>
            </View>
            <View style={styles.infoRow}>
              <CustomText isRTL={isRTL} style={[styles.rowLabel, { flex: 1 }]}>
                {i18n.t("Receive Push Notifications?")}
              </CustomText>
              <Switch
                value={pushNotifications}
                onValueChange={(v) => this.setState({ pushNotifications: v })}
              />
            </View>
          </ScrollView>
        </View>
        <SelectCountryModal
          selectedCountry={selectedCountry}
          handleDone={this.updateCountry}
          isVisible={countryModalVisible}
          title={i18n.t("COUNTRY_OF_RESI_STRING")}
          isRTL={isRTL}
          i18n={i18n}
        />
        <SelectCountryModal
          selectedCountry={selectedNationality}
          handleDone={this.updateNationality}
          isVisible={nationalityModalVisible}
          title={i18n.t("Nationality")}
          isRTL={isRTL}
          i18n={i18n}
        />
        <SelectCurrencyModal
          selectedCurrency={selectedCurrency}
          handleDone={this.updateCurrency}
          isVisible={currencyModalVisible}
        />

        <ErrorModal
          isVisible={error}
          dataString={errorText}	        
          hide={this.props.CallBacks.hideError}	          
          disable={this.props.CallBacks.hideError} //hide was not prop --- disable was actually prop implementated in error modal
          buttonText={'OK'}
        />
        {loadingOverlayActive && <LoaderWithoutModal />}
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    margin: 0,
    backgroundColor: APP_COLORS.COLOR_WHITE,
    // ...getFlipForRTLStyle()
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    paddingHorizontal: 11,
    height: 43,
    borderBottomColor: APP_COLORS.COLOR_DIVIDER,
  },
  rowLabel: {
    flex: 0.4,
    fontFamily: "MuseoSans500",
    color: APP_COLORS.LIGHT_TEXT,
  },
  valueText: {
    flex: 0.6,
    // height: 40,
    textAlign: "right",
    color: APP_COLORS.DARK_GREY,
  },
});

export default withTransation(EditAccountModal);
