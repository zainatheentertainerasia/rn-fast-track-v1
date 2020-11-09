import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  View,
  ImageBackground,
  Platform,
  ScrollView,
  RefreshControl
} from 'react-native';
import TextLabel from './components/Text/Text';
import Header from './components/header';
import ProfileAndCamera from './components/profileAndCamera';
import i18n, {
  getFlipForRTLStyle,
  isRTL,
} from '../screen/utils/localization/I18n';

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

  HeaderWithBackButton,
  WebViewModal,
  ResetPasswordModal,
  ResetPasswordSuccessModal,
} = CustomComponents;
const { AntDesign, Feather, createMaterialTopTabNavigator } = FastTrackLibs;

import { Port as port } from './port';
export default class OutletScreen extends React.Component<any> {
  constructor(props) {
    super(props);
    this.state = {
      refreshing:false
    };
  }

  onPressRightButton = () => {
    this.props.CallBacks.onClickSetting();
  };

  onPressLeftButtonHandler = () => {
    this.props.CallBacks.profileRefresh();
  };

  hideErrorPopup = () => {
    this.props.CallBacks.onError({ error: false, message: '' });
  };

  render() {
    const { data } = this.state;

    const { loadingOverlayActive, error, errorText, user } = this.props.data;
    const {
      onCameraClick,
      onClickSetting,
      onClickViewBreakDown,
    } = this.props.CallBacks;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: design['--global--tertiary--BackgroundColor']?design['--global--tertiary--BackgroundColor']:'#fff',
          paddingTop: Platform.OS === 'android' ? 0 : 0,
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
            // backgroundColor: 'rgb(240, 240, 240)',
            flex: 1,
          }}
        >
          <Header
            title={i18n.t('My Profile')}
            onPressBack={this.onPressLeftButtonHandler}
            onPressRightButton={this.onPressRightButton}
          />
          <ScrollView 
          horizontal={false}
          
          refreshControl={
            <RefreshControl
            tintColor = 'rgb(99,197,151)'
              refreshing={this.state.refreshing}
              onRefresh={()=>{
                this.props.CallBacks.profileRefresh(true)
                this.setState({ refreshing:false})
              }}
              
            />
          }
          >
          <ProfileAndCamera user={user} onCameraClick={onCameraClick} />

          <View style={styles.box}>
            <TextLabel
              localize
              style={{
                fontSize: 20,
                paddingBottom: 20,
                color: '#000000',
              }}
            >
              Savings Breakdown
            </TextLabel>

            <TextLabel
              style={{
                fontWeight: 'normal',
                fontSize: 15,
                fontFamily: 'MuseoSans300',
              }}
              localize
            >
              LITTLE_DETAILS_MATTER
            </TextLabel>
          </View>

          <View style={styles.box}>
            <TextLabel
              localize
              style={{
                fontSize: 20,
                color: '#000000',
              }}
            >
              Total savings this year
            </TextLabel>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 20,
                paddingRight: 0,
                paddingBottom: 20,
                paddingLeft: 0,
              }}
            >
              <TextLabel style={{ fontSize: 18, color: 'rgb(244, 188, 8)' }}>
                {this.props.data.user.currency}
              </TextLabel>
              <TextLabel
                style={{
                  fontSize: 26,
                  color: 'rgb(244, 188, 8)',
                  marginLeft: 5,
                }}
              >
                {this.props.data.user.savings === "" ? 0:this.props.data.user.savings}
              </TextLabel>
            </View>

            <TouchableOpacity onPress={onClickViewBreakDown}>
              <TextLabel
                localize
                style={{
                  textDecorationLine: 'underline',
                }}
              >
                View savings breakdown
              </TextLabel>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    padding: 16,
    marginBottom: 4,
    backgroundColor: design['--global--secondary--BackgroundColor']?design['--global--secondary--BackgroundColor']:'#FFFFFF',
  },
});