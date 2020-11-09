import React, { Component } from "react";
import { TextInput, StyleSheet, View } from "react-native";

export default class index extends Component {
  render() {
    const { placeholder, onChangeText, ...rest } = this.props;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"#9b9b9b"}
          onChangeText={onChangeText}
          autoCorrect={false}
          returnKeyType="done"
          autoCapitalize="none"
          {...rest}
          style={[
            styles.textInput,
            isRTL && { textAlign: 'right' },
            this.props.style,
            isRTL && styles.flipStyle,
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  textInput: {
    flex: 1,
    paddingLeft:16
  },
});
