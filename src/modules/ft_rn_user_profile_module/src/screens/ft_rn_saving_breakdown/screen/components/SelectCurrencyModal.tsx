import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { currencies } from '../res/constants';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

interface STATE {
  selected_currency: string;
}
export default class SelectCurrencyModal extends Component<any, STATE> {
  
  constructor(props: any) {
    super(props);
    this.state = {
      selected_currency: this.props.selectedCurrency
    };
  }

  _handleCurrencySelect = (name: string) => {
    this.setState({ selected_currency: name });
  };

  renderItem = (currency) => {
    const { selected_currency } = this.state;
    const currencyName = currency.translated_currency;

    if (selected_currency === null) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this._handleCurrencySelect(currencyName)}
          style={
            this.state.selected_currency === currencyName
              ? styles.listItemSelected
              : styles.listItem
          }
        >
          <Text style={styles.listItemText}>{currencyName}</Text>
        </TouchableOpacity>
      );
    } else {
      const currencyName = currency.translated_currency;

      const selected =
        this.state.selected_currency === currencyName ? true : false;

      if (selected === true) {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this._handleCurrencySelect(currencyName)}
            style={styles.listItemSelected}
          >
            <Text style={styles.listItemText}>{currencyName}</Text>

            <Ionicons
              style={{ paddingEnd: 10 }}
              name='md-checkmark'
              size={21}
              color='darkgrey'
            />
          </TouchableOpacity>
        );
      } else if (selected === false) {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this._handleCurrencySelect(currencyName)}
            style={styles.listItem}
          >
            <Text style={styles.listItemText}>{currencyName}</Text>
          </TouchableOpacity>
        );
      }
    }
  };

  render() {
    const { isVisible, handleDone } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        animationIn='bounceIn'
        animationOut='fadeOut'
      >
        <View style={styles.cmParent}>
          <View style={styles.cmHeader}>
            <Text style={styles.cmHeaderText}>Country of residence</Text>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={currencies}
              //keyExtractor={(item, index) => item}
              //ref={(e) => (this.categoryList = e)}
              renderItem={({item}) => this.renderItem(item)}
            />
          </View>
          <View style={styles.cmFooterParent}>
            <TouchableOpacity
              style={styles.doneButton}
              activeOpacity={1}
              onPress={() => {
                handleDone(this.state.selected_currency);
              }}
            >
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'MuseoSans500',
  },
  cmParent: {
    height: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden',
  },
  cmHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    backgroundColor: 'rgb(237, 237, 237)',
    borderBottomWidth: 3,
    borderBottomColor: 'rgb(37, 100, 171)',
    marginBottom: 5,
    justifyContent: 'center',
  },
  cmHeaderText: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'MuseoSans500',
    color: 'rgb(79,153,210)',
  },
  listItemSelected: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    color: '#A9A9A9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingStart: 15,
    backgroundColor: 'rgb(237, 237, 237)',
  },
  listItem: {
    flexDirection: 'row',
    height: 50,
    color: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    paddingStart: 15,
  },
  listItemText: {
    color: 'grey',
    flex: 1,
    fontFamily: 'MuseoSans500',
  },
  doneButton: {
    height: 30,
    borderRadius: 1,
    width: '30%',
    elevation: 2,
    backgroundColor: 'rgb(79,153,210)',
    justifyContent: 'center',
  },

  cmFooterParent: {
    backgroundColor: '#f2f1f1',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// export default App;
