import React, { PureComponent } from 'react';
import {
    TouchableOpacity,
    Platform,
} from 'react-native';
import APP_COLORS from '../../res/colors';
import { Header as RNHeader } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import Text from '../Text/Text.js'
export default class Header extends PureComponent {

    headerLeftComponent() {
        return (
            <TouchableOpacity onPress={this.props.onBack}>
                <AntDesign name='caretleft' color={APP_COLORS.COLOR_GREY} size={16} />
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
            <TouchableOpacity>
                <Text>Update</Text>
            </TouchableOpacity>
        );
    }


    render() {
        // const {title} = this.props;
        return(
            <RNHeader
                containerStyle={{borderBottomColor: APP_COLORS.LIGHT_GREY, borderBottomWidth: 1}}
                backgroundColor={APP_COLORS.COLOR_BACKGROUND}
                leftComponent={this.headerLeftComponent()}
                centerComponent={this.headerCenterComponent()} />
        );
    }
}