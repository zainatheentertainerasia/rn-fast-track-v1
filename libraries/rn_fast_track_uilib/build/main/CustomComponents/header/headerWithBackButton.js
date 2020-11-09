import React, { PureComponent } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import APP_COLORS from '../../../design/colors';
import { Header as RNHeader } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import Text from '../Text/Text';
import design from '../../../design/DesignSystem/design.json';
export default class HeaderWithBackButton extends PureComponent {
  headerLeftComponent() {
    return (
      <TouchableOpacity onPress={this.props.onBack} style={{ paddingRight: 15,paddingTop:10,paddingBottom:10,paddingLeft:5 }}>
        <AntDesign name='caretleft' color={APP_COLORS.COLOR_GREY} size={16} />
      </TouchableOpacity>
    );
  }

  headerCenterComponent() {
    return <Text style={{ fontSize: 18 }}>{this.props.title}</Text>;
  }

  headerRightComponent() {
    return (
      <TouchableOpacity>
        <Text>Update</Text>
      </TouchableOpacity>
    );
  }

  render() {
    // const {title} = this.props;
    return (
      <RNHeader
        containerStyle={{
          borderBottomColor: APP_COLORS.LIGHT_GREY,
          borderBottomWidth: 1,
        }}
        backgroundColor={design['--global--primary--BackgroundColor']?design['--global--primary--BackgroundColor']:APP_COLORS.COLOR_BACKGROUND}
        leftComponent={this.headerLeftComponent()}
        centerComponent={this.headerCenterComponent()}
      />
    );
  }
}
