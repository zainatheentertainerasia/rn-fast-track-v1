import React from 'react';

import {
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';

import {setWebViewObject } from '../../../../../../../redux/appReducer/app.actions';
import { CustomComponents, FastTrackLibs, design } from 'rn_fast_track_uilib';

import APP_COLORS from '../res/colors';
import auth_styles from '../res/styles/auth_styles';
import ForgetPasswordModal from './wrapedComps/forgot_passowrd';
import i18n, { isRTL } from '../utils/localization/I18n';
const { CustomText, CustomInput, WebViewModal, BlueButton } = CustomComponents;
const { CheckBox } = FastTrackLibs;
interface State {
  isPrivacyPolicyAccepted: boolean;
  isEndUserLicenceAccepted: boolean;
  showErrorModal: boolean;
  showForgetPasswordModal: boolean;
  formCompleted: boolean;
  modalErrorString: string;
  email: string;
  password: string;
  showWebView: boolean;
  webviewURL: string;
  webViewTitle: string;
}

class Login extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isPrivacyPolicyAccepted: false,
      isEndUserLicenceAccepted: false,
      showErrorModal: false,
      showForgetPasswordModal: false,
      formCompleted: false,
      modalErrorString: '',
      email: '',
      password: '',
      showWebView: false,
      webviewURL: '',
      webViewTitle: '',
    };
  }

  componentDidMount() {
    console.log('Login component mounted');
  }

  handlePrivacyPolicy = () => {
    console.log('Handle Privacy Policy');
    // const { pushAnalytics } = this.props.calbacks;
    // pushAnalytics('PrivacyPolicy', 'open', '', '', '', 0, true);

    this.props.onSetWebViewObject({status:true,headerText:'Privacy Policy',url:this.props.data.pp_url,})


  };

  handleEULA = () => {
    console.log('handle eula');

    this.props.onSetWebViewObject({status:true,headerText:'End User License Agreement',url:this.props.data.eula_url})

  };
  //calback functions
  disableErrorModal = () => {
    this.setState({
      showErrorModal: false,
    });
  };

  disableWebView = () => {
    this.setState({ showWebView: false });
  };
  //helper function
  handleEmail = (event: '') => {
    this.setState({
      email: event,
    });
  };

  handlePassword = (event: '') => {
    this.setState({
      password: event,
    });
  };

  handleLoginButton = () => {
    //fetching all the variable from state
    const { pushAnalytics } = this.props;
    pushAnalytics('Login', 'click_login', '', '', '', 0, false);
    const {
      isPrivacyPolicyAccepted,
      isEndUserLicenceAccepted,
      email,
      password,
    } = this.state;

    // console.log(
    //   email,
    //   password,
    //   isPrivacyPolicyAccepted,
    //   isEndUserLicenceAccepted
    // );
    const { onLogin } = this.props;

    //fetching data from state to pass in callback
    let loginData = {
      email: email,
      password: password,
      privacyPolicyCheck: isPrivacyPolicyAccepted,
      endUserLicenseAgreementCheck: isEndUserLicenceAccepted,
    };

    //callback func
    onLogin(loginData);
  };

  showForgotPasswordModal = () => {
    this.setState({
      showForgetPasswordModal: true,
    });
  };
  closeForgotPasswordModal = () => {
    this.setState({ showForgetPasswordModal: false });
  };

  _renderLoginMessage = (loginMessage) => {
    const message = loginMessage.map((message) => {
      return (
        <CustomText
          // isRTL={isRTL}
          // onPress={() => {
          //   this.handlePrivacyPolicy();
          // }}
          style={{
            ...message.options,
            fontSize: 14,
            fontFamily: 'MuseoSans500',
          }}
        >
          {message.text + ' '}
        </CustomText>
      );
    });

    return (
      <>
        <CustomText>{message}</CustomText>
      </>
    );
  };

  render() {
    const {
      message,
      errorText,
      pp_url,
      eula_url,
      loadingOverlayActive,
    } = this.props.data;
    const {
      onForgotPassword,
      pushAnalytics,
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View
          style={[
            auth_styles.loginParent,
            {
              backgroundColor: design['--global--tertiary--BackgroundColor']
                ? design['--global--tertiary--BackgroundColor']
                : 'gray',
            },
          ]}
        >
          {/* dif modals t */}

          <WebViewModal
            urlString={this.state.webviewURL}
            headerString={this.state.webViewTitle}
            isVisible={this.state.showWebView}
            disableCalback={() => this.disableWebView()}
          />
          <ForgetPasswordModal
            dataString={errorText}
            isVisible={this.state.showForgetPasswordModal}
            disable={() => this.closeForgotPasswordModal()}
            submitEmail={(e) => onForgotPassword(e)}
          />
          <View style={{ paddingTop: 15 }} />

          <View style={{ width: '90%' }}>
            {this.props.data.loginMessage &&
              this._renderLoginMessage(this.props.data.loginMessage)}
          </View>

          <CustomInput
            isRTL={isRTL}
            keyboardType={'email-address'}
            style={auth_styles.inputField_MT16}
            placeholder={i18n.t('EMAIL_STRING')}
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            onChangeText={this.handleEmail}
            autoCapitalize='none'
            onSubmitEditing={() => {
              this.refs.password.focus();
            }}
          />
          <CustomInput
            isRTL={isRTL}
            style={auth_styles.inputField_MT10}
            placeholder={i18n.t('PASSWORD_STRING')}
            placeholderTextColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
            onChangeText={this.handlePassword}
            secureTextEntry={true}
            ref='password'
          />
          <View style={auth_styles.checkBoxParent}>
            <CheckBox
              size={24}
              checkedColor={APP_COLORS.COLOR_TEXT_PLACEHOLDER}
              containerStyle={auth_styles.checkBoxElement}
              checked={this.state.isPrivacyPolicyAccepted}
              onPress={() => {
                this.setState({
                  isPrivacyPolicyAccepted: !this.state.isPrivacyPolicyAccepted,
                });

                Keyboard.dismiss();
                pushAnalytics('Login', 'click_accept_privacy_policy');
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
              style={{padding:20}}
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
                pushAnalytics('Login', 'click_accept_terms');
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
          <View style={{ width: '70%', marginTop: 30 }}>
            <BlueButton
              onPress={() => {
                this.handleLoginButton();
              }}
              title={i18n.t('SIGN_IN_STRING')}
              height={54}
              isRTL={isRTL}
            />
          </View>
          <CustomText
            isRTL={isRTL}
            style={auth_styles.forgetPassStyle}
            onPress={() => {
              this.showForgotPasswordModal();
            }}
          >
            {i18n.t('FORGOT_PASS_STRING')}{' '}
          </CustomText>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSetWebViewObject:(data) => dispatch(setWebViewObject(data)),
});


export default connect(null,mapDispatchToProps)(Login)