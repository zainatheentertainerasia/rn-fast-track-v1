import React, { Component } from "react";
import { Image, StyleSheet, View, SafeAreaView, Platform } from "react-native";
import selectLocationImage from "../../../design/images/loc-pop-img.png";
import referenceArrow from "../../../design/images/loc-reference-arrow.png";
import Animated, { Easing } from 'react-native-reanimated';
import {isIphoneX} from "react-native-iphone-x-helper";
import CustomText from '../Text/Text';
import BlueButton from '../Button/index';
import Modal from 'react-native-modal';


const isMobileIphoneX=isIphoneX();

const { Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  eq,
  block} = Animated;


function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(1),
    easing: Easing.bounce,
  };
 
  return block([
    cond(
      clockRunning(clock),
      [
        // if the clock is already running we update the toValue, in case a new dest has been passed in
        set(config.toValue, dest),
      ],
      [
        // if the clock isn't running we reset all the animation params and start the clock
        set(state.finished, 0),
        set(state.time, 0),
        // set(state.position, value),
        set(state.frameTime, 0),
        set(config.toValue, dest),
        startClock(clock),
      ]
    ),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, stopClock(clock)),
    // we made the block return the updated position
    state.position,
  ]);
}

let topEnd=60;
let leftEnd=75;
if(isMobileIphoneX)
{
  topEnd=90;
  leftEnd=60;
}
export default class index extends Component {
  clock = new Clock();
  // and use runTiming method defined above to create a node that is going to be mapped
  // to the translateX transform.
  arrowTop = runTiming(this.clock, -120, topEnd);
  arrowLeft = runTiming(this.clock, -120, leftEnd);


  render() {
    const {i18n}=this.props;
    let top = 0;
    if(Platform.OS==="ios")
    {
    if (isMobileIphoneX) {
      top += 30;
    } else {
      top += 25;
    }
    }
    else if(Platform.OS==="android")
    {
      top=35;
    }
    
    const {onPress}=this.props;
    console.log('----------',this.props.visible)
    return (
      <Modal
      isVisible={this.props.visible}
      opacity={0.9}
      backdropColor={'black'}
      useNativeDriver={true}
    >
      <View
        style={{
          flex: 1,
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
        }}
      >

      <Animated.View style={{position:"absolute",zIndex:1001,
        top:this.arrowTop,
        left:this.arrowLeft
    }}>
      <Image source={referenceArrow} style={{height:46,width:46,top:0,left:0}} resizeMode="contain" />
      </Animated.View>

        <View style={{ flex: 1, zIndex: 1002 }}>
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Image
                source={selectLocationImage}
                style={{
                  marginTop: top,
                  marginLeft: 15,
                  borderRadius: 4,
                  height: 25,
                  width: 137,
                }}
              />
            </View>
          </SafeAreaView>
          <View style={{ flex: 1 }}>
            <CustomText
              style={{
                color: "#DFB46E",
                fontSize: 14,
                lineHeight: 16,
                textAlign: "left",
                marginHorizontal: 16,
              }}
            >{i18n.t("SELECT_LOCATION")}</CustomText>
          </View>
          <View style={{ flex: 1, justifyContent:'center', alignItems:'center' }}>
            <View style={{width:'90%'}}>
            <BlueButton onPress={onPress} title={i18n.t("GOT_IT")} />
            </View>
          </View>
        </View>

        <View style={styles.overlay}></View>
      </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
