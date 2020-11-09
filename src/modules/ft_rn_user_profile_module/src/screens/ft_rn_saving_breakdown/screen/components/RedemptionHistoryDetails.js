import React, { Component } from 'react';
import { Alert, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import APP_COLORS from '../res/colors';
import moment from 'moment';
import {
  CustomComponents,
  init_font,
  FastTrackLibs,
} from 'rn_fast_track_uilib';

const {
  ErrorModal,
  Loader,
  CustomText,
  TextLabel,
  HeaderWithBackButton,
  WebViewModal,
  ResetPasswordModal,
  ResetPasswordSuccessModal,
} = CustomComponents;
const {
  AntDesign,
  Feather,
  createMaterialTopTabNavigator,
  EvilIcons,
  Modal,
} = FastTrackLibs;

export default class RedemptionHistoryDetails extends Component {
  render() {
    const { redemption, isVisible, closeModal } = this.props;
    const dateFormatter = (date) => {
      let validDate = moment(date, 'DD/MM/YYYY - HH:mm').format('YYYY-MM-DD HH:mm')
      return moment(moment.utc(validDate).toDate()).local().format('DD/MM/YYYY - HH:mm');
    }
    if (redemption === null) return <View />;
    return (
      <Modal isVisible={isVisible} animationIn='zoomIn' animationOut='zoomOut'>
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={{ alignItems: 'flex-end' }}>
              <EvilIcons onPress={closeModal} size={26} name='close' />
            </View>
            <Image style={styles.logoImg} source={{ uri: redemption.logo }} />
            <View style={styles.detailsView}>
              <View style={styles.detailsRow}>
                <CustomText style={{ flex: 0.35, color: APP_COLORS.BLUE }}>
                  Reference:
                </CustomText>
                <CustomText style={{ flex: 0.65 }}>{redemption.code}</CustomText>
              </View>
              <View style={styles.detailsRow}>
                <CustomText style={{ flex: 0.35, color: APP_COLORS.BLUE }}>
                  Merchant:
                </CustomText>
                <CustomText style={{ flex: 0.65 }}>{redemption.merchantName}</CustomText>
              </View>
              <View style={styles.detailsRow}>
                <CustomText style={{ flex: 0.35, color: APP_COLORS.BLUE }}>
                  Outlet:
                </CustomText>
                <CustomText style={{ flex: 0.65 }}>{redemption.outletName}</CustomText>
              </View>
              <View style={styles.detailsRow}>
                <CustomText style={{ flex: 0.35, color: APP_COLORS.BLUE }}>
                  Redeemed:
                </CustomText>
                <CustomText style={{ flex: 0.65 }}>{dateFormatter(redemption.date)}</CustomText>
              </View>
              <View style={styles.detailsRow}>
                <CustomText style={{ flex: 0.35, color: APP_COLORS.BLUE }}>
                  Savings:
                </CustomText>
                <CustomText style={{ flex: 0.65 }}>{redemption.savings}</CustomText>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 15,
    width: '85%',
    paddingBottom: 40,
  },
  logoImg: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    backgroundColor: 'white',
    opacity: 0.8,
  },
  detailsView: {
    marginTop: 25,
  },
  detailsRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
});
