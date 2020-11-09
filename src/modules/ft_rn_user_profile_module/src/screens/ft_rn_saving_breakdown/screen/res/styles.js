import { StyleSheet } from 'react-native';
import APP_COLORS from './colors';
import { getFlipForRTLStyle } from '../../../userprofileexpo/screen/utils/localization/I18n';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: APP_COLORS.COLOR_BACKGROUND,
  },
  profileDetails: {
    paddingVertical: 25,
    alignItems: 'center',
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 65,
    borderWidth: 5,
    borderColor: 'white',
    resizeMode: 'cover',
  },
  nameText: {
    fontFamily: 'MuseoSans500',
    fontSize: 16,
    marginTop: 15,
  },
  emailText: {
    marginVertical: 6,
  },
  editAccountButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    width: 155,
    height: 36,
    borderWidth: 1,
    borderColor: 'rgb(79, 153, 210)',
  },
  preferenceSection: {
    backgroundColor: APP_COLORS.COLOR_WHITE,
    paddingHorizontal: 12,
    paddingTop: 15,
    marginBottom: 8,
  },
  headingText: {
    fontFamily: 'MuseoSans500',
    fontSize: 16,
  },
  preferenceOption: {
    flexDirection: 'row',
    paddingVertical: 11,
    alignItems: 'center'
  },
  preferenceOptionTitle: {
    flex: 1,
    // color: APP_COLORS.COLOR_GREY
    color: APP_COLORS.DARK_GREY
  },
  signoutButton: {
    width: '100%',
    height: 45,
    backgroundColor: APP_COLORS.COLOR_BUTTON,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 12,
  }
});