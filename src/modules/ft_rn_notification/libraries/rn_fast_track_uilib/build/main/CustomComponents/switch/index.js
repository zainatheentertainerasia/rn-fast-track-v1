import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Switch } from "react-native-switch";

export default class index extends Component {
  state = {
    isEnabled: false,
  };
  toggleSwitch = () => {
    this.setState({ isEnabled: !this.state.isEnabled });
  };

  render() {
    const { isEnabled } = this.state;
    return (
      <View>
        <Switch
          circleSize={20}
          backgroundActive={"#7DAFE0"}
          backgroundInactive={"#C4C7CC"}
          circleActiveColor={"#3A6CAD"}
          circleInActiveColor={"#E5E5E5"}
          circleBorderWidth={0}
          barHeight={15}
          switchWidthMultiplier={1.5}
          onValueChange={this.props.onChange}
          value={this.props.checked}
          
          // onValueChange={this.toggleSwitch}
          // value={isEnabled}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
