import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text/Text';
import { Entypo, Ionicons,AntDesign } from '@expo/vector-icons';
import design from '../../../design/DesignSystem/design.json';
//local imports
import APP_COLORS from '../../../design/colors';

interface headerProps {
  fav: Boolean;
  headerTitle: string;
  onBack: () => void;
  onSetFavourite: () => void;
}

const header = (props: headerProps) => {
  const { headerTitle, onBack, onSetFavourite, fav } = props;
  return (
    <View style={STYLES.headerParent}>
      <View style={STYLES.headerLeft}>
        <AntDesign
          style={{paddingLeft:17,padding:10}}
          name='caretleft'
          size={14}
          color={'#9F9F9F'}
          onPress={() => {
            onBack();
          }}
        />
      </View>
      <Text style={STYLES.headerTitle}>{headerTitle}</Text>
      <View style={STYLES.headerRight}>
        <Ionicons
          name='ios-star-outline'
          size={28}
          color={
            fav === true ? APP_COLORS.COLOR_f7ce4f : APP_COLORS.COLOR_999999
          }
          onPress={() => {
            onSetFavourite();
          }}
        />
      </View>
    </View>
  );
};

export default header;

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
    paddingStart: 2,
    backgroundColor:design['--global--primary--BackgroundColor']?design['--global--primary--BackgroundColor']:'transparent'
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
