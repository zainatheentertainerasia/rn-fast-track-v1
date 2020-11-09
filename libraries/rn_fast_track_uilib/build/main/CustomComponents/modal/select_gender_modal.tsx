import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { gendersEnglish } from '../../../design/res/countries/static';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

interface STATE {
  selected_country: string;
}
export default class SelectCountry extends Component<any, STATE> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected_country: '',
    };
  }

  handleDone = () => {
    console.log('handleSubmit');
    //
  };

  _handleCountrySelect = (name: string) => {
    this.setState({ selected_country: name });
  };

  renderItem = (country) => {
    const { selected_country } = this.state;
    const countryName = country.item[2];

    if (selected_country === null) {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this._handleCountrySelect(countryName)}
          style={
            this.state.selected_country === countryName
              ? styles.listItemSelected
              : styles.listItem
          }
        >
          <Text style={styles.listItemText}>{countryName}</Text>
        </TouchableOpacity>
      );
    } else {
      const countryName = country.item[2];

      const selected =
        this.state.selected_country === countryName ? true : false;

      if (selected === true) {
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this._handleCountrySelect(countryName)}
            style={styles.listItemSelected}
          >
            <Text style={styles.listItemText}>{countryName}</Text>

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
            onPress={() => this._handleCountrySelect(countryName)}
            style={styles.listItem}
          >
            <Text style={styles.listItemText}>{countryName}</Text>
          </TouchableOpacity>
        );
      }
    }
  };

  render() {
    const { isVisible, handleDone, countries } = this.props;

    return (
      <Modal
        isVisible={isVisible}
        animationIn='slideInDown'
        animationOut='slideOutUp'
        animationInTiming={700}
        animationOutTiming={700}
      >
        <View style={styles.cmParent}>
          <View style={styles.cmHeader}>
            <Text style={styles.cmHeaderText}>Select gender</Text>
          </View>
          <View style={{ flex: 1 }}>
            <FlatList
              data={gendersEnglish.genders}
              //keyExtractor={(item, index) => item}
              //ref={(e) => (this.categoryList = e)}
              renderItem={(country) => this.renderItem(country)}
            />
          </View>
          <View style={styles.cmFooterParent}>
            <TouchableOpacity
              style={styles.doneButton}
              activeOpacity={1}
              onPress={() => {
                handleDone(this.state.selected_country);
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
