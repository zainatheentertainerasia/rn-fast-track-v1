import React from 'react';
import {
  View,
  SafeAreaView,
  Platform,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import moment from 'moment';
import i18n, { isRTL } from './demographicUtils/localization/I18n';
import { CustomComponents, design } from 'rn_fast_track_uilib';


import DemographicInput from '../Input/DemograficInput';
import CustomText from '../Text/Text';
import ProceedButton from '../Button/proceedButton';
import ErrorModal from '../modal/error_modal';
import SelectCountryModal from '../modal/select_country_modal';
import SelectDateModal from '../modal/select_date_modal';
import SelectGenderModal from '../modal/select_gender_modal';
import CancelIcon from '../../../design/images/close-icon.png';

import AuthBL from '../../../../../../src/modules/ft_rn_auth_module/src/BL/AuthBL';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import {
  selectExposeFunction,
  selectAppConfigs,
  selectAppLoading
} from '../../../../../../src/redux/appReducer/app.selectors';
import {
  setUser,
  setToken,
  setUserValues,
} from '../../../../../../src/redux/userReducer/user.actions';
import { selectUserToken } from '../../../../../../src/redux/userReducer/user.selectors';
import { setSkipMode,setAppLoading,setErrorObject, setDismissDemographic} from '../../../../../../src/redux/appReducer/app.actions';

//default

class Demographic extends React.Component<any, any> {
  state = {
    dob: '',
    date: moment().add(-13, 'years').toDate(),
    showDatepicker: false,
    showGenderPicker: false,
    gender: '',
    showNationalityPicker: false,
    nationality: '',
    error: false,
    errorText: '',
    loadingOverlayActive: false,
  };

  handleDatePicker = () => {
    this.setState({ showDatepicker: true });
  };

  hideDatePicker = () => {
    this.setState({ showDatepicker: false });
  };

  handleDateChange = (event, date) => {
    if (Platform.OS === 'android') {
      if (date !== undefined) {
        this.setState({
          date: moment(date, 'YYYY-MM-DDTHH:mm:ss.sssZ').toDate(),
          dob: moment(date, 'YYYY-MM-DDTHH:mm:ss.sssZ').format('DD/MM/YYYY'),
          showDatepicker: false,
        });
      }
    } else if (Platform.OS === 'ios') {
      this.setState({
        date: moment(date, 'YYYY-MM-DDTHH:mm:ss.sssZ').toDate(),
        dob: moment(date, 'YYYY-MM-DDTHH:mm:ss.sssZ').format('DD/MM/YYYY'),
      });
    }
  };

  onUserUpdate = async (data: any) => {
    console.log('update-user-data ->>>> ', data);
    this.props.onSetAppLoading(true)
    this.makeAnalyticsStack('Demographics', 'click_confirm');
    try {
      const userProfile = await AuthBL.demoGraphic({
        token: this.props.token,
        ...data,
      });
      this.props.onSetUser(userProfile)
      // here we have to call dismiss modal function
      // const exposeData = {
      //   type: 'demographic',
      //   data: userProfile,
      // };
      // this.props.exposeFunction && this.props.exposeFunction(exposeData);
      this.props.onSetAppLoading(false)
      this.props.onCancel();
      this.makeAnalyticsStack('Demographics', 'update_user_success');
      console.log('demo graphic message: ', userProfile);
    } catch (e) {
      console.log(e, 'errorerror');
      

      this.props.onSetAppLoading(false)

      setTimeout(() => {
        this.makeAnalyticsStack('Demographics', 'update_user_fail');
        this.props.onSetErrorObject({
          status: true,
          message: e.messageText,
        });
      }, 100);
    }
    return { true: 'test' };
  };

  makeAnalyticsStack = async (
    screenName = '',
    action = '',
    category_id = '',
    categories = '',
    categories_analytics = '',
    location_id = 0,
    changeSequenceNumber = false
  ) => {
    const stackData = {
      current_screen: screenName,
      action: action,
      category_id: category_id,
      categories: categories,
      categories_analytics: categories_analytics,
      location_id: location_id,
      changeSequenceNumber: changeSequenceNumber,
    };
    //makeStackMongo(stackData);
    //resetStackObject();
    //const dataStack = await getStackArrayMongo();
    //console.log(dataStack, 'getStackArrayMongo');
  };

  messageHandler = (data: any) => {
    const { message, messageType, messageText } = data;
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          message,
          messageType,
          messageText,
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  };

  handleCancelOnDatePicker = () => {
    this.setState({ showDatepicker: false });
  };

  hideGenderPicker(gender: string) {
    this.setState({ showGenderPicker: false, gender: gender });
  }

  hideNationalityPicker(nationality: string) {
    this.setState({ showNationalityPicker: false, nationality: nationality });
  }

  handleNationality = () => {
    this.setState({ showNationalityPicker: true });
  };

  handleGender = () => {
    this.setState({ showGenderPicker: true });
  };

  handleProceed = () => {
    this.onUserUpdate({
      dateOfBirth: moment(this.state.dob, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      nationality: this.state.nationality,
      gender: this.state.gender,
    });
  };

  getMinused13YearDate = () => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let minusedDate = new Date(year - 13, month, day);
    return minusedDate;
  };

  onDismissDemographicModalHandler = () =>{
    this.props.OnSetDismissDemographic(false)
  }

  render() {
    const {
      showNationalityPicker,
      showGenderPicker,
      showDatepicker,
      dob,
      date,
    } = this.state;

    return this.props.isVisible ? (
      <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 30 : 0,...StyleSheet.absoluteFillObject, backgroundColor: design['--global--secondary--BackgroundColor']
      ? design['--global--secondary--BackgroundColor']
      : '#FFFFFF',}}>
        <View
          style={{
            backgroundColor: design['--global--secondary--BackgroundColor']
              ? design['--global--secondary--BackgroundColor']
              : '#FFFFFF',
            height: '100%',
          }}
        >
          <SelectCountryModal
            isVisible={showNationalityPicker}
            handleDone={(country) => {
              console.log(country);
              this.hideNationalityPicker(country);
            }}
            isRTL={isRTL}
            i18n={i18n}
            title={i18n.t('COUNTRY_OF_RESI_STRING')}
          />

          <SelectGenderModal
            isVisible={showGenderPicker}
            handleDone={(gender) => {
              console.log(gender);
              this.hideGenderPicker(gender);
            }}
          />

          <SelectDateModal
            isVisible={showDatepicker}
            date={date}
            handleDateChange={this.handleDateChange}
            handleDone={this.hideDatePicker}
            handleCancel={this.handleCancelOnDatePicker}
          />
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <CustomText
                style={{
                  padding: 10,
                  marginTop: 10,
                  fontFamily: 'MuseoSans500',
                  fontSize: 28,
                  fontWeight: 'bold',
                }}
              >
                Tell us about you
              </CustomText>
              {this.props.appConfigs.demographics_form_cancelable && (
                <TouchableOpacity onPress={this.onDismissDemographicModalHandler}>
                  <Image
                    source={CancelIcon}
                    style={{ height: 25, width: 25, marginRight: 15 }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              )}
            </View>
            <CustomText
              style={{
                padding: 10,
                fontFamily: 'MuseoSans500',
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Please fill in the information below to proceed. Don't worry -
              it's just a one-time set-up.
            </CustomText>

            <DemographicInput
              value={this.state.nationality}
              greyTip='Nationality'
              onPress={this.handleNationality}
            />

            <DemographicInput
              value={this.state.gender}
              greyTip='Gender'
              onPress={this.handleGender}
            />

            <DemographicInput
              value={dob}
              greyTip='Date of Birth'
              onPress={this.handleDatePicker}
            />

            <ProceedButton handleProceed={this.handleProceed} />
          </View>
        </View>
      </SafeAreaView>
    ) : null;
  }
}

const mapStateToProps = createStructuredSelector({
  exposeFunction: selectExposeFunction,
  appConfigs: selectAppConfigs,
  token: selectUserToken,
  loadingOverlayActive:selectAppLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUser: (data) => dispatch(setUser(data)),
  onSetToken: (data) => dispatch(setToken(data)),
  onSetSkipMode: (data) => dispatch(setSkipMode(data)),
  onSetUserValues: (data) => dispatch(setUserValues(data)),
  onSetAppLoading: (data) => dispatch(setAppLoading(data)),
  onSetErrorObject: (data) => dispatch(setErrorObject(data)),
  OnSetDismissDemographic: (data) => dispatch(setDismissDemographic(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Demographic);
