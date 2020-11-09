import React, { PureComponent } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import APP_COLORS from '../res/colors';

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
const {
  AntDesign,
  Feather,
  createMaterialTopTabNavigator,
  Header,
} = FastTrackLibs;

export default class RNHeader extends PureComponent {
  headerLeftComponent() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onBack()}
        style={{
          paddingRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 5,
        }}
      >
        <AntDesign name='caretleft' color={APP_COLORS.COLOR_GREY} size={16} />
      </TouchableOpacity>
    );
  }

  headerCenterComponent() {
    return (
      <CustomText isRTL={this.props.isRTL} style={{ fontSize: 18 }}>
        {this.props.title}
      </CustomText>
    );
  }

  headerRightComponent() {
    return (
      <TouchableOpacity>
        <CustomText isRTL={this.props.isRTL}>Update</CustomText>
      </TouchableOpacity>
    );
  }

  render() {
    const { style } = this.props;
    return (
      <Header
        containerStyle={[
          {
            borderBottomColor: APP_COLORS.LIGHT_GREY,
            borderBottomWidth: 1,
            borderBottomColor: APP_COLORS.LIGHT_GREY,
            borderBottomWidth: 1,
            paddingTop: 0,
            height: 45,
            backgroundColor: design['--global--primary--BackgroundColor']?design['--global--primary--BackgroundColor']:'#fff',
          },
          style,
        ]}
        backgroundColor={APP_COLORS.COLOR_BACKGROUND}
        leftComponent={this.headerLeftComponent()}
        centerComponent={this.headerCenterComponent()}
      />
    );
  }
}
