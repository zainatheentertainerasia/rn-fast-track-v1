import React, { Component } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

class index extends Component {
  state={
    selected:false,
    text:this.props.value
  }

  setButtonSelecteded=(value)=>{
    this.setState({selected:value})
  }

  render() {
    const {selected}=this.state;
    const {onChangeText} = this.props;
    return (
      <View style={styles.input}>
      <TextInput 
        mode="none"
        returnKeyType="done"
        autoCorrect={false}
        autoFocus={false}
        autoCapitalize="none"
        spellCheck={false}
        onChangeText={onChangeText}
        style={{ flex: 1,paddingLeft:10 }}
      />
      </View>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  input: {
    backgroundColor:"#eee",
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical:15,
    height:40
  },
});

