import React, { Component } from "react";
import { Image, StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import Input from "../Input/index";
import TextLabel from "../Text/Text";

import { AntDesign } from '@expo/vector-icons';

class index extends Component {


  componentDidMount(){
  }

  render() {
    const { onPressCancel, inputProps,i18nCollection } = this.props;
    const {isRTL}=i18nCollection;
    const i18n=i18nCollection.default;
    return (
      <View
        style={{
          height: 45,
          justifyContent: 'center',
          backgroundColor: '#F8F8FA',
        }}
      >
        <View style={styles.inputCancelWrapper}>
          <View
            style={{
              borderRadius: 5,
              height: 35,
              marginLeft: 5,
              backgroundColor: '#FFFFFF',
              marginRight: 35,
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <AntDesign name='search1' size={20} color='#5C5C5C' />
            <Input
              ref="input"
              isRTL={isRTL}
              style={{  fontSize: 16,marginLeft:5 }}
              placeholderTextColor="#5B5B5B"
              placeholder={i18n.t("Quick search by name or key")}
              onSubmitEditing={this.onSubmitEditin}
              {...inputProps}
            />
          </View>
            <TouchableOpacity onPress={onPressCancel}>
          <TextLabel isRTL={isRTL}>{i18n.t('Cancel')}</TextLabel>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  filter: {
    width: 19,
    height: 14,
    tintColor: '#ffffff',
  },
  inputCancelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginHorizontal: 15,
  },
  filterWrapper: {
    height: 43,
    width: 44,
    backgroundColor: '#c0c0c0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
