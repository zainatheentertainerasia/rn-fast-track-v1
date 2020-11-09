import React from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import styles from "./res/styles";
import APP_COLORS from "./res/colors";

import i18n, {
  withTransation,
  getFlipForRTLStyle,
  isRTL,
} from "../screen/utils/localization/I18n";
import * as StoreReview from "expo-store-review";
import EditAccountModal from "./components/EditAccountModal";
import { Port } from "./port";
import { getItem } from "../../../utils/storage";
import {
  CustomComponents,
  init_font,
  FastTrackLibs,
} from "rn_fast_track_uilib";

const {
  ErrorModal,
  Loader,
  CustomText,
  TextLabel,
  HeaderWithBackButton,
  WebViewModal,
  SwiperModal,
  ResetPasswordModal,
  ResetPasswordSuccessModal,
} = CustomComponents;
const { AntDesign, Feather, ActionSheet } = FastTrackLibs;

const profileImagePlaceholder = require("../screen/res/images/profiles-icon.png");

const PreferenceSection = ({ heading, options }) => {
  return (
    <View style={styles.preferenceSection}>
      <CustomText isRTL={isRTL} style={styles.headingText}>
        {heading}
      </CustomText>
      <FlatList
        contentContainerStyle={{ marginTop: 10 }}
        data={options}
        renderItem={({ item }) => (
          <PreferenceOption title={item.title} onPress={item.onPress} />
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{ height: 1, backgroundColor: APP_COLORS.COLOR_DIVIDER }}
          />
        )}
      />
    </View>
  );
};

const PreferenceOption = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.preferenceOption} onPress={onPress}>
      <CustomText isRTL={isRTL} style={styles.preferenceOptionTitle}>
        {title}
      </CustomText>
      {onPress && (
        <Feather
          color={"rgb(201, 201, 205)"}
          name="chevron-right"
          size={22}
          style={{ marginRight: 3 }}
        />
      )}
    </TouchableOpacity>
  );
};

class PreferenceScreen extends React.Component<Port> {
  state = {
    isEditAccountVisible: false,
    showWebView: false,
    webViewURL: "",
    webViewTitle: "",
    showInstructionsView: false,
    instructions: [],
    instructionsViewTitle: "",
    isResetPasswordModalVisible: false,
    isResetSuccessModalVisible: false,
  };

  onClickWebView = (url: string, title: string) => {
    try {
      this.setState({
        showWebView: true,
        webViewURL: url,
        webViewTitle: title,
      });
    } catch (error) {
      console.log(error, "In on click WebView");
    }
  };

  hideWebView = () => {
    this.setState({ showWebView: !this.state.showWebView });
  };

  showInstructions = async (title: string) => {
    let instructionsList = (await getItem("AppConfigs")).instructions_list;
    this.setState({
      showInstructionsView: true,
      instructions: instructionsList,
      instructionsViewTitle: title,
    });
  };

  hideInstructionsView = () => {
    this.setState({ showInstructionsView: !this.state.showInstructionsView });
  };

  hideEditAccountModal = () => {
    this.props.CallBacks.pushAnalytics({
      name: "My Information",
      action: "click_cancel",
    });
    this.setState({ isEditAccountVisible: false });
  };

  hideErrorModal = () => {
    this.props.CallBacks.onError({ error: false, message: "" });
  };

  showResetPasswordModal = () => {
    this.setState({ isResetPasswordModalVisible: true });
  };

  hideResetPasswordModal = () => {
    this.setState({ isResetPasswordModalVisible: false });
  };

