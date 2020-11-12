import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import Text from '../Text/Text';
import { Feather, Entypo } from '@expo/vector-icons';

//local imports

import APP_COLORS from '../../../design/colors';

interface STATE {
  selected_outlet: any;
}
export default class ChangeLocation extends Component<any, STATE> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected_outlet: null,
    };
  }

  UNSAFE_componentWillMount() {
    const { selectedOutlet } = this.props;

    this.setState({
      selected_outlet: selectedOutlet,
    });
  }

  _handleDone = (data: any) => {
    this.setState({ selected_outlet: data }, () => {
      this.props.onDone(this.state.selected_outlet);
      //this.props.disable();
    });
    console.log('change location ', data);
  };

  renderItem = (outlet: any) => {
    const { selected_outlet } = this.state;
    const { name, human_location, distance } = outlet.item;
    
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this._handleDone(outlet.item)}
        style={{
          flexDirection: 'row',
          height: 65,
          color: 'grey',
          alignItems: 'center',
          paddingStart: 15,
          borderBottomWidth: 0.7,
        }}
      >
        <Entypo name='location-pin' size={24} color={APP_COLORS.COLOR_BUTTON} />
        <View
          style={{
            paddingStart: 15,
            paddingTop: 10,
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ color: 'grey', flex: 1, fontFamily: 'MuseoSans500' }}
          >
            {name}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: 'grey', flex: 1, fontFamily: 'MuseoSans500' }}
          >
            {human_location}
          </Text>
        </View>
        {distance === '0m' ? null : (
          <Text
            style={{
              color: 'grey',
              paddingEnd: 20,
              fontFamily: 'MuseoSans500',
            }}
          >
            {distance}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const { isVisible, disable, title, outlets, onDone } = this.props;
    let okayOutlet = '';
    if (outlets.length === 0 || outlets.length === 1) {
      okayOutlet = outlets.length + ' Location';
    } else {
      okayOutlet = outlets.length + ' Locations';
    }
    return (
      <Modal
        animationIn='slideInDown'
        animationInTiming={700}
        animationOut='slideOutUp'
        animationOutTiming={700}
        isVisible={isVisible}
        hasBackdrop={true} //true due to design requirement
        coverScreen={true}
        //style={STYLES.modalStyle} //commented out due to android design
      >
        <SafeAreaView style={STYLES.safeAreaView}>
          <View style={STYLES.changeLocationParent}>
            <View style={STYLES.changeLocationHeader}>
              <Text style={STYLES.changeLocationHeaderText}>{title}</Text>
              <Text
                onPress={() => {
                  onDone(this.state.selected_outlet);
                  //disable();
                }}
                style={STYLES.changeLocationDoneButton}
              >
                {'Cancel'}
              </Text>
            </View>
            <View style={STYLES.changeLocationOutletsCount}>
              <Image
                source={require('../../../design/images/white_loc_icon.png')}
                resizeMode='contain'
                style={{ height: 17, width: 17 }}
              />
              <Text style={STYLES.changeLocationOutletsCountText}>
                {okayOutlet}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <FlatList
                data={outlets}
                keyExtractor={(item, index) => item.name}
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

const STYLES = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },

  //header Style
  headerParent: {
    flexDirection: 'row',
    height: 46,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingStart: 20,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'MuseoSans300',
    color: APP_COLORS.COLOR_2a2a2a,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingEnd: 20,
  },

  //change Location styles
  changeLocationParent: {
    flex: 1,
    backgroundColor: APP_COLORS.COLOR_WHITE,
    borderRadius: 10,
    overflow: 'hidden',
  },
  changeLocationHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
    backgroundColor: APP_COLORS.COLOR_WHITE,
    justifyContent: 'center',
  },
  changeLocationHeaderText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'MuseoSans500',
    color: 'black',
    paddingStart: 10,
  },
  changeLocationOutletsCount: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 35,
    backgroundColor: APP_COLORS.COLOR_666666,
    justifyContent: 'center',
  },
  changeLocationOutletsCountText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'MuseoSans500',
    color: APP_COLORS.COLOR_WHITE,
    paddingStart: 10,
  },

  changeLocationListItemSelected: {
    flexDirection: 'row',
    height: 65,
    color: 'grey',
    alignItems: 'center',
    paddingStart: 15,
    borderBottomWidth: 0.7,
    backgroundColor: APP_COLORS.COLOR_OVERLAY,
  },
  changeLocationListItem: {
    flexDirection: 'row',
    height: 65,
    color: 'grey',
    alignItems: 'center',
    paddingStart: 15,
    borderBottomWidth: 0.7,
  },
  changeLocationListItemText: {
    color: 'grey',
    flex: 1,
    fontFamily: 'MuseoSans500',
  },
  changeLocationDistanceText: {
    color: 'grey',
    paddingEnd: 20,
    fontFamily: 'MuseoSans500',
  },

  changeLocationFooterParent: {
    backgroundColor: APP_COLORS.COLOR_WHITE,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  changeLocationDoneButton: {
    fontSize: 14,
    fontFamily: 'MuseoSans500',
    paddingEnd: 10,
  },
});

// export default App;
