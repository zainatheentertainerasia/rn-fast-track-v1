import React, { Fragment } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

class CustomFied extends React.Component {
  render() {
    const { onPress, value, greyTip } = this.props;

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={{
          height: 50,
          padding: 10,
          marginLeft: 7,
          marginRight: 7,
          borderBottomWidth: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 30,
          borderBottomColor: 'grey',
        }}
      >
        <Text
          style={{
            flex: 1,
            fontFamily: 'MuseoSans500',
            color: value === '' ? 'grey' : 'black',
          }}
        >
          {value === '' ? greyTip : value}
        </Text>
        <AntDesign name='down' size={18} color='#2564ab' />
      </TouchableOpacity>
    );
  }
}

export default CustomFied;
