import React, { PureComponent } from 'react';
import {
    TouchableOpacity,
    Platform, Image,
} from 'react-native';
import APP_COLORS from '../../res/colors';
import { Header as RNHeader } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import Text from '../Text/Text.js'
import profileRefreshImage from "../../images/refresh-icon.png";
import settingImage from "../../images/setting-icon.png";
import {
    design
  } from 'rn_fast_track_uilib';
export default class Header extends PureComponent {

    headerLeftComponent() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    this.props.onPressBack();
                }}
                style={{ marginLeft: 8 }}
            >
                <Image
                    source={profileRefreshImage}
                    style={{ height: 25, width: 25 }}
                />
            </TouchableOpacity>
        );
    }

    headerCenterComponent() {
        return (
            <Text style={{fontSize: 18}}>{this.props.title}</Text>
        );
    }

    headerRightComponent() {
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    this.props.onPressRightButton();
                }}
                style={{ marginRight: 8 }}
            >
                <Image source={settingImage} style={{ height: 25, width: 25 }} />
            </TouchableOpacity>
        );
    }


    render() {
        // const {title} = this.props;
        return(
            <RNHeader
                containerStyle={{borderBottomColor: APP_COLORS.LIGHT_GREY, borderBottomWidth: 1}}
                backgroundColor={design['--global--primary--BackgroundColor']?design['--global--primary--BackgroundColor']:APP_COLORS.COLOR_BACKGROUND}
                leftComponent={this.headerLeftComponent()}
                centerComponent={this.headerCenterComponent()}
                rightComponent={this.headerRightComponent()}
            />
        );
    }
}