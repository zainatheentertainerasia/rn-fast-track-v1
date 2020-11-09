import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import TextLabel from '../Text/Text';
import CheckBox from '../checkbox/index2';
import Button from '../Button';
import cheersLogo from './images/cheers_logo.png';
export default class index extends Component {
  state = {
    cheersCheck: this.props.cheersChecked ? this.props.cheersCheck : false,
    checked: this.props.cheersChecked,
  };

  componentDidMount() {
    if (!this.props.cheersRules) {
      this.props.getCheersData();
    }
  }

  render() {
    if (!this.props.cheersRules) {
      console.log('false');
      return null;
    }

    const cheersRules = this.props.cheersRules;

    return (
      <View style={styles.container}>
        <Image
          source={cheersLogo}
          style={{ width: 130 }}
          resizeMode='contain'
        />
        <TextLabel
          style={{
            fontFamily: 'MuseoSans300',
            color: '#ff7175',
            marginTop: 0,
            marginRight: 16,
            marginBottom: 16,
            marginLeft: 16,
          }}
        >
          {cheersRules.product_information
            ? cheersRules.product_information
            : ''}
        </TextLabel>

        <View style={{ width: '100%' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <CheckBox
              checked={this.state.checked && this.state.cheersCheck}
              onChange={() => {
                this.setState({ cheersCheck: true, checked: true });
              }}
            />
            <TextLabel
              style={{
                fontFamily: 'MuseoSans300',
                textAlign: 'left',
                marginLeft: 10,
              }}
            >
              {cheersRules.drinking_age_confirmation_message
                ? cheersRules.drinking_age_confirmation_message
                : ''}
            </TextLabel>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 35,
            }}
          >
            <CheckBox
              checked={this.state.checked && !this.state.cheersCheck}
              onChange={() => {
                this.setState({ cheersCheck: false, checked: true });
              }}
            />
            <TextLabel
              style={{
                fontFamily: 'MuseoSans300',
                textAlign: 'left',
                marginLeft: 10,
              }}
            >
              {cheersRules.not_interested_in_cheers_offers_message
                ? cheersRules.not_interested_in_cheers_offers_message
                : ''}
            </TextLabel>
          </View>

          <Button
            title='OK'
            backgrounColor='#ff7175'
            onPress={() => {
              this.props.cheersSubmit({
                cheersCheck: this.state.cheersCheck,
                cheersChecked: this.state.checked,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
