import React from 'react';
//Screen
import FavouriteScreen from './screen/index';

//Port
import { Port as Contract } from './screen/port';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserInfo  } from '../../../../../redux/userReducer/user.selectors';
import { selectExposeFunction,selectSkipMode } from '../../../../../redux/appReducer/app.selectors';
import { selectFavouriteList  } from '../../../../../redux/outlet/outlet.selectors';

//analytics
import {
  makeStackMongo,
  makeSessionMongo,
  getStackArrayMongo,
  resetStackObject,
  updateSessions,
  getSessions,
} from '../../utils/horizonAnalytics';

import {
  CustomComponents,
  init_font,
  FastTrackLibs,
} from 'rn_fast_track_uilib';
import {exposeFunction} from '../../expose';
interface Props {}

interface State {
  adaptor: Contract;
  isLoaded: boolean;
}

class Favourite extends React.Component<any, State> {
  private _unsubscribe: any;
  constructor(props: Props) {
    super(props);

    this.state = {
      adaptor: {
        data: {
          favourite: {},
        },
        CallBacks: {
          onfavouriteClick: (data) => {
            this.favouriteClickHandler(data);
          },
        },
      },
      isLoaded: false,
    };

    this._unsubscribe;
  }

  makeCustomAnalyticsStack = async (stackData) => {
    console.log('stack data', stackData);
    await makeStackMongo(stackData);
    //resetStackObject();
    const dataStack = await getStackArrayMongo();
    console.log(dataStack, 'getStackArrayMongo');
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
    await makeStackMongo(stackData);
    //resetStackObject();
    const dataStack = await getStackArrayMongo();
    console.log(dataStack, 'getStackArrayMongo');
  };

  async componentDidMount() {
    console.log('componentDidMount');
    init_font().then(() => {
      this.setState({ isLoaded: true });
    });
    this.makeAnalyticsStack('Favourites', 'open', '', '', '', 0, true);
    this.getFavouriteList();
    console.log(this.props, 'nav fav');
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      console.log('fav module focused');
      this.getFavouriteList();
    });
  }

  getFavouriteList = async () => {
    console.log('getFavouriteList');
    
    let skipMode = this.props.skipMode;

    if (skipMode) {
      console.log(skipMode, 'skipMode in favModule === true');
      const exposeData = {
        type: 'logout',
        data: {},
      };
      exposeFunction(exposeData);
    }

    let user =this.props.user;
    const userId = user.userId;
    let favouriteList=this.props.favouriteList;
    if (favouriteList === null || favouriteList === undefined) {
      favouriteList = {};
    }

    //checking if use exits in favourite List object or not.....if not.. adding userID into favourite List object
    if (favouriteList[userId]) {
      favouriteList = favouriteList[userId];
    }
    console.log('getFavouriteList: ', favouriteList);
    console.log('user: ', user);
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          favourite: favouriteList,
        },
        CallBacks: { ...this.state.adaptor.CallBacks },
      },
    });
  };

  favouriteClickHandler = (data: any) => {
    const { merchantId, outletId } = data;
    console.log('merchantId: ', data);
    this.makeAnalyticsStack(
      'Favourites',
      'select_favourites',
      '',
      '',
      '',
      0,
      false
    );
    const exposeData = {
      type: 'favourite',
      data: {
        merchantId: merchantId,
        outletId: outletId,
      },
    };
    exposeFunction(exposeData);
  };

  render() {
    const { isLoaded } = this.state;
    if (!isLoaded) return null;
    return <FavouriteScreen {...this.state.adaptor} />;
  }
}

const mapStateToProps = createStructuredSelector({
  exposeFunction: selectExposeFunction,
  favouriteList: selectFavouriteList,
  skipMode: selectSkipMode,
  user: selectUserInfo,
});

const mapDispatchToProps = (dispatch, props) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
