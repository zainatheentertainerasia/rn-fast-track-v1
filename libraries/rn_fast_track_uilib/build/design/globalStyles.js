import { StyleSheet, Platform } from 'react-native';
import APP_COLORS from '../colors';
export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: APP_COLORS.COLOR_WHITE,
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});
