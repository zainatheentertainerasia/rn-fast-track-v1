import React, { Component } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
// import i18n, {i18n,isRTL, getFlipForRTLStyle} from '../../utils/localization/I18n';

import inactive_indicator from '../../../design/images/inactive_indicator.png';
import list_fav_icon from '../../../design/images/list-fav-icon.png';
import CustomText from '../Text/Text';
import design from '../../../design/DesignSystem/design.json';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {selectOutletList} from '../../../../../../src/redux/outletNotPersisted/outletNotPersisted.selectors'
const Locked = () => {
  return (
    <View>
      <Image source={inactive_indicator} style={{ height: 40, width: 40 }} />
    </View>
  );
};

const Favourite = () => {
  return (
    <View>
      <Image source={list_fav_icon} style={{ height: 40, width: 40 }} />
    </View>
  );
};

const check = (x) => {
  if (x != null && x !== '') {
    return true;
  }

  return false;
};

class index extends Component {
  state = {
    lastestpost: [],
    isFetching: false,
    page: 1,
  };

  onClickItemHandler = (outlet) => {
    this.props.onOutletClick({
      favourite: outlet.favourite,
      merchantId: outlet.merchantId,
      outletId: outlet.outletId,
    });
  };

  renderItem = (data) => {
    const { item } = data;
    const outlet = item;
    let merchantName = '';
    let outletName = '';
    let merchantLogo = '';
    let locked = false;
    let favourite = false;
    let attributes = '';
    let distance = 0;
    let lockStyle = {};

    if (outlet) {
      if (check(outlet.merchantName)) {
        merchantName = outlet.merchantName;
      }

      if (check(outlet.outletName)) {
        outletName = outlet.outletName;
        
      }

      if (check(outlet.merchantLogo)) {
        merchantLogo = outlet.merchantLogo;
      }

      if (check(outlet.attributes)) {
        attributes = outlet.attributes;
      }

      if (check(outlet.favourite)) {
        favourite = outlet.favourite;
      }

      if (check(outlet.distance)) {
        //   if (outlet.distance >= 1000) {
        //     distance = Math.round(outlet.distance / 1000) + 'km';
        //   } else {
        //     distance = outlet.distance + 'm';
        //   }

        distance = outlet.distance;
      }

      if (outlet.locked) {
        locked = outlet.locked;
        lockStyle = { opacity: 0.5 };
      }
    }

    const {i18nCollection}=this.props;
    const {i18n,isRTL, getFlipForRTLStyle}=i18nCollection;

    return (
      <TouchableOpacity onPress={() => this.onClickItemHandler(item)}>
        <View style={styles.mainWrapper}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: "space-between",
              width: '80%',
            }}
          >
            <View style={{ width: 60 }}>
              <Image
                resizeMode="contain"
                style={{ height: 46, width: 60, ...getFlipForRTLStyle() }}
                source={{
                  uri: merchantLogo,
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <View style={styles.outletNameWraooer}>
                <CustomText isRTL={isRTL} style={{ fontSize: 16, marginTop: 9,color:"rgb(40,40,40)" }}>
                  {
                    merchantName.length > 35
                      ? merchantName.substring(0, 35 - 3) + '...'
                      : merchantName
                  }
                </CustomText>
                <CustomText
                  isRTL={isRTL}
                  style={{ fontSize: 14, color: "#808285", marginTop: 3 }}
                >
                  {outletName.length > 35
                    ? outletName.substring(0, 35 - 3) + '...'
                    : outletName}
                </CustomText>

                <View style={styles.typeWrapper}>
                  {attributes.map((attribute,index) => {
                    if (attribute.type === 'text') {
                      return (
                        <CustomText
                          isRTL={isRTL}
                          style={{
                            fontSize: 12,
                            color: 'rgb(128,130,133)',
                            marginTop: 6,
                          }}
                        >
                          {attribute.value}{' '}
                        </CustomText>
                      );
                    } else {
                      return (
                        <View style={{ width: 7, height: 14, marginRight: 15 }}>
                          <Image
                            source={{ uri: attribute.value }}
                            style={{ height: 20, width: 20 }}
                          />
                        </View>
                      );
                    }
                  })}
                </View>
              </View>

              <View style={{ alignItems: 'flex-end', marginTop: 18 }}>
                <AntDesign
                  name='caretright'
                  size={14}
                  color='rgb(204, 204, 204)'
                />
                {distance === 'Okm' || distance === '0m'? <View style={{paddingTop:10}}/> :<CustomText isRTL={isRTL} style={{ color: "rgb(133, 133, 133)" }}>
                  {distance}
                </CustomText> }
                
              </View>
            </View>
          </View>

          <View style={{ position: 'absolute', top: 0, right: 0 }}>
            {locked ? <Locked /> : null}

            {favourite ? <Favourite /> : null}
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

  onRefresh = () => {
    this.setState({ isFetching: true }, function () {
      this.props.onRefresh();
      setTimeout(() => {
        this.setState({ isFetching: false });
      }, 1000);
    });
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        // this.fetchLastestPost();
        this.props.onEndReached();
      }
    );
  };

  renderFooter = () => {
    if (!this.state.isFetching) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size='large' />
      </View>
    );
  };

  render() {
    const { OutletList,data } = this.props;
    if(OutletList&&OutletList.length===0)
    {
      return null;
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={OutletList}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          extraData={this.state.selectedId}
          //
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          // refreshControl={
          //   <RefreshControl
          //       refreshing={this.state.isFetching}
          //       onRefresh={() => this.onRefresh()}
          //       title="Pull to refresh"
          //       tintColor="#fff" titleColor="#fff" colors={["red", "green", "blue"]}
          //    />
          // }

          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.4}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  OutletList:selectOutletList
});

export default connect(mapStateToProps, null)(index);

const styles = StyleSheet.create({
  mainWrapper: {
    height: 78,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    // paddingRight: 25,
    paddingBottom: 10,
    backgroundColor:design['--global--secondary--BackgroundColor']?design['--global--secondary--BackgroundColor']:"#FFFFFF"
    // paddingLeft: 10,
  },
  container: {
    flex: 1,
  },
  outletNameWraooer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  typeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
