import React from 'react';

//local imports
import { Port as port } from './screen/port';
import { AsyncStorage } from 'react-native';
import NotificationScreen from './screen/index';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectExposeFunction } from '../../../../../redux/appReducer/app.selectors';
interface State {
  adaptor: port;
  jwt: string;
  sessionJwt: string;
}

//analytics
import {
  makeStackMongo,
  makeSessionMongo,
  getStackArrayMongo,
  resetStackObject,
  updateSessions,
  getSessions,
} from '../../utils/horizonAnalytics';

class Notification extends React.Component<any, any> {
  private _skipModeAutoFocusListeners: any;
  constructor(props: any) {
    super(props);
    this.state = {
      adaptor: {
        data: {
          loadingOverlayActive: false,
          errorText: '',
          error: false,
        },
        CallBacks: {},
      },
      jwt: '',
      sessionJwt: '',
    };
  }


  skipModeCheck = async () =>{
    const asyncObject = await AsyncStorage.multiGet(['skipMode']);
    const skipMode = asyncObject[0][1];
    if (skipMode === 'true') {
      console.log(skipMode, 'skipMode in Notification === true');
      const exposeData = {
        type: 'logout',
        data: {},
      };
      console.log(exposeData,this.props.exposeFunction)
      this.props.exposeFunction && this.props.exposeFunction(exposeData);
    }
  }

  //react lifecycle methods
  async componentWillMount() {
    const asyncObject = await AsyncStorage.multiGet([
      'token',
      'location',
    ]);
    


    this.skipModeCheck()
    const token = asyncObject[0][1] || this.state.sessionJwt;
    const location = JSON.parse(asyncObject[1][1]);

    const locationID = location === null ? 0 : location.id;

    console.log(location, 'locaiton in notification');
    //analytics tracking
    //TODO: location must be provided to Notification analytics fun
    //currently its set to zero
    this.makeAnalyticsStack(
      'Notifications',
      'open',
      '',
      '',
      '',
      locationID,
      true
    );
  }


  componentDidMount() {
    this._skipModeAutoFocusListeners = this.props.navigation.addListener('focus', () => {
      console.log('skipModeAutoFocus',this.props)
      
      this.skipModeCheck()
    });
  }


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
    await makeStackMongo(stackData);
    //resetStackObject();
    // const dataStack = await getStackArrayMongo();
    // console.log(dataStack, 'getStackArrayMongo');
  };

  render() {
    return <NotificationScreen {...this.state.adaptor} />;
  }
}


const mapStateToProps = createStructuredSelector({
  exposeFunction: selectExposeFunction,
});

export default connect(mapStateToProps, null)(Notification);