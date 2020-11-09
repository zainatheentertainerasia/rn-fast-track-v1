import { StyleSheet } from 'react-native';
import APP_COLORS from '../colors';
export default StyleSheet.create({
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
