import React from 'react';
import { View, TouchableOpacity, StyleSheet,Platform } from 'react-native';
import CustomText from '../Text/Text';
import {FastTrackLibs} from '../../Libs/index';
const {AntDesign}=FastTrackLibs;
import design from '../../../design/DesignSystem/design.json';
import {selectLocation } from "../../../../../../src/redux/location/location.selectors";
import {selectHomeCategory} from "../../../../../../src/redux/home/home.selectors";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
class index extends React.Component {
  render() {
    const {
      onPressBack,
      onPressRightButton,
      mode,
      category,
      location
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ position: 'absolute', right: 0, left: 0 }}>
          <CustomText localize style={{ textAlign: 'center' }}>
            {category.apiName}
          </CustomText>
          <CustomText localize style={{ fontSize: 11, textAlign: 'center' }}>
            {location.name?location.name:"Abu Dubai"}
          </CustomText>
        </View>

        

        <View style={{ position: 'absolute', left: 15 }}>
          <TouchableOpacity
            onPress={onPressBack}
            style={{
              paddingRight: 15,
               paddingTop: 10,
              paddingBottom: 15,
              paddingLeft: 5,
            }}
          >
            <View >
              <AntDesign
                name='caretleft'
                size={14}
                color='#9F9F9F'
                onPress={onPressBack}
                
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ position: 'absolute', right: 16 }}>
          <TouchableOpacity
            onPress={onPressRightButton}
            style={{
              paddingRight: 15,
              paddingTop: 10,
              paddingBottom: 5,
              paddingLeft: 5,
            }}
          >
            <View style={{ paddingBottom:15 }}>
              {mode === 'List' && (
                <CustomText localize style={{ fontSize: 14, paddingBottom:15 }}>
                  Map
                </CustomText>
              )}
              {mode === 'Map' && (
                <CustomText localize style={{ fontSize: 14 ,paddingBottom:15 }}>
                  List
                </CustomText>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

    flexDirection: "column",
    height:50,
    backgroundColor:design['--global--primary--BackgroundColor']?design['--global--primary--BackgroundColor']:'transparent',
    // justifyContent: "space-between",
     marginTop:Platform.OS === 'android' ? 10:0
  },
});


const mapStateToProps = createStructuredSelector({
  location: selectLocation,
  category: selectHomeCategory,
});


export default connect(mapStateToProps, null)(index);
