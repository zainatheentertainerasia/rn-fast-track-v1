import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
  AsyncStorage
} from 'react-native';
import { Header } from 'react-native-elements';
import Modal from 'react-native-modal';
import Text from './Text';
import APP_COLORS from '../res/colors';
import InputField from './InputField';
import { Ionicons } from '@expo/vector-icons';
import functions from '../res/functions';
import SelectCountryModal from './SelectCountryModal';
import SelectCurrencyModal from './SelectCurrencyModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ErrorModal from './ErrorModal';
import Loader from './Loader';
import i18n, { changeLanguage, withTransation, getFlipForRTLStyle, isRTL } from '../utils/localization/I18n';

class EditAccountModal extends Component<any> {

  state = {
    countryModalVisible: false,
    nationalityModalVisible: false,
    isDatePickerVisible: false,
    currencyModalVisible: false,
    dateOfBirth: this.props.data.user.dateOfBirth,
    selectedCountry: this.props.data.user.countryOfResidence,
    selectedNationality: this.props.data.user.nationality,
    pushNotifications: this.props.data.user.pushNotifications,
    mobilePhone: this.props.data.user.mobilePhone,
    selectedCurrency: this.props.data.user.currency,
    isEnglishLanguage:i18n.language==="en"?true:false
  }

  async componentWillMount(){
    // const lang=await AsyncStorage.getItem("lang","ar");
  }

  componentWillReceiveProps(props) {
    const {
      dateOfBirth,
      countryOfResidence,
      nationality,
      pushNotifications,
      mobilePhone,
      currency,
    } = props.data.user;
    
    this.setState({
      dateOfBirth,
      selectedCountry: countryOfResidence,
      selectedNationality: nationality,
      pushNotifications: pushNotifications === 1 ? true : false,
      mobilePhone,
      selectedCurrency: currency,
    });
  }

  updateCountry = (country) => {
    this.setState({ selectedCountry: country, countryModalVisible: false });
  };

  updateCurrency = (currency) => {
    this.setState({ selectedCurrency: currency, currencyModalVisible: false });
  };

  updateNationality = (country) => {
    this.setState({
      selectedNationality: country,
      nationalityModalVisible: false,
    });
  };

