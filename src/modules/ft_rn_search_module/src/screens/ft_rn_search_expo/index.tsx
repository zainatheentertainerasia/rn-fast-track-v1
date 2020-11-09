import React from 'react';
import qs from 'qs';

//Screen
import OutletSearchScreen from './screen/index';

//Port
import { Port as Container } from './screen/port';
import OutletSearchBL from '../../BL/OutletSearchBL';

import { outletSearchApiParams } from '../../BL/OutletSearchBL/Interfaces';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import {getItem,setItem,remove} from '../../utils';
import { isRTL } from './screen/utils/localization/I18n';

import { AsyncStorage } from 'react-native';

import { selectExposeFunction,selectAppConfigs, selectSkipMode } from '../../../../../redux/appReducer/app.selectors';
import {selectHomeCategory} from '../../../../../redux/home/home.selectors';
import {selectLocation} from '../../../../../redux/location/location.selectors';
import {selectUserToken,selectUserInfo} from '../../../../../redux/userReducer/user.selectors';
import {selectSelectedFilter,selectFavouriteList} from '../../../../../redux/outlet/outlet.selectors';

//analytics
import {
  makeStackMongo,
  makeSessionMongo,
  getStackArrayMongo,
  resetStackObject,
  updateSessions,
  getSessions,
} from '../../utils/horizonAnalytics';

import horizonAnalytics from 'rn-horizon-analytics';
const { appboy } = horizonAnalytics;
const { onSearchEvent } = appboy;
import {exposeFunction} from '../../expose';
import * as Location from 'expo-location';

const getUserLocation = async () => {
  try {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Please enable location permission from setting');
      return;
    }
    const option = {
      accuracy: Location.Accuracy.Balanced,
      timeout: 5000,
      maximumAge: 0,
    };
    let location = await Location.getCurrentPositionAsync(option);
    return location;
  } catch (error) {
    // alert("something went wrong with location Permission");
    const location = {
      coords: {
        latitude: 0,
        longitude: 0,
      },
    };
    return location;
  }
};

interface State {
  adaptor: Container;
  token: string;
  location_id: number;
  searchText: string;
  categoryKey: string;
  parent: string;
  favouriteList: object;
  currentPosition: { lat: number; lng: number };
}

