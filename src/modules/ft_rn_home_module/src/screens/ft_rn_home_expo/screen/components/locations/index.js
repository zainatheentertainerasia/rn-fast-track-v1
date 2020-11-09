import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {CustomComponents} from 'rn_fast_track_uilib';
const {CustomText,CustomCheckbox3}=CustomComponents;
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectLocationList} from '../../../../../../../../redux/location/location.selectors';
class index extends Component {
  state = {
    data: [],
    selectedLocation: this.props.selectedLocation
      ? this.props.selectedLocation
      : { id: '' },
    selectedId: '',
    imagePath: null,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedLocation !== this.props.selectedLocation) {
      this.setState({ selectedLocation: nextProps.selectedLocation });
    }
  }

  componentWillMount() {}

  getSelectedLocation = () => {
    return this.state.selectedLocation;
  };

  onClickLocationHandler = (data) => {
    this.setState({ selectedId: data.id, selectedLocation: data });
    this.props.onChangeLocation && this.props.onChangeLocation(data.id);
  };

  renderItem = (data, index) => {
    const { item } = data;
    const image = item.flag;
    return (
      <TouchableOpacity onPress={() => this.onClickLocationHandler(item)}>
        <View
          style={{ height: 40, flexDirection: 'row', alignItems: 'center' }}
        >
          <Image
            source={image}
            style={{ height: 25, width: 25, marginHorizontal:10 }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '85%',
            }}
          >
            <CustomText>{item.name}</CustomText>
            <CustomCheckbox3 checked={this.state.selectedLocation.id === item.id} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#D1D1D1',
        }}
      />
    );
  };

  render() {
    console.log(this.props.locationList,"this.props.selectedLocationthis.props.selectedLocation")

    return (
      <View style={{ backgroundColor: '#FFFFFF', paddingBottom: 15,height:Dimensions.get("window").height }}>
        <FlatList
          data={this.props.locationList}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          extraData={this.state.selectedLocation}
        />
      </View>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  locationList:selectLocationList
});

const mapDispatchToProps = (dispatch, props) => ({});

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(index);