  resetPassword = async () => {
    await this.setState({ isResetPasswordModalVisible: false });
    const resp = await this.props.CallBacks.forgotPassword();
    if (resp) {
      if (resp.showDoneMessgae) {
        this.setState({ isResetSuccessModalVisible: true });
      }
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  onPressActionSheetHandler = (index) => {
    switch (index) {
      case 0:
        //this._pickCamera();
        this.props.CallBacks.logout();
        break;

      case 1:
        //this._pickImage();
        break;
    }
  };

  render() {
    const { firstName, lastName, email, profileImage } = this.props.data.user;
    const { loadingOverlayActive,travel_key } = this.props.data;
    const {
      isResetPasswordModalVisible,
      isResetSuccessModalVisible,
    } = this.state;

    const editComponentProps: Port = {
      data: this.props.data,
      CallBacks: {
        ...this.props.CallBacks,
        hideEdit: this.hideEditAccountModal,
        hideError: this.hideErrorModal,
      },
    };
    return (
      <View style={[styles.mainContainer]}>
        <WebViewModal
          urlString={this.state.webViewURL}
          headerString={this.state.webViewTitle}
          isVisible={this.state.showWebView}
          disableCalback={() => this.hideWebView()}
        />
        <SwiperModal
          slidesData={this.state.instructions}
          headerString={this.state.instructionsViewTitle}
          isVisible={this.state.showInstructionsView}
          disableCalback={() => this.hideInstructionsView()}
        />
        <HeaderWithBackButton
          isRTL={isRTL}
          style={getFlipForRTLStyle()}
          title={i18n.t("PREFERENCES")}
          onBack={this.props.CallBacks.onBack}
        />
        <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
          <View style={styles.profileDetails}>
            <Image
              style={styles.profileImage}
              source={
                profileImage ? { uri: profileImage } : profileImagePlaceholder
              }
            />
            <CustomText style={styles.nameText}>
              {firstName} {lastName}
            </CustomText>
            <CustomText style={styles.emailText}>{email}</CustomText>
            <TouchableOpacity
              onPress={() => this.setState({ isEditAccountVisible: true })}
              style={styles.editAccountButton}
            >
              <CustomText style={{ color: APP_COLORS.COLOR_BUTTON }}>
                {i18n.t("EDIT ACCOUNT")}
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={getFlipForRTLStyle()}>
            <PreferenceSection
              heading={i18n.t("My Account")}
              options={[
                {
                  title: i18n.t("Reset Password"),
                  onPress: () => this.showResetPasswordModal(),
                },
              ]}
            />
            <PreferenceSection
              heading={i18n.t("My History")}
              options={[
                {
                  title: i18n.t("Savings History"),
                  onPress: () => this.props.CallBacks.onSavingHistoryClick(),
                },
                {
                  title: i18n.t("Redemption History"),
                  onPress: () =>
                    this.props.CallBacks.onRedemptionHistoryClick(),
                },
              ]}
            />
            {travel_key === true ? (<PreferenceSection
              heading={i18n.t("Help & Support")}
              options={[
                {
                  title: i18n.t("Help & Live Chat"),
                  onPress: () => {
                    let title = i18n.t("Help & Live Chat");
                    this.onClickWebView(this.props.data.helpAndChatURL, title);
                  },
                },
                {
                  title: i18n.t("Instructions"),
                  onPress: () => {
                    let title = i18n.t("Instructions");
                    this.showInstructions(title);
                  },
                },
                {
                  title: i18n.t("Rules of Use"),
                  onPress: () => {
                    let title = i18n.t("Rules of Use");
                    this.onClickWebView(this.props.data.rulesOfUserURL, title);
                  },
                },
                {
                  title: i18n.t("Hotel Rule of Use"),
                  onPress: () => {
                    let title = i18n.t("Hotel Rule of Use");
                    this.onClickWebView(this.props.data.hotelRulesOfuse, title);
                  },
                },
              ]}
            />):(<PreferenceSection
              heading={i18n.t("Help & Support")}
              options={[
                {
                  title: i18n.t("Help & Live Chat"),
                  onPress: () => {
                    let title = i18n.t("Help & Live Chat");
                    this.onClickWebView(this.props.data.helpAndChatURL, title);
                  },
                },
                {
                  title: i18n.t("Instructions"),
                  onPress: () => {
                    let title = i18n.t("Instructions");
                    this.showInstructions(title);
                  },
                },
                {
                  title: i18n.t("Rules of Use"),
                  onPress: () => {
                    let title = i18n.t("Rules of Use");
                    this.onClickWebView(this.props.data.rulesOfUserURL, title);
                  },
                },
              ]}
            />) }
            <PreferenceSection
              heading={i18n.t("About")}
              options={[
                {
                  title: i18n.t("Privacy Policy"),
                  onPress: () => {
                    let title = i18n.t("Privacy Policy");
                    this.onClickWebView(this.props.data.ppURL, title);
                  },
                },
                {
                  title: i18n.t("End User License Agreement"),
                  onPress: () => {
                    let title = i18n.t("End User License Agreement");
                    this.onClickWebView(this.props.data.eulaURL, title);
                  },
                },
                {
                  title: i18n.t("Rate Our App"),
                  onPress: async () => {
                    try {
                      const isAvailableAsync = await StoreReview.isAvailableAsync();
                      if (isAvailableAsync) {
                        StoreReview.requestReview();
                      }
                    } catch (error) {
                      console.log(error, "error");
                    }
                  },
                },
                {
                  title: i18n.t(`App Version ${this.props.data.appVersion}`),
                },
              ]}
            />
          </View>
          <TouchableOpacity
            onPress={this.showActionSheet}
            style={styles.signoutButton}
          >
            <CustomText style={{ color: APP_COLORS.COLOR_WHITE, fontSize: 16 }}>
              {i18n.t("SIGN OUT")}
            </CustomText>
          </TouchableOpacity>
        </ScrollView>
        {/* <ErrorModal isVisible={error} dataString={errorText} hide={this.hideErrorModal} /> */}

        <EditAccountModal
          {...editComponentProps}
          isVisible={this.state.isEditAccountVisible}
        />
        {loadingOverlayActive && <Loader />}
        <ResetPasswordModal
          isVisible={isResetPasswordModalVisible}
          hide={this.hideResetPasswordModal}
          resetPassword={this.resetPassword}
        />
        <ResetPasswordSuccessModal
          isVisible={isResetSuccessModalVisible}
          hide={() => this.setState({ isResetSuccessModalVisible: false })}
        />

        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={"Are you sure you want to Sign Out?"}
          options={["Sign Out", "Cancel"]}
          //cancelButtonIndex={}
          destructiveButtonIndex={0}
          onPress={this.onPressActionSheetHandler}
        />
      </View>
    );
  }
}

export default withTransation(PreferenceScreen);
