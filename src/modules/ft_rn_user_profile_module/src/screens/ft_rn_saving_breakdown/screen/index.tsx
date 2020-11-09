import React from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import APP_COLORS from './res/colors';

import Header from './components/Header';

import RedemptionsHistory from './components/RedemptionsHistory';
import SavingsHistory from './components/SavingsHistory';
import i18n, { getFlipForRTLStyle, isRTL } from './utils/localization/I18n';

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
} = CustomComponents;
const { AntDesign, Feather, createMaterialTopTabNavigator } = FastTrackLibs;

import { Port } from './port';

const Tab = createMaterialTopTabNavigator();

export default class SavingsBreakdownScreen extends React.Component<Port> {
  state = {};

  hideErrorModal = () => {
    this.props.CallBacks.onError({
      error: false,
      message: '',
    });
  };

  closeDetailsModal = () => {
    this.setState({ detailsModalVisible: false });
  };

  render() {
    // const data = this.props.data.redemptionHistory;
    // const {error, errorText, loadingOverlayActive} = this.props.data;
    // const { redemption, detailsModalVisible } = this.state;
    const { loadingOverlayActive, redemptionHistory } = this.props.data;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Header
          title='Savings Breakdown'
          onBack={this.props.CallBacks.onBack}
          style={{ borderBottomWidth: 0 }}
        />
        <Tab.Navigator
          tabBarOptions={{
            inactiveTintColor: APP_COLORS.COLOR_666666,
            activeTintColor: APP_COLORS.COLOR_BLACK,
            style: {
              backgroundColor: 'white',
              marginTop: 0,
              marginBottom: 0,
              height: 40,
            },
            indicatorStyle: {
              height: 3,
              backgroundColor: APP_COLORS.COLOR_THEME,
            },
            labelStyle: {
              fontFamily: 'MuseoSans700',
              lineHeight: 16,
              ...getFlipForRTLStyle(),
            },
          }}
        >
          <Tab.Screen
            name='SavingsHistory'
            component={() => (
              <SavingsHistory
                data={this.props.data}
                CallBacks={this.props.CallBacks}
              />
            )}
            options={{
              title: i18n.t('SAVINGS'),
            }}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                // Prevent default action
                e.preventDefault();
                // pushAnalytics('Login', 'open', '', '', '', 0, true);
                // Do something with the `navigation` object
                navigation.navigate('SavingsHistory');
              },
            })}
          />
          <Tab.Screen
            name='RedemptionsHistory'
            component={() => (
              <RedemptionsHistory
                data={this.props.data}
                CallBacks={this.props.CallBacks}
              />
            )}
            options={{ title: i18n.t('REDEMPTIONS') }}
            listeners={({ navigation, route }) => ({
              tabPress: (e) => {
                // Prevent default action
                e.preventDefault();
                // pushAnalytics('Register', 'open', '', '', '', 0, true);
                // Do something with the `navigation` object
                navigation.navigate('RedemptionsHistory');
              },
            })}
          />
        </Tab.Navigator>
        {loadingOverlayActive && <Loader isVisible={loadingOverlayActive} />}
      </SafeAreaView>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
      backgroundColor: design['--global--primary--BackgroundColor']?design['--global--primary--BackgroundColor']:'white',

    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  redemptionMonthView: {
    flexDirection: 'row',
    backgroundColor: 'rgb(50, 192, 168)',
    height: 35,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  redemptionDetailsItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  redemptionDetailsView: {
    flex: 1,
    paddingLeft: 10,
  },
};