  updateDOB = (selectedDate) => {
    const formattedDate = functions.getFormattedDate(
      selectedDate,
      'DD/MM/yyyy'
    );
    // console.log(formattedDate);
    this.setState({ dateOfBirth: formattedDate, isDatePickerVisible: false });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  onUpdate = async () => {
    const resp = await this.props.CallBacks.onUpdate({
      countryOfResidence: this.state.selectedCountry,
      currency: this.state.selectedCurrency,
      mobilePhone: this.state.mobilePhone,
      pushNotifications: this.state.pushNotifications,
      nationality: this.state.selectedNationality,
      dateOfBirth: this.state.dateOfBirth,
    });
    if (resp) {
      this.props.CallBacks.hideEdit();
    }
  };

  headerLeftComponent() {
    return (
      <TouchableOpacity onPress={this.props.CallBacks.hideEdit}>
        <Text isRTL={isRTL}>{i18n.t('Cancel')}</Text>
      </TouchableOpacity>
    );
  }

  headerCenterComponent() {
    return (
      <Text isRTL={isRTL} style={{fontSize: 18}}>{i18n.t('My Information')}</Text>
    );
  }

  headerRightComponent() {
    return (
      <TouchableOpacity onPress={() => this.onUpdate()}>
        <Text isRTL={isRTL}>{i18n.t('Update')}</Text>
      </TouchableOpacity>
    );
  }

  onChangeLanguge = () => {
    const isEnglishLanguage = this.state.isEnglishLanguage;
    changeLanguage(isEnglishLanguage?"ar":"en");
    this.setState({isEnglishLanguage: !isEnglishLanguage});
  }

  render() {
    const { isVisible, data } = this.props;
    // console.log('USER:', data.user);
    // console.log('STATE:', this.state);
    const {firstName, lastName, email } = data.user;
    const {error, errorText, loadingOverlayActive} = data;
    const { countryModalVisible, nationalityModalVisible, currencyModalVisible, isDatePickerVisible, dateOfBirth, selectedNationality, selectedCountry, selectedCurrency, mobilePhone, pushNotifications, isEnglishLanguage } = this.state;
    return (
      <Modal animationIn='slideInUp' hasBackdrop={false} animationOut='slideOutDown' isVisible={isVisible} style={styles.modalStyle}>
        <Header containerStyle={{borderBottomColor: APP_COLORS.LIGHT_GREY, borderBottomWidth: 1, ...getFlipForRTLStyle()}} backgroundColor={APP_COLORS.COLOR_BACKGROUND} leftComponent={this.headerLeftComponent()} centerComponent={this.headerCenterComponent()} rightComponent={this.headerRightComponent()} />
        <ScrollView scrollEnabled={false} contentContainerStyle={getFlipForRTLStyle()}>
          <View style={styles.infoRow}>
            <Text isRTL={isRTL} style={styles.rowLabel}>{i18n.t('First name')}</Text>
            <Text style={[styles.valueText, getFlipForRTLStyle(), {textAlign: isRTL ? 'left' : 'right'}]}>{firstName}</Text>
            <Ionicons name='md-lock' size={20} style={{marginLeft: 10}} color={APP_COLORS.LIGHT_GREY} />
          </View>
          <View style={styles.infoRow}>
            <Text isRTL={isRTL} style={styles.rowLabel}>{i18n.t('Last name')}</Text>
            <Text style={[styles.valueText, getFlipForRTLStyle(), {textAlign: isRTL ? 'left' : 'right'}]}>{lastName}</Text>
            <Ionicons name='md-lock' size={20} style={{marginLeft: 10}} color={APP_COLORS.LIGHT_GREY} />
          </View>
          <View style={styles.infoRow}>
            <Text isRTL={isRTL} style={styles.rowLabel}>{i18n.t('Email')}</Text>
            <Text style={[styles.valueText, getFlipForRTLStyle(), {textAlign: isRTL ? 'left' : 'right'}]}>{email}</Text>
            <Ionicons name='md-lock' size={20} style={{marginLeft: 10}} color={APP_COLORS.LIGHT_GREY} />
          </View>
          <View style={styles.infoRow}>
            <Text isRTL={isRTL} style={styles.rowLabel}>{i18n.t('Date of birth')}</Text>
            <Text onPress={() => this.setState({isDatePickerVisible: true})} placeholder='Date of birth' style={[styles.valueText, getFlipForRTLStyle(), {textAlign: isRTL ? 'left' : 'right'}]}>{dateOfBirth}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text isRTL={isRTL} style={styles.rowLabel}>{i18n.t('Nationality')}</Text>
            <Text placeholder='Nationality' style={[styles.valueText, getFlipForRTLStyle(), {textAlign: isRTL ? 'left' : 'right'}]} onPress={() => this.setState({nationalityModalVisible: true})}>{selectedNationality}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text isRTL={isRTL} style={styles.rowLabel}>{i18n.t('Country of residence')}</Text>
            <Text placeholder='Country' onPress={() => this.setState({countryModalVisible: true})} style={[styles.valueText, getFlipForRTLStyle(), {textAlign: isRTL ? 'left' : 'right'}]}>{selectedCountry}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text isRTL={isRTL} style={styles.rowLabel}>{i18n.t('Mobile number')}</Text>
            <InputField keyboardType='number-pad' onChangeText={(v) => this.setState({mobilePhone: v})} value={mobilePhone} placeholder='Mobile number' style={[styles.valueText, getFlipForRTLStyle(), {textAlign: isRTL ? 'left' : 'right'}]} />
          </View>
          <View style={styles.infoRow}>
            <Text isRTL={isRTL} style={styles.rowLabel}>{i18n.t('Currency Preference')}</Text>
            <Text placeholder='Currency' onPress={() => this.setState({currencyModalVisible: true})} style={[styles.valueText, getFlipForRTLStyle(), {textAlign: isRTL ? 'left' : 'right'}]}>{selectedCurrency}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text isRTL={isRTL} style={[styles.rowLabel, {flex: 1}]}>{i18n.t('Receive Push Notifications?')}</Text>
            <Switch value={pushNotifications} onValueChange={(v) => this.setState({pushNotifications: v})} />
          </View>
          <View style={styles.infoRow}>
            <Text isRTL={isRTL} style={[styles.rowLabel, {flex: 1}]}>{i18n.t('Change Language')}</Text>
            <Switch value={isEnglishLanguage} onValueChange={this.onChangeLanguge} />
          </View>
        </ScrollView>
        <SelectCountryModal
          selectedCountry={selectedCountry}
          handleDone={this.updateCountry}
          isVisible={countryModalVisible}
        />
        <SelectCountryModal
          selectedCountry={selectedNationality}
          handleDone={this.updateNationality}
          isVisible={nationalityModalVisible}
        />
        <SelectCurrencyModal
          selectedCurrency={selectedCurrency}
          handleDone={this.updateCurrency}
          isVisible={currencyModalVisible}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={this.updateDOB}
          onCancel={this.hideDatePicker}
        />
        <ErrorModal
          isVisible={error}
          dataString={errorText}
          hide={this.props.CallBacks.hideError}
          buttonText={'OK'}
        />
        {loadingOverlayActive && <Loader />}
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    margin: 0,
    backgroundColor: APP_COLORS.COLOR_WHITE,
    // ...getFlipForRTLStyle()
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingHorizontal: 11,
    height: 43,
    borderBottomColor: APP_COLORS.COLOR_DIVIDER,
  },
  rowLabel: {
    flex: 0.4,
    fontFamily: 'MuseoSans500',
    color: APP_COLORS.LIGHT_TEXT,
  },
  valueText: {
    flex: 0.6,
    // height: 40,
    textAlign: 'right',
    color: APP_COLORS.DARK_GREY,
  },
});

export default withTransation(EditAccountModal)
