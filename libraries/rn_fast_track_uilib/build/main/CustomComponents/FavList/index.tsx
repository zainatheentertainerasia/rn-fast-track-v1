import React from 'react';

import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '../Text/Text';
import APP_COLORS from '../../../design/colors';
import design from '../../../design/DesignSystem/design.json';
import { AntDesign } from '@expo/vector-icons';

const FavLists = (props: any) => {
  const { locationName, favouriteList, onfavouriteClick, isRTL } = props;
  console.log(favouriteList, 'FavLists');
  let list = [];
  if (Object.keys(favouriteList).length !== 0) {
    for (const merchantId in favouriteList) {
      console.log('list: ', favouriteList[merchantId]);
      // const outlet = { merchant: { id: merchantId } }
      const data = {
        merchantLogo: favouriteList[merchantId].merchantLogo,
        merchantName: favouriteList[merchantId].merchantName,
        merchantId: merchantId,
        outletId: favouriteList[merchantId].outletId,
      };
      list.push(data);
    }
  }
  return (
    <View style={{backgroundColor:design['--global--tertiary--BackgroundColor']?design['--global--tertiary--BackgroundColor']:"#FFFFFF"}}>
      <View style={fav_styles.listItemParent}>
        <Text isRTL={isRTL} style={{ color: 'grey' }}>
          {locationName}
        </Text>
      </View>
      {list.map((item) => {
        const { merchantId, outletId } = item;
        console.log(merchantId, outletId);
        return (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onfavouriteClick({ merchantId, outletId })}
            style={fav_styles.listItem}
          >
            <Image
              style={fav_styles.listItemLogo}
              source={{ uri: item.merchantLogo }}
            />

            <View style={fav_styles.listItemTextParent}>
              <Text isRTL={isRTL} style={fav_styles.listItemText}>
                {item.merchantName}
              </Text>
            </View>
            <AntDesign
              name='caretright'
              size={12}
              color={APP_COLORS.COLOR_999999}
            />
            <Image
              style={fav_styles.listItemFavLogo}
              source={require('../../../design/images/list-fav-icon.png')}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const fav_styles = StyleSheet.create({
  emptyParent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: APP_COLORS.COLOR_BACKGROUND,
  },

  noFav: {
    fontSize: 28,
    paddingTop: 27,
    paddingLeft: 27,
    paddingRight: 16,
    textAlign: 'justify',
    fontFamily: 'MuseoSans500',
    lineHeight: 24,
    color: APP_COLORS.COLOR_THEME,
    letterSpacing: 1,
  },
  favExplain: {
    fontSize: 16,
    paddingTop: 10,
    paddingLeft: 27,
    paddingRight: 16,
    textAlign: 'center',
    fontFamily: 'MuseoSans500',
    color: APP_COLORS.COLOR_THEME,
    letterSpacing: 1,
  },
  listItemParent: {
    borderBottomWidth: 0.5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: design['--global--secondary--BackgroundColor']?design['--global--secondary--BackgroundColor']:APP_COLORS.COLOR_WHITE,
    alignItems: 'center',
    paddingStart: 15,
    borderBottomWidth: 0.5,
    borderColor: 'grey',
  },
  listItemLogo: {
    height: 40,
    width: 40,
  },
  listItemTextParent: {
    paddingStart: 15,
    paddingTop: 10,
    flexDirection: 'column',
    flex: 1,
  },
  listItemText: {
    color: APP_COLORS.COLOR_BUTTON,
    flex: 1,
    fontFamily: 'MuseoSans500',
  },
  listItemFavLogo: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 30,
    width: 30,
  },
});

export default FavLists;
