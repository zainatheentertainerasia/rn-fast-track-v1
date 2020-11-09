import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';

import i18n, { isRTL } from '../../utils/localization/I18n';

import {
  CustomComponents,
  init_font,
  FastTrackLibs,
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
} = CustomComponents;
const { AntDesign, Feather, createMaterialTopTabNavigator } = FastTrackLibs;

export default class index extends Component {
  // state={
  //   activeTab:this.props.activeTab?this.props.activeTab:0
  // }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.activeTab,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      activeTab: nextProps.activeTab,
    });
  }

  onChangeTab = (tabIndex) => {
    this.setState({ activeTab: tabIndex });
    this.props.onChangeTab && this.props.onChangeTab(tabIndex);
  };

  render() {
    const { activeTab } = this.state;
    return (
      <View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => this.onChangeTab(1)}
            style={[
              styles.tabGeneral,
              {
                backgroundColor:
                  activeTab == 0 ? 'rgb(50, 192, 168)' : 'transparent',
              },
            ]}
          >
            <View>
              <CustomText
                isRTL={isRTL}
                style={[
                  styles.tabTextGeneral,
                  { color: activeTab == 0 ? '#FFFFFF' : 'rgb(50, 192, 168)' },
                ]}
              >
                {i18n.t('MONTHLY')}
              </CustomText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onChangeTab(0)}
            style={[
              styles.tabGeneral,
              {
                backgroundColor:
                  activeTab == 1 ? 'rgb(50, 192, 168)' : 'transparent',
              },
            ]}
          >
            <View>
              <CustomText
                isRTL={isRTL}
                style={[
                  styles.tabTextGeneral,
                  { color: activeTab == 1 ? '#FFFFFF' : 'rgb(50, 192, 168)' },
                ]}
              >
                {i18n.t('YEARLY')}
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 36,
    borderColor: '#60BDA9',
    borderWidth: 1,
  },
  tabGeneral: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTextGeneral: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'MuseoSans700',
  },
});
