import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  ImageBackground,
} from 'react-native';

import TopTabProfile from './components/TopTabProfile';
import GraphHistory from './components/saving_history_graph';

import i18n, {
  isRTL,
  getFlipForRTLStyle,
} from '../screen/utils/localization/I18n';
import { Port as port } from './port';
import { get } from 'core-js/fn/dict';

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
} = CustomComponents;
const { AntDesign } = FastTrackLibs;

export default class OutletScreen extends React.Component<any> {
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

    const { activeTab } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
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

        <View
          style={{
            backgroundColor: design['--global--tertiary--BackgroundColor']?design['--global--tertiary--BackgroundColor']:'rgb(240, 240, 240)',
            flex: 1,
          }}
        >
          <HeaderWithBackButton
            title={i18n.t('Savings History')}
            onBack={onBack}
          />

          <View>
            <TextLabel
              style={{
                fontSize: 14,
                marginBottom: 12,
                marginTop: 5,
                ...getFlipForRTLStyle(),
              }}
            >
              {/*May <TextLabel>{i18n.t("SAVINGS")}</TextLabel>*/}
              {this.props.data.title}
            </TextLabel>
            <TextLabel
              style={{
                fontWeight: "600",
                fontSize: 17,
                marginBottom: 15,
                fontFamily: 'MuseoSans700',
                ...getFlipForRTLStyle(),
              }}
            >
              {this.props.data.currency} {this.props.data.savings}
            </TextLabel>

            <View style={{ marginHorizontal: 15 }}>
              <TopTabProfile
                activeTab={activeTab}
                onChangeTab={this.onChangeTab}
              />
              <GraphHistory {...this.props} activeTab={activeTab} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    padding: 16,
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
  },
});
