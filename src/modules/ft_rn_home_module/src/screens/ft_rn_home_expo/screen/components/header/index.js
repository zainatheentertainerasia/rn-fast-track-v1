import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import SearchIcon from '../../images/search_btn.png';
import {CustomComponents,FastTrackLibs,design} from 'rn_fast_track_uilib';
const {CustomText}=CustomComponents;
const {AntDesign}=FastTrackLibs;

class index extends Component {
  render() {
    const { isShowScreenIntro, selectedLocation } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          marginBottom: 5,
          marginTop: 5,
          alignContent: 'center'
        }}
      >
        <View>
          {!isShowScreenIntro && (
            <TouchableOpacity onPress={this.props.onOpenLocation}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText style={{ marginRight: 5 }}>
                  {selectedLocation.name}
                </CustomText>
                <AntDesign name='caretdown' size={14} color='#9F9F9F' />
              </View>
            </TouchableOpacity>
          )}
        </View>
        { !isShowScreenIntro && 
        <TouchableOpacity onPress={this.props.onSearchPress}>
          <Image source={SearchIcon} />
        </TouchableOpacity>
  }
      </View>
    );
  }
}

export default index;
