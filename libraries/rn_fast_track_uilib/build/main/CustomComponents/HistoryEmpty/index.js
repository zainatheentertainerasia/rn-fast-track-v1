import React from 'react';

import Text from '../Text/Text';

import { View, Image, StyleSheet } from 'react-native';
import APP_COLORS from '../../../design/colors';
import appConfig from '../../../../../../src/AppConfig.json'
export default class Empty extends React.Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { i18n, isRTL, title, savings, currency } = this.props;
    return (
      <View style={{ ...fav_styles.emptyParent }}>
        <View
          style={{
            alignItems: 'center',
            height: 100,
            justifyContent: 'center',
            
          }}
        >
          <Text style={{ padding: 10 ,fontFamily: 'MuseoSans300', fontSize:16, color:'grey'}}>{title}</Text>
          <Text style={{ fontFamily: 'MuseoSans300', fontSize:20, }}>
            {currency} {savings}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'center',
            height: 170,
            width: '100%',
            backgroundColor: 'white',
            justifyContent: 'center',
          }}
        >
          <Text style={{ padding:10, fontFamily: 'MuseoSans300', fontSize:20 }}>Every save counts</Text>
          <Text style={{ fontFamily: 'MuseoSans300', fontSize:16 ,textAlign: 'center', color:'grey'}} >
            {
              "Once you start saving, you won't stop. \n Get started today and make the most \n of your "
            }{appConfig.companyName}
          </Text>
        </View>
      </View>
    );
  }
}

const fav_styles = StyleSheet.create({
  emptyParent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  favExplain: {
    fontSize: 15,
    paddingTop: 10,
    paddingLeft: 27,
    paddingRight: 16,
    textAlign: 'center',
    fontFamily: 'MuseoSans500',
    color: 'grey',
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
