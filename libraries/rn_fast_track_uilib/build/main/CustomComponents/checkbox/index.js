import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import checkedImage from './images/filter_tick_icon.png';
import crossImage from './images/filter_cross_icon.png';


class index extends Component {
  state = {
    type: "none",
  };

  componentWillReceiveProps(nextProps) {
    let type = "none";
    if (nextProps.value !== "none") {
      type = nextProps.value ? "tick" : "cross";
    }
    this.setState({ type });
  }

  onClickCheckBoxHandler = (type) => {
    const actualType = this.state.type;
    let onChangeValue = false;
    if (type !== "none" && actualType === "none") {
      this.setState({ type: type });
    } else if (type === "tick" && actualType === "tick") {
      this.setState({ type: "none" });
    } else if (type === "cross" && actualType === "cross") {
      this.setState({ type: "none" });
    } else if (type !== "none") {
      this.setState({ type: type });
    }

    onChangeValue = type === "tick" ? true : false;
    this.props.onChange && this.props.onChange(onChangeValue);
  };

  render() {
    const { type } = this.state;

    let tickButtonColor = "rgb(99,197,151)"
    let CrossButtonColor = "#C4C7CC";

    if (type === "none") {
      tickButtonColor = "#C4C7CC";
      CrossButtonColor = "#C4C7CC";
    } else if (type === "tick") {
      tickButtonColor = "rgb(99,197,151)";
      CrossButtonColor = "#C4C7CC";
    } else if (type === "cross") {
      tickButtonColor = "#C4C7CC";
      CrossButtonColor = "rgb(230,116,130)";
    }
    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {
          <TouchableOpacity onPress={() => this.onClickCheckBoxHandler("tick")}>
            <View
              style={[
                styles.button,
                { backgroundColor: tickButtonColor, marginRight: 5 },
              ]}
            >
              <Image source={checkedImage} style={styles.image} />
            </View>
          </TouchableOpacity>
        }

        {
          <TouchableOpacity
            onPress={() => this.onClickCheckBoxHandler("cross")}
          >
            <View
              style={[styles.button, { backgroundColor: CrossButtonColor }]}
            >
              <Image source={crossImage} style={styles.image} />
            </View>
          </TouchableOpacity>
        }
      </View>
    );
  }
}
export default index;

const styles = StyleSheet.create({
  button: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
  },
});