class OutletSearch extends React.Component<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      adaptor: {
        data: {
          outletList: [],
          selectedFilter: null,
          errorText: '',
          error: false,
          loadingOverlayActive: false,
          searched: false,
          searchText: '',
        },
        CallBacks: {
          getOutlets: () => {
            this.getOutletsHandler({});
          },
          loadMoreOutlet: () => {
            this.loadMoreOutletHanler();
          },
          outletRefresh: () => {
            this.outletRefreshHanler();
          },
          onOutletClick: (data) => {
            this.onOutletClickHanler(data);
          },
          removeFilter: (searctText: string) => {
            this.removeFilterHandler(searctText);
          },
          addFilter: (data, searctText) => {
            this.addFilterHanler(data, searctText);
          },
          onCancle: () => {
            this.OnCancleHandler();
          },
          onError: (data: any) => {
            this.onErrorHandler(data);
          },
          search: (data: string) => {
            this.searchHandler(data);
          },
        },
      },
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfdG9rZW4iOiJjYmZlNWM1OC1mMjEzLTQ3MGMtYTk5OS0xNmI0YzM5Y2IzZjEiLCJzZXNzaW9uX3Rva2VuIjoiNWIxYWM0ODQtYzE5NC00NGRmLWE1YzctODEyMTE2ZDBmY2I2IiwiaWF0IjoxNTg5MzY2NjY0fQ.8Xe_76mHo5ZFiZHR1jzorBkIP1n-jWhBlyFx_N40K28',
      location_id: 0,
      searchText: '',
      parent: 'home',
      categoryKey: '',
      favouriteList: {},
      currentPosition: {
        lat: 0,
        lng: 0,
      },
    };
  }

  getcurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      } else {
        console.log("can't get location");
        reject("can't get location");
      }
    });
  };

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

  deepLinkHandler = (deeplink) => {
    console.log('deepLinkHandler render');
    try {
      if (deeplink) {
        const type = deeplink.type;
        if (type === 'appsearch') {
          const isDone = deeplink.isDone;
          if (!isDone) {
            window.deeplink.isDone = true;
            const data = deeplink.data;
            if (data.search) {
              this.setState(
                {
                  adaptor: {
                    data: {
                      ...this.state.adaptor.data,
                      searchText: data.search,
                    },
                    CallBacks: this.state.adaptor.CallBacks,
                  },
                },
                () => {
                  this.searchHandler(data.search);
                }
              );
            }
          }
        }
      }
    } catch (error) {
      alert('error');
      console.log(error, 'error');
    }
  };

  async componentDidMount(): Promise<void> {
    // for current position of user
    try {
      const position: any = await getUserLocation();
      const { latitude, longitude } = position.coords;

      this.setState({
        currentPosition: {
          lng: longitude,
          lat: latitude,
        },
      });

      this.makeAnalyticsStack('Advance Search', 'open', '', '', '', 0, true);
    } catch (error) {
      console.log('position error: ', error.message);
      this.setState({
        currentPosition: {
          lng: 0,
          lat: 0,
        },
      });
    }

    try {
      const token = this.props.token;
      let location = this.props.location;
      let category = this.props.category;
      
      let selectedFilters = this.props.selectedFilter;

      if (location === undefined || location === null) {
        location = {
          id: 0,
        };
      }

      let user = this.props.user;
      const userId = user?.userId;

      let favouriteList = this.props.favouriteList;
      if (favouriteList === null || favouriteList === undefined) {
        favouriteList = {};
      } else {
        //checking if use exits in favourite List object or not
        if (favouriteList[userId]) {
          favouriteList = favouriteList[userId];

          //checking if location exits in favourite List object or not
          if (favouriteList[location.name]) {
            favouriteList = favouriteList[location.name];
          } else {
            favouriteList = {};
          }
        } else {
          favouriteList = {};
        }
      }

      if (category === undefined || category === null) {
        category = {
          apiName: '',
        };
      }

      if (selectedFilters === undefined) {
        selectedFilters = null;
      }

      let urlParam = {
        parent: 'home',
        searchText: '',
      };
      if (this.props.location && this.props.location.search) {
        urlParam = qs.parse(this.props.location.search, {
          ignoreQueryPrefix: true,
        });
      }
      let searchText = '';
      if (urlParam.searchText && urlParam.searchText.length !== 0) {
        searchText = urlParam.searchText;
      }

      this.setState(
        {
          token: token,
          location_id: location.id,
          favouriteList: favouriteList,
          parent: urlParam.parent,
          categoryKey: urlParam.parent === 'home' ? category.apiName : '', //FIX: fixed due to osama's issue.
          adaptor: {
            data: {
              ...this.state.adaptor.data,
              selectedFilter:
                urlParam.parent === 'outlet' ? selectedFilters : null,
              searchText: searchText,
            },
            CallBacks: { ...this.state.adaptor.CallBacks },
          },
          searchText: searchText,
        },
        () => {
          console.log('new state: ', this.state);
          if (this.state.searchText && this.state.searchText.length !== 0) {
            this.searchHandler(this.state.searchText);
          }
        }
      );
    } catch (e) {
      setTimeout(() => {
        this.onErrorHandler({
          error: true,
          message: e.message,
        });
      }, 100);
      console.log('error: ', e.message);
    }

    this.deepLinkHandler(window.deeplink);
  }

  OnCancleHandler = () => {
    console.log('cancle');
    const exposeData = {
      type: 'cancel',
      data: {},
    };
    exposeFunction(exposeData);
  };

  onErrorHandler = (data: any) => {
    const { error, message } = data;
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          error: error,
          errorText: message,
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });

    const exposeData = {
      type: 'error',
      data: data,
    };
    exposeFunction(exposeData);
  };

  outletRefreshHanler() {
    console.log('refreh');
  }

  loadMoreOutletHanler() {
    console.log('Load More');
  }

  activeLoader(flag: boolean): void {
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          loadingOverlayActive: flag,
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  }

  searchHandler = async (data: string) => {
    console.log('search Text: ', data);

    if (data.length === 0) {
      this.setState({
        searchText: '',
      });
      return;
    }

    const stackData = {
      current_screen: 'Advance Search',
      action: 'click_search',
      category_id: '',
      categories: '',
      categories_analytics: '',
      location_id: 0,
      query: data,
      changeSequenceNumber: false,
    };
    this.makeCustomAnalyticsStack(stackData);

    const exposeData = {
      type: 'search',
      data: data,
    };

    try {
      this.activeLoader(true);
      // const position: any = await this.getcurrentPosition();
      // const {latitude, longitude} = position.coords;
      const token = this.state.token;
      const params: outletSearchApiParams = {
        location_id: this.state.location_id,
        category: this.state.categoryKey,
        query: data,
        query_type: 'name',
        language: isRTL ? 'ar' : 'en',
        offset: 0,
        lat: this.state.currentPosition.lat,
        lng: this.state.currentPosition.lng,
      };
      const result = await OutletSearchBL.searchOutlet(
        token,
        params,
        this.state.favouriteList
      );
      console.log(result, 'result');
      this.getOutletsHandler(result.outlets);
      const searchEventData = {
        lastSearch: data,
        timeStamp: Date.now(),
      };
      onSearchEvent(searchEventData);
      this.activeLoader(false);
    } catch (e) {
      this.activeLoader(true);
      setTimeout(() => {
        if (e.message === 'logout') {
          const exposeData = {
            type: 'logout',
            data: null,
          };
          exposeFunction(exposeData);
        } else {
          this.ErrorHandler({
            error: true,
            message: e.message,
          });
        }
      }, 100);
      console.log('error: ', e.message);
    }
    exposeFunction(exposeData);
  };

  ErrorHandler = (data: any) => {
    const { error, message } = data;
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          error: error,
          errorText: message,
        },
        CallBacks: this.state.adaptor.CallBacks,
      },
    });
  };

  getOutletsHandler = (outletList) => {
    console.log(outletList, 'outletListoutletList');
    this.setState({
      adaptor: {
        data: {
          ...this.state.adaptor.data,
          searched: true,
          outletList: outletList,
        },
        CallBacks: { ...this.state.adaptor.CallBacks },
      },
    });
  };

  async onOutletClickHanler(data: any) {
    console.log('outlet click: ', data);
    const stackData = {
      current_screen: 'Advance Search',
      action: 'select_merchant',
      category_id: '',
      categories: '',
      merchant_id: data.merchantId,
      categories_analytics: '',
      location_id: 0,
      changeSequenceNumber: false,
    };
    await this.makeCustomAnalyticsStack(stackData);
    const exposeData = {
      type: 'onOutletClicked',
      data: data,
    };
    exposeFunction(exposeData);
  }

  addFilterHanler = async (data: any, searctText) => {
    console.log('add filter: ', data);

    await AsyncStorage.setItem('selectedFilters', JSON.stringify(data));
    this.setState(
      {
        adaptor: {
          data: {
            ...this.state.adaptor.data,
            selectedFilter: data,
          },
          CallBacks: { ...this.state.adaptor.CallBacks },
        },
      },
      () => {
        console.log('new adaptor: ', this.state.adaptor.data);
        const data = {
          refresh: false,
          more: false,
        };
        this.searchHandler(searctText);
      }
    );
  };

  removeFilterHandler = async (searctText) => {
    console.log('remove filter');

    await AsyncStorage.removeItem('selectedFilters');
    this.setState(
      {
        adaptor: {
          data: {
            ...this.state.adaptor.data,
            selectedFilter: null,
          },
          CallBacks: { ...this.state.adaptor.CallBacks },
        },
      },
      () => {
        console.log('new adaptor: ', this.state.adaptor.data);
        const data = {
          refresh: false,
          more: false,
        };
        this.searchHandler(searctText);
      }
    );
  };

  render() {
    return <OutletSearchScreen {...this.state.adaptor} />;
  }
}

const mapStateToProps = createStructuredSelector({
  exposeFunction: selectExposeFunction,
  location: selectLocation,
  skipMode: selectSkipMode,
  token: selectUserToken,
  user: selectUserInfo,
  category: selectHomeCategory,
  selectedFilter:selectSelectedFilter,
  favouriteList:selectFavouriteList
});

export default connect(mapStateToProps, null)(OutletSearch);
