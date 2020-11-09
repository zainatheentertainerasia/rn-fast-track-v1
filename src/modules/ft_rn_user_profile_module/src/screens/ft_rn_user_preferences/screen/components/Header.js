import React, { PureComponent } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import APP_COLORS from '../res/colors';
//import { Header as RNHeader } from 'react-native-elements';
//import { AntDesign } from '@expo/vector-icons';
import Text from './Text';

import {
  CustomComponents,
  init_font,
  FastTrackLibs,
} from 'rn_fast_track_uilib';

const { AntDesign, Feather, Ionicons, Header, Modal } = FastTrackLibs;

export default class Header extends PureComponent {
  headerLeftComponent() {
    return (
      <TouchableOpacity onPress={() => this.props.onBack()}>
        <AntDesign name='caretleft' color={APP_COLORS.COLOR_GREY} size={16} />
      </TouchableOpacity>
    );
  }

  headerCenterComponent() {
    return (
      <Text isRTL={this.props.isRTL} style={{ fontSize: 18 }}>
        {this.props.title}
      </Text>
    );
  }

  headerRightComponent() {
    return (
      <TouchableOpacity>
        <Text isRTL={this.props.isRTL}>Update</Text>
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
            backgroundColor: '#fff',
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
