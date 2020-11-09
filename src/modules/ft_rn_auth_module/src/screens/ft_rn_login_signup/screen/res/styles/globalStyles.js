import { StyleSheet, Platform } from 'react-native';
import APP_COLORS from '../colors';
import { design } from 'rn_fast_track_uilib';
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: design['--global--primary--BackgroundColor']?design['--global--primary--BackgroundColor']:APP_COLORS.COLOR_WHITE,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});
