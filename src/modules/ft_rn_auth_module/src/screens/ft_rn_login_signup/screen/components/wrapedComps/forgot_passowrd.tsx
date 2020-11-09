import React, { Component, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Portal } from 'react-native-paper';
import i18n, { getFlipForRTLStyle } from '../../utils/localization/I18n';
import { BlurView } from '@react-native-community/blur';
import { CustomComponents, FastTrackLibs } from 'rn_fast_track_uilib';
const { CustomText, CustomInput, WebViewModal } = CustomComponents;
const { Modal, Ionicons } = FastTrackLibs;
interface STATE {
  email: string;
  textError: boolean;
}
export default class ErrorModal extends Component<any, STATE> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      textError: false,
    };
  }

  validateEmail = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };

  handleSubmit = () => {
    console.log('handleSubmit');
    const { email } = this.state;
    const check = this.validateEmail(this.state.email);
    if (check === true) {
      // callback
      this.props.submitEmail(email);
      this.props.disable();
    } else {
      this.setState({ textError: true, email: email });
    }
  };

  render() {
    const { isVisible, disable } = this.props;

    return isVisible ? (
      <Portal>
        <BlurView
          style={styles.absolute}
          //viewRef={this.state.viewRef}
          blurType='light'
          blurAmount={3}
          reducedTransparencyFallbackColor='grey'
        />
        <View style={[styles.centeredView, getFlipForRTLStyle()]}>
          <View style={styles.modalView}>
            <Ionicons
              style={styles.iconStyle}
              name='md-close'
              size={21}
              color='lightgrey'
              onPress={() => {
                disable();
              }}
            />
            <CustomText
              style={{
                fontSize: 16,
                fontFamily: 'MuseoSans500',
                paddingTop: 10,
                color: 'white',
                letterSpacing: 0,
              }}
            >
              {i18n.t('FORGOT_PASSWORD')}
            </CustomText>

            <CustomText style={styles.modalText}>
              {i18n.t('ENTER_REGISTERED_EMAIL')}
            </CustomText>

            <CustomInput
              style={{
                fontSize: 14,
                height: 40,
                width: '95%',
                backgroundColor: '#ffffff',
                elevation: 1,
                borderColor: 'rgb(191,191, 197)',
                borderWidth: 1,
                paddingStart: 5,
                paddingEnd: 5,
                borderRadius: 5,
                color: this.state.textError === true ? 'red' : 'grey',
                textDecorationLine: 'underline',
                fontFamily: 'MuseoSans500',
                marginBottom: 50,
              }}
              value={this.state.email}
              placeholder={i18n.t('REGISTER_EMAIL')}
              placeholderTextColor='rgb(191,191, 197)'
              onChangeText={(e) => {
                this.setState({ email: e, textError: false });
              }}
              onSubmitEditing={() => this.handleSubmit()}
              autoCapitalize='none'
              multiline={false}
              keyboardType={'email-address'}
            />
          </View>
        </View>
      </Portal>
    ) : null;
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "rgba(0, 0, 0,0.5)",
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    //margin: 20,
    backgroundColor: 'rgba(50,50,50,0.6)',
    padding: 5,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 5,
    width: '90%',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomButton: {
    width: '100%',
    borderTopWidth: 0.4,
    borderColor: 'grey',
    marginTop: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'rgb(79,153,210)',
    textAlign: 'center',
  },
  modalText: {
    paddingTop: 20,
    paddingBottom: 30,
    color: '#ffffff',
    fontFamily: 'MuseoSans500',
    textAlign: 'center',
    lineHeight: 17,
    width: '98%',
    fontSize: 14,
  },
  iconStyle: {
    position: 'absolute',
    right: 8,
    marginTop: 2,
  },

  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

// export default App;
