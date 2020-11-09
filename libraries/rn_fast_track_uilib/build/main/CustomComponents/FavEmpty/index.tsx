import React from 'react';

import Text from '../Text/Text';

import { View, Image, StyleSheet } from 'react-native';
import APP_COLORS from '../../../design/colors';

export default class Empty extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { i18n, isRTL } = this.props;
    return (
      <View style={{ ...fav_styles.emptyParent }}>
        <Image source={require('../../../design/images/emp_scr_img.png')} />
        <Text isRTL={isRTL} style={fav_styles.noFav}>
          {i18n.t('NO_FAV')}
        </Text>
        <Text isRTL={isRTL} style={fav_styles.favExplain}>
          {i18n.t('FAV_EXPLAIN')}
        </Text>
      </View>
    );
  }
}

const fav_styles = StyleSheet.create({
  emptyParent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(236,237,238)',
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
    backgroundColor: APP_COLORS.COLOR_WHITE,
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
