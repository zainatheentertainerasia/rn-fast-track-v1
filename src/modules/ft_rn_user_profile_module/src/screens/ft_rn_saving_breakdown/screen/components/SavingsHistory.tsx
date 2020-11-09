import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  ImageBackground,
} from 'react-native';

import TopTabProfile from './TopTabProfile';
import GraphHistory from './saving_history_graph';

import i18n, { isRTL, getFlipForRTLStyle } from '../utils/localization/I18n';
// import { Port as port } from "./port";


import {
  CustomComponents,
  init_font,
  FastTrackLibs,
  design
} from 'rn_fast_track_uilib';

const {
  ErrorModal,
  Loader,
  CustomText,
  TextLabel,
  HeaderWithBackButton,
  WebViewModal,
  ResetPasswordModal,
  ResetPasswordSuccessModal,
  HistoryEmpty
} = CustomComponents;
const { AntDesign, Feather, createMaterialTopTabNavigator } = FastTrackLibs;

export default class SavingsHistory extends React.Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.data.activeTab,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      activeTab: nextProps.data.activeTab,
    });
  }

  // onChangeTab = (activeTab) => {
  //   if (activeTab === 0) {
  //     let data = {
  //       name: 'Savings Breakdown',
  //       action: 'select_savings_monthly',
  //     };
  //     this.props.CallBacks.pushAnalytics(data);
  //   } else if (activeTab === 1) {
  //     let data = {
  //       name: 'Savings Breakdown',
  //       action: 'select_savings_yearly',
  //     };
  //     this.props.CallBacks.pushAnalytics(data);
  //   }
  //   this.setState({ activeTab });
  // };

  onChangeTab = (activeTab) => {
    this.props.CallBacks.changeTab(activeTab);
  };

  hideErrorPopup = () => {
    this.props.CallBacks.onError({ error: false, message: '' });
  };

  render() {
    const { loadingOverlayActive, error, errorText } = this.props.data;
    const { onBack } = this.props.CallBacks;
    console.log(this.props.data.savings,'savings')
    const { activeTab } = this.state;

    if(this.props.data.savings === 0 || this.props.data.savings === null || this.props.data.savings === undefined){
      return <HistoryEmpty isRTL={false} i18n={i18n} title={this.props.data.title} currency={this.props.data.currency} savings={this.props.data.savings} />;
    }else{
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: design['--global--secondary--BackgroundColor']?design['--global--secondary--BackgroundColor']:'#FFFFFF',
            ...getFlipForRTLStyle(),
          }}
        >
          <View>
            <CustomText
              style={{
                fontSize: 14,
                textAlign: 'center',
                marginBottom: 12,
                marginTop: 5,
                ...getFlipForRTLStyle(),
              }}
            >
              {/*May <TextLabel>{i18n.t("SAVINGS")}</TextLabel>*/}
              {this.props.data.title}
            </CustomText>
            <CustomText
              style={{
                fontWeight: "600",
                fontSize: 17,
                marginBottom: 15,
                textAlign: 'center',
                fontFamily: 'MuseoSans700',
                ...getFlipForRTLStyle(),
              }}
            >
              {this.props.data.currency} {this.props.data.savings}
            </CustomText>
  
            <View style={{ marginHorizontal: 15 }}>
              <TopTabProfile
                activeTab={activeTab}
                onChangeTab={this.onChangeTab}
              />
              <GraphHistory {...this.props} activeTab={activeTab} />
            </View>
          </View>
        </View>
      );
    }


  }
}

const styles = StyleSheet.create({
  box: {
    padding: 16,
    marginBottom: 4,
    backgroundColor: 'red',
  },
});
