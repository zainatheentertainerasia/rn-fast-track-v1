import React, { Component, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Text from '../components/Text';
import i18n, {isRTL} from '../utils/localization/I18n';

interface STATE {
  selected_outlet: [];
  selectedOutletId: number;
}
export default class ErrorModal extends Component<any, STATE> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected_outlet: [],
      selectedOutletId: 0,
    };
  }

  UNSAFE_componentWillMount() {
    const { selectedOutlet } = this.props;

    this.setState({
      selected_outlet: selectedOutlet,
    });
  }

  handleDone = () => {
    console.log('handleSubmit');
    //
  };

  _handleCountrySelect = (id: number) => {
    this.setState({ selectedOutletId: id });
  };

  renderItem = (outlet: any) => {
    const { selected_outlet } = this.state;
    const { id, name, human_location, distance } = outlet.item;

    let okayDistance: any = 0;
    if (distance >= 1000) {
      okayDistance = Math.round(distance / 1000) + 'km';
    } else {
      okayDistance = distance + 'm';
    }
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this._handleCountrySelect(id)}
        style={styles.listItem}
      >
        <Feather
          name='map-pin'
          size={20}
          color='blue'
          onPress={() => {
            console.log('location clicked');
          }}
        />
        <View
          style={{
            paddingStart: 15,
            paddingTop: 10,
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Text isRTL={isRTL} style={styles.listItemText}>{name}</Text>
          <Text isRTL={isRTL} style={styles.listItemText}>{human_location}</Text>
        </View>
        <Text isRTL={isRTL} style={styles.distanceText}>{okayDistance}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const {
      isVisible,
      disable,
      title,
      outlets,
      selectedOutlet,
      onDone,
    } = this.props;
    return (
      <Modal
        animationIn='slideInDown'
        animationInTiming={700}
        animationOut='slideOutUp'
        animationOutTiming={700}
        isVisible={isVisible}
        hasBackdrop={true} //true due to design requirement
        coverScreen={true}
        //style={styles.modalStyle} //commented out due to android design
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.cmParent}>
            <View style={styles.cmHeader}>
              <Text isRTL={isRTL} style={styles.cmHeaderText}>{title}</Text>
              <Text
                isRTL={isRTL}
                onPress={() => {
                  onDone(this.state.selected_outlet);
                  disable();
                }}
                style={styles.doneButton}
              >
                Done
              </Text>
            </View>
            <View style={styles.cmOutletsCount}>
              <Feather
                name='map-pin'
                size={20}
                color='white'
                onPress={() => {
                  console.log('location clicked');
                }}
              />
              <Text isRTL={isRTL} style={styles.cmOutletsCountText}>5 Outlets</Text>
            </View>

            <View style={{ flex: 1 }}>
              <FlatList
                data={outlets}
                //keyExtractor={(item, index) => item}
                //ref={(e) => (this.categoryList = e)}
                renderItem={(country) => this.renderItem(country)}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'MuseoSans300',
  },
  modalStyle: {
    margin: 0,
  },
  cmParent: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  cmHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  cmOutletsCount: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 35,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  cmOutletsCountText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'MuseoSans500',
    color: 'white',
    paddingStart: 10,
  },

  cmHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'MuseoSans500',
    color: 'black',
    paddingStart: 10,
  },
  doneButton: {
    fontSize: 14,
    fontFamily: 'MuseoSans500',
    paddingEnd: 10,
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
    height: 65,
    color: 'grey',
    alignItems: 'center',
    paddingStart: 15,
    borderBottomWidth: 0.7,
  },
  listItemText: {
    color: 'grey',
    flex: 1,
    fontFamily: 'MuseoSans500',
  },
  distanceText: {
    color: 'grey',
    paddingEnd: 20,
    fontFamily: 'MuseoSans500',
  },

  cmFooterParent: {
    backgroundColor: '#f2f1f1',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// export default App;
