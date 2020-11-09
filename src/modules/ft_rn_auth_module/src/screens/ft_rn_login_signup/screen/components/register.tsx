import React from 'react';

import {
  View,
  TouchableOpacity,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import APP_COLORS from '../res/colors';
import auth_styles from '../res/styles/auth_styles';
import i18n, { isRTL } from '../utils/localization/I18n';
import { CustomComponents, FastTrackLibs, design } from 'rn_fast_track_uilib';
import { connect } from 'react-redux';
import {setWebViewObject } from '../../../../../../../redux/appReducer/app.actions';


import moment from "moment";
const {
  CustomText,
  CustomInput,
  WebViewModal,
  ErrorModal,
  SelectCountryModal,
  SelectDateModal,
  BlueButton,
  SimpleRadioButton,
} = CustomComponents;
const { CheckBox, Ionicons, AntDesign } = FastTrackLibs;
import {is_signup_with_demographic} from '../../../../../../../AppConfig.json';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
//import types from port

interface State {
  isPrivacyPolicyAccepted: boolean;
  isEndUserLicenceAccepted: boolean;
  showErrorModal: boolean;
  formCompleted: boolean;
  modalErrorString: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  showCountryModal: boolean;
  showNationalityModal: boolean;
  selectedCountry?: string;
  selectedNationality?: string;
  //register
  showPassword: boolean;
  showConfirmPassword: boolean;
  showWebView: boolean;
  isDatePickerVisible: boolean;
  webviewURL: string;
  webViewTitle: string;
  scrollEnabled: boolean
}

class Register extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isPrivacyPolicyAccepted: false,
      isEndUserLicenceAccepted: false,
      showErrorModal: false,
      formCompleted: false,
      modalErrorString: '',

      showCountryModal: false,
      showNationalityModal: false,
      selectedCountry: '',
      selectedNationality: '',

      email: '',
      confirmEmail: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      nationality: '',
      //register
      showPassword: false,
      showConfirmPassword: false,
      isDatePickerVisible: false,
      showWebView: false,
      webviewURL: '',
      webViewTitle: '',
      scrollEnabled:false
    };
  }

  //calback functions
  disableErrorModal = () => {
    this.setState({
      showErrorModal: false,
    });
  };

  //helper function
  handleEmail = (event: '') => {
    this.setState({
      email: event,
    });
  };

  handleConfirmEmail = (event: '') => {
    this.setState({
      confirmEmail: event,
    });
  };

  handlePassword = (event: '') => {
    this.setState({
      password: event,
    });
  };

  handleConfirmPassword = (event: '') => {
    this.setState({
      confirmPassword: event,
    });
  };

  handleFirstName = (event: '') => {
    this.setState({firstName: event});
  }

  handleLastName = (event: '') => {
    this.setState({lastName: event});
  }

  handleRegisterButton = () => {
    //fetching all the variable from state

    const { pushAnalytics ,onRegistration} = this.props;
    pushAnalytics('Register', 'click_register', '', '', '', 0, false);
    const {
      isPrivacyPolicyAccepted,
      isEndUserLicenceAccepted,
      email,
      confirmEmail,
      password,
      firstName,
      lastName,
      selectedNationality,
      dateOfBirth,
      gender,
      confirmPassword,
      selectedCountry,
    } = this.state;

    //fetching data from state to pass in callback
    let registerationData = {
      email: email,
      confirmEmail,
      password: password,
      confirmPassword: confirmPassword,
      gender,
      nationality: selectedNationality,
      dateOfBirth,
      firstName,
      lastName,
      country: selectedCountry,
      privacyPolicyCheck: isPrivacyPolicyAccepted,
      endUserLicenseAgreementCheck: isEndUserLicenceAccepted,
    };

    //callback func
    onRegistration(registerationData);
  };

  handlePrivacyPolicy = () => {
    console.log('Handle Privacy Policy',this.props.data.pp_url);
    const { pushAnalytics } = this.props;
    pushAnalytics('REgister', 'click_privay_plociy', '', '', '', 0, false);

    this.setState({
      showWebView: true,
      webviewURL: this.props.data.pp_url,
      webViewTitle: 'Privacy Policy',
    });
  };

  handleEULA = () => {
    console.log('handle eula');
    // const { pushAnalytics } = this.props.calbacks;
    // pushAnalytics('EULA', 'open', '', '', '', 0, true);
    this.setState({
      showWebView: true,
      webviewURL: this.props.data.eula_url,
      webViewTitle: 'End User License Agreement',
    });
  };

  disableWebView = () => {
    const { pushAnalytics } = this.props;
    //pushAnalytics('Register', 'open', '', '', '', 0, true);
    this.setState({ showWebView: false });
  };

  handlePasswordToolTip = () => {
    console.log('handlePasswordToolTip');
    const { pushAnalytics } = this.props;

    if (this.state.showPassword === false) {
      pushAnalytics('Register', 'click_show_password');
    }
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleConfirmPasswordToolTip = () => {
    console.log('handlePasswordToolTip');
    const { pushAnalytics } = this.props;
    if (this.state.showPassword === false) {
      pushAnalytics('Register', 'click_show_password');
    }
    this.setState({ showConfirmPassword: !this.state.showConfirmPassword });
  };

  handleSelectedCountryCallback = (country: string) => {
    this.setState({ selectedCountry: country, showCountryModal: false });
  };

  handleSelectedNationalityCallback = (country: string) => {
    this.setState({ selectedNationality: country, showNationalityModal: false });
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  }

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  }

  handleDateChange = (event, date) => {
    if (date !== undefined) {
      this.setState({
        dateOfBirth: moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").format("DD/MM/YYYY"),
      });
    }
    if (Platform.OS === 'android') this.setState({isDatePickerVisible: false});
  };

  onFocus=()=>{
    // this.setState({scrollEnabled:true})
  }

  onBlur=()=>{
    // this.setState({scrollEnabled:false})
  }

   
  render() {
    const {pushAnalytics } = this.props;
    const { showPassword, dateOfBirth, gender, showConfirmPassword, showCountryModal, showNationalityModal, selectedNationality, isDatePickerVisible } = this.state;
    const isDemographics = is_signup_with_demographic;
    return (
        <KeyboardAwareScrollView scrollEnabled={true}>
        <View style={{flex:1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ ...auth_styles.loginParent,backgroundColor:design["--global--tertiary--BackgroundColor"]?design["--global--tertiary--BackgroundColor"]:"gray" }}>
          {/* dif modals t */}

          <WebViewModal
            urlString={this.state.webviewURL}
            headerString={this.state.webViewTitle}
            isVisible={this.state.showWebView}
            disableCalback={() => this.disableWebView()}
          />
          <SelectCountryModal
            isVisible={showCountryModal}
            handleDone={(country) => {
              console.log(country);
              this.handleSelectedCountryCallback(country);
            }}
            title={i18n.t('COUNTRY_OF_RESI_STRING')}
            isRTL={isRTL}
            i18n={i18n}
          />
          <SelectCountryModal
            isVisible={showNationalityModal}
            handleDone={(country) => {
              console.log(country);
              this.handleSelectedNationalityCallback(country);
            }}
            title={i18n.t('NATIONALITY')}
            isRTL={isRTL}
            i18n={i18n}
          />
          <SelectDateModal
            isVisible={isDatePickerVisible}
            date={dateOfBirth ? moment(dateOfBirth, "DD/MM/YYYY").toDate() : moment('01/01/2000', "DD/MM/YYYY").toDate()}
            handleDone={this.hideDatePicker}
            handleDateChange={this.handleDateChange}
            handleCancel={this.hideDatePicker}
          />
          <CustomInput
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            isRTL={isRTL}
            style={auth_styles.inputField_MT16}
            placeholder={i18n.t('EMAIL_STRING')}
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            onChangeText={this.handleEmail}
            autoCapitalize='none'
            keyboardType={'email-address'}
            onSubmitEditing={() => { isDemographics ? this.refs.confirmEmail.focus() : this.refs.password.focus() }}
          />
          {isDemographics && 
            <CustomInput
            onFocus={this.onFocus}
            onBlur={this.onBlur}
              isRTL={isRTL}
              style={auth_styles.inputField_MT10}
              placeholder={i18n.t('CONFIRM_EMAIL_STRING')}
              placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
              onChangeText={this.handleConfirmEmail}
              autoCapitalize='none'
              keyboardType={'email-address'}
              ref="confirmEmail"
              onSubmitEditing={() => { this.refs.password.focus(); }}
            />
          }

          <View style={auth_styles.passwordFieldWithToggleParent}>
            <CustomInput
            onFocus={this.onFocus}
            onBlur={this.onBlur}
              isRTL={isRTL}
              style={auth_styles.passwordFieldWithToggle}
              placeholder={i18n.t('PASSWORD_STRING')}
              placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
              onChangeText={this.handlePassword}
              secureTextEntry={!showPassword}
              ref="password"
              onSubmitEditing={() => { this.refs.confirmPassword.focus(); }}
            />
            <TouchableOpacity
              style={auth_styles.p10}
              activeOpacity={1}
              onPress={() => this.handlePasswordToolTip()}
            >
              <CustomText isRTL={isRTL} style={auth_styles.toggleToolTipText}>
                {showPassword === false ? i18n.t('SHOW') : i18n.t('HIDE')}
              </CustomText>
            </TouchableOpacity>
          </View>

          <View style={auth_styles.passwordFieldWithToggleParent}>
            <CustomInput
            onFocus={this.onFocus}
            onBlur={this.onBlur}
              isRTL={isRTL}
              style={auth_styles.passwordFieldWithToggle}
              placeholder={i18n.t('CONFIRM_PASSWORD_STRING')}
              placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
              onChangeText={this.handleConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              ref="confirmPassword"
              onSubmitEditing={() => { isDemographics? this.refs.firstName.focus():null }}
            />
            <TouchableOpacity
              style={auth_styles.p10}
              activeOpacity={1}
              onPress={() => this.handleConfirmPasswordToolTip()}
            >
              <CustomText isRTL={isRTL} style={auth_styles.toggleToolTipText}>
                {showConfirmPassword === false
                  ? i18n.t('SHOW')
                  : i18n.t('HIDE')}
              </CustomText>
            </TouchableOpacity>
          </View>

          {isDemographics && 
            <>
              <CustomInput
            onFocus={this.onFocus}
            onBlur={this.onBlur}
                isRTL={isRTL}
                style={auth_styles.inputField_MT10}
                placeholder={i18n.t('FIRST_NAME')}
                placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
                onChangeText={this.handleFirstName}
                autoCapitalize='words'
                ref="firstName"
                onSubmitEditing={() => { this.refs.lastName.focus(); }}
              />

              <CustomInput
            onFocus={this.onFocus}
            onBlur={this.onBlur}
                isRTL={isRTL}
                style={auth_styles.inputField_MT10}
                placeholder={i18n.t('LAST_NAME')}
                placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
                onChangeText={this.handleLastName}
                autoCapitalize='words'
                ref="lastName"
                onSubmitEditing={() => { this.refs.lastName.focus(); }}
              />

              <View style={auth_styles.DOBandGenderView}>
                <View style={auth_styles.dobView}>
                  <CustomText isRTL={isRTL} style={auth_styles.rowLabel}>
                    {i18n.t("Date of birth")} <CustomText style={{fontSize: 10}}>({i18n.t('OPTIONAL')})</CustomText>
                  </CustomText>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={this.showDatePicker}
                    style={[auth_styles.dobField,{
                      backgroundColor:design['--input--BackgroundColor']?design['--input--BackgroundColor']:"transparent"
                    }]}
                  >
                    <CustomText
                      placeholder="MM/DD/YYYY"
                      style={[auth_styles.valueText]}
                    >
                      {dateOfBirth}
                    </CustomText>
                  </TouchableOpacity>
                </View>
                
                <View style={auth_styles.genderView}>
                  <CustomText isRTL={isRTL} style={auth_styles.rowLabel}>
                    {i18n.t("Gender")} <CustomText style={{fontSize: 10}}>({i18n.t('OPTIONAL')})</CustomText>
                  </CustomText>
                  <View style={auth_styles.genderRadiosView}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <SimpleRadioButton isSelected={gender === 'Male' ? true : false} onPress={() => this.setState({gender: 'Male'})} />
                      <CustomText style={{marginLeft: 10}}>Male</CustomText>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <SimpleRadioButton isSelected={gender === 'Female' ? true : false} onPress={() => this.setState({gender: 'Female'})} />
                      <CustomText style={{marginLeft: 10}}>Female</CustomText>
                    </View>
                  </View>
                </View>
              </View>

              <View style={[auth_styles.selectCountryParent, auth_styles.selectCountryParentDemographics]}>
                <CustomText>{i18n.t('NATIONALITY')} <CustomText style={{fontSize: 10}}>({i18n.t('OPTIONAL')})</CustomText></CustomText>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    this.setState({ showNationalityModal: true });
                  }}
                  style={[auth_styles.selectCountryDropdown,{
                    backgroundColor:design['--input--BackgroundColor']?design['--input--BackgroundColor']:"transparent",
                    marginTop: 0,
                    width: '62%',
                  }]}
                >
                  <CustomText
                    isRTL={isRTL}
                    style={auth_styles.selectCountryDropdownText}
                    placeholder={i18n.t('SELECT')}
                  >
                    {this.state.selectedNationality !== '' &&
                      this.state.selectedNationality
                    }
                  </CustomText>
                  <View style={auth_styles.selectCountryDropdownArrowParent}>
                    <AntDesign
                      style={{
                        color: 'white',
                      }}
                      name='caretdown'
                      onPress={() => {
                        //disable();
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </>
          }

          <View style={auth_styles.selectCountryParent}>
            {isDemographics && <CustomText>{i18n.t('COUNTRY_OF_RESI_STRING')}</CustomText>}
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.setState({ showCountryModal: true });
              }}
              style={[auth_styles.selectCountryDropdown, {
                backgroundColor:design['--input--BackgroundColor']?design['--input--BackgroundColor']:"transparent",
                width: isDemographics ? '58%' : '100%',
              }]}
            >
              <CustomText
                isRTL={isRTL}
                style={auth_styles.selectCountryDropdownText}
                placeholder={i18n.t(isDemographics ? 'SELECT' : 'COUNTRY_OF_RESI_STRING')}
              >
                {this.state.selectedCountry !== '' &&
                  this.state.selectedCountry
                }
              </CustomText>
              <View style={auth_styles.selectCountryDropdownArrowParent}>
                <AntDesign
                  style={{
                    color: 'white',
                  }}
                  name='caretdown'
                  onPress={() => {
                    //disable();
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
            

          <View style={auth_styles.checkBoxParent}>
            <CheckBox
              size={24}
              checkedColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
              containerStyle={auth_styles.checkBoxElement}
              checked={this.state.isPrivacyPolicyAccepted}
              onPress={() => {
                Keyboard.dismiss();
                this.setState({
                  isPrivacyPolicyAccepted: !this.state.isPrivacyPolicyAccepted,
                });
              }}
            />
            <CustomText isRTL={isRTL} style={auth_styles.checkBoxLabelText}>
              {' '}
              {i18n.t('ACCEPT_STRING')}
            </CustomText>
            <CustomText
              isRTL={isRTL}
              onPress={() => {
                this.handlePrivacyPolicy();
              }}
              style={auth_styles.hyperLinkText}
            >
              {i18n.t('PP_STRING')}
            </CustomText>
          </View>
          <View style={auth_styles.checkBoxParent}>
            <CheckBox
              size={24}
              containerStyle={auth_styles.checkBoxElement}
              checkedColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
              checked={this.state.isEndUserLicenceAccepted}
              onPress={() => {
                this.setState({
                  isEndUserLicenceAccepted: !this.state
                    .isEndUserLicenceAccepted,
                });
                Keyboard.dismiss();
                pushAnalytics('Register', 'click_accept_terms');
              }}
            />
            <CustomText isRTL={isRTL} style={auth_styles.checkBoxLabelText}>
              {' '}
              {i18n.t('ACCEPT_STRING')}
            </CustomText>
            <CustomText
              isRTL={isRTL}
              onPress={() => {
                this.handleEULA();
              }}
              style={auth_styles.hyperLinkText}
            >
              {i18n.t('EULG_STRING')}
            </CustomText>
          </View>
          <View style={{width:"70%",marginTop:30}}>
          <BlueButton
           onPress={() => {
            this.handleRegisterButton();
          }}
           title={i18n.t('REGISTER_STRING')}
             height={54}
             isRTL={isRTL} 
          />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </View>
      </KeyboardAwareScrollView>
    );
  }
}




const mapDispatchToProps = (dispatch) => ({
  onSetWebViewObject:(data) => dispatch(setWebViewObject(data)),
});


export default connect(null,mapDispatchToProps)(Register)