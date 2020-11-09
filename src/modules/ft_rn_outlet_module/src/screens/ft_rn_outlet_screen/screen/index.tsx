import React from "react";
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  View,
  ScrollView,
  Alert,
  Linking,
} from "react-native";
import { createStructuredSelector } from "reselect";

import {} from "../../../../../../redux/appReducer/app.selectors";
import {
  selectCurrentLocation,
  selectLocation,
} from "../../../../../../redux/location/location.selectors";
import { selectHomeCategory } from "../../../../../../redux/home/home.selectors";
import {
  selectSelectedFilter,
  selectFavouriteList,
} from "../../../../../../redux/outlet/outlet.selectors";
import {
  selectUserToken,
  selectUserInfo,
} from "../../../../../../redux/userReducer/user.selectors";
import Cheers from "./components/cheers";
import Map from "./components/map";
import { Port as port } from "./port";
import i18n, {
  isRTL,
  getFlipForRTLStyle,
} from "../screen/utils/localization/I18n";
import { connect } from "react-redux";

import * as i18nCollection from "../screen/utils/localization/I18n";
import {
  setAppLoading,
  setErrorObject,
} from "../../../../../../redux/appReducer/app.actions";
import {
  setOutletList,
  setMapOutletList,
} from "../../../../../../redux/outletNotPersisted/outletNotPersisted.actions";
import {
  setMerchantData,
  setSelectedFilter,
  setSelectedFilterReset,
  setFavouriteList,
} from "../../../../../../redux/outlet/outlet.actions";

import OutletBL from "../../../BL/OutletBL";

import {
  makeStackMongo,
  getStackArrayMongo,
} from "../../../utils/horizonAnalytics";
import { FastTrackLibs, CustomComponents, design } from "rn_fast_track_uilib";
import {exposeOutlet as exposeFunction} from '../../../../../../registerEvents';
const {} = FastTrackLibs;
const {
  CustomText,
  OutletHeader1,
  OutletHeader2,
  CustomSearchBar,
  CustomChipList,
  CustomNoRecord,
  CustomBottomSheet,
  CustomBottomSheetComp,
  CustomListing,
  OutletFilter,
} = CustomComponents;

let screenName = "";
let tabsOutlets = {};

const goToSettingAlert = async (props) => {
  props.navigation.goBack();
  Alert.alert(
    "No Location Permission",
    "please goto setting and on location permission manual",
    [
      { text: "cancel", onPress: () => console.log("cancel") },
      { text: "Allow", onPress: () => Linking.openURL("app-settings:") },
    ],
    { cancelable: false }
  );
};

const getUserLocation = async (props) => {
  try {
    return props.currentLocation;
  } catch (error) {
    goToSettingAlert(props);
    return {
      coords: {
        latitude: 0,
        longitude: 0,
      },
    };
  }
};

class OutletScreen extends React.Component<port, any> {
  filterRaf = React.createRef();
  bottomSheetRef: any;
  constructor(props: port) {
    super(props);
    this.state = {
      mode: "List",
      mapData: {},
      activeTabLocal: 0,
      data: [
        {
          id: "image1",
          outletName: "Dubai & N. Emirates",
          filters: "Cafe Society",
          type: "Cafe",
          typeImage:
            "https://s3.amazonaws.com/entertainer-app-assets/icons/badge_monthly.png",
          image:
            "https://offerengine.theentertainerme.com/booza-x21676319/merchant_primary_logo_%28retina%29_-_merchant.png",
        },
        {
          id: "image1",
          outletName: "Dubai & N. Emirates",
          filters: "Cafe Society",
          type: "Cafe",
          typeImage: "",
          image:
            "https://offerengine.theentertainerme.com/afters-dessert-cafe-x23885380/merchant_primary_logo_%28retina%29_-_merchant2019090901057.jpg",
        },
        {
          id: "image1",
          outletName: "Dubai & N. Emirates",
          filters: "Cafe Society",
          type: "Cafe",
          typeImage: "",
          image:
            "https://offerengine.theentertainerme.com/afters-dessert-cafe-x23885380/merchant_primary_logo_%28retina%29_-_merchant2019090901057.jpg",
        },
      ],
      filterList: [],
      badge: 0,
      chipsData: [],
      // todo extra work
      tabs: [],
      activeTab: null,
      refreshUI: 0,
    };
    this.bottomSheetRef = React.createRef();
  }

  UNSAFE_componentWillMount() {
    this.setFavouriteListHandler();
    this.getTabsDataHelper();
    this.getCategoryAndFilterHandler();
  }
  getCategoryAndFilterHandler = () => {
    //for get category
    try {
      //for get fiters
      try {
        let selectedFilters = this.props.selectedFilters;
        console.log(selectedFilters, "selectedFiltersselectedFilters");
        if (selectedFilters === undefined) {
          selectedFilters = null;
        } else {
          selectedFilters = JSON.parse(selectedFilters);
        }

        console.log("selectedFilters: ", selectedFilters);
        let categorySelectedFilter = null;
        if (this.props.category.categoryKey) {
          categorySelectedFilter =
            selectedFilters[this.props.category.categoryKey];
        }
        console.log(
          "selectedFilters categorySelectedFilter: ",
          categorySelectedFilter
        );
        this.props.onSetSelectedFilter(categorySelectedFilter);
        this.setState({
          filters: selectedFilters,
        });
      } catch (error) {
        // this.ErrorHandler({
        // error: true,
        // message: "category data couldn't found"
        // })
      }
    } catch (error) {
      // this.ErrorHandler({
      // error: true,
      // message: "category data couldn't found"
      // })
    }
  };

  setFavouriteListHandler = () => {
    //for get location
    try {
      let user = this.props.user;
      const userId = user ? user.userId : null;

      let location = this.props.location;
      if (location === undefined || location === null) {
        location = { id: 0, name: null };
      }

      let favouriteList = this.props.favouriteList;
      if (favouriteList === null || favouriteList === undefined) {
        favouriteList = {};
      } else {
        // favouriteList = JSON.parse(favouriteList);
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
      this.props.onSetFavouriteList(favouriteList);
    } catch (error) {
      console.log(error);
      // this.ErrorHandler({
      // error: true,
      // message: "location data couldn't found"
      // })
    }
  };

  makeAnalyticsStack = async (
    screenName = "",
    action = "",
    category_id = 0,
    categories = "",
    categories_analytics = "",
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
    console.log(dataStack, "getStackArrayMongo");
  };

  setBadgeCount = (badge) => {
    this.setState({ badge });
  };

  setChips = (chipsData) => {
    this.setState({ chipsData });
  };

  onPressRightButton = () => {
    this.setState(
      {
        mode: this.state.mode === "Map" ? "List" : "Map",
      },
      () => {
        this.changeModeHandler(this.state.mode);
      }
    );
  };

  changeModeHandler = async (mode) => {
    if (mode === "List") {
      screenName = "Offers List";
    } else if (mode === "Map") {
      screenName = "Offers Map";
    }

    const mapCenterPosition = this.props.location;
    const category = this.props.category;
    const location = this.props.location;
    if (mode === "Map") {
      // 21414
      const data = {
        coords: {
          lat: mapCenterPosition.lat,
          lng: mapCenterPosition.lng,
        },
        radius: 21414,
      };
      this.getMapOutletsHandler(data);

      //analytics
      this.makeAnalyticsStack(
        "Offers List",
        "select_map",
        category.category_id,
        category.apiName,
        category.displayName,
        location.id,
        false
      );
    } else if (mode === "List") {
      //analytics
      this.makeAnalyticsStack(
        "Offers Map",
        "select_list",
        category.category_id,
        category.apiName,
        category.displayName,
        location.id,
        false
      );
    }
  };

  getMapOutletsHandler = async (data) => {
    console.log("map api", data);

    this.setState({ mapData: data }, () => {
      this.invokeMapApi();
    });
  };

  invokeMapApi = async () => {
    let selectedFilters = {};
    if (this.props.selectedFilters) {
      selectedFilters = this.props.selectedFilters[this.props.category.apiName];
    }
    try {
      let filtersSelectedForNo = [];
      let filtersSelectedForYes = [];

      if (
        selectedFilters &&
        selectedFilters["selectedAmenities"] &&
        Object.keys(selectedFilters["selectedAmenities"]).length !== 0
      ) {
        Object.keys(selectedFilters["selectedAmenities"]).map((key) => {
          if (selectedFilters["selectedAmenities"][key].flag) {
            filtersSelectedForYes.push(key);
          } else {
            filtersSelectedForNo.push(key);
          }
        });
      }

      const token = this.props.token;
      const params: outletParamsMaps = {
        location_id: this.props.location.id,
        category: this.props.category.apiName,
        user_include_cheers: this.state.activeTab.params["is_cheers"]
          ? true
          : false,
        tabsParams: this.state.activeTab.params,
        lat: this.state.mapData.coords.lat,
        lng: this.state.mapData.coords.lng,
        radius: this.state.mapData.radius,
        language: isRTL ? "ar" : "en",
      };
      if (selectedFilters) {
        params["show_new_offers"] = selectedFilters.newOffer;
      }

      if (
        selectedFilters &&
        selectedFilters.selectedCuisine &&
        selectedFilters.selectedCuisine.length !== 0
      ) {
        params["cuisine_filter"] = selectedFilters.selectedCuisine;
      }

      if (
        selectedFilters &&
        selectedFilters.selectedType &&
        selectedFilters.selectedType.length !== 0
      ) {
        params["sub_category_filter"] = selectedFilters.selectedType;
      }

      if (filtersSelectedForNo.length !== 0) {
        params["filters_selected_for_no"] = filtersSelectedForNo;
      }
      if (filtersSelectedForYes.length !== 0) {
        params["filters_selected_for_yes"] = filtersSelectedForYes;
      }

      console.log("params: ", params);
      console.log("tabsParams: ", params.tabsParams);
      console.log("new offers: ", params["show_new_offers"]);

      const outlets = await OutletBL.getOutletsMaps(token, params);
      console.log(outlets.outlets, "getOutletsDataHelper", token);
      const mapOutlets: any = [...outlets.outlets];
      this.props.onSetMapOutletList(mapOutlets);
    } catch (e) {
      setTimeout(() => {
        if (e.message === "logout") {
          const exposeData = {
            type: "logout",
            data: null,
          };
          exposeFunction(exposeData);
        } else {
          // this.ErrorHandler({
          //   error: true,
          //   message: e.message,
          // });
        }
      }, 100);
      console.log("error: ", e.message);
    }
  };

  onChangeTab = (index, tab) => {
    this.setState({ activeTabLocal: index, activeTab: tab }, () => {
      this.chaneTabHandler(tab);
    });
  };

  chaneTabHandler(data: any) {
    console.log("changetab: ", data, tabsOutlets);
    this.props.onSetOutletList(tabsOutlets[data.uid]);
    this.props.onSetMapOutletList([]);

    this.setState({ activeTab: data }, () => {
      const uid = this.state.activeTab.uid;
      //analytics
      this.makeAnalyticsStack(
        screenName,
        "select_" + uid.replace(" ", "_").toLowerCase(),
        this.props.category_id,
        this.props.category,
        this.props.analytics_category_name,
        this.state.location_id,
        false
      );

      if (uid === "cheers" && !this.state.cheersChecked) {
        this.getCheersDataHelper();
        return;
      }

      if (this.state.mode === "List") {
        const data = {
          refresh: false,
          more: false,
        };
        this.getOutletsDataHelper(data);
        return;
      }

      if (this.state.mode === "Map") {
        this.invokeMapApi();
      }
    });
  }

  getCheersDataHelper = async () => {
    try {
      this.activeLoader(true);
      const token = this.state.token;
      const params: cheersParams = {
        location_id: this.props.location.location_id,
        language: isRTL ? "ar" : "en",
      };

      const result = await OutletBL.getCheersData(token, params);
      console.log("cheers: ", result);

      const cheersRules =
        result.cheersRules.length > 0 ? result.cheersRules[0] : null;

      this.setState({ cheersRules: cheersRules });
      this.activeLoader(false);
    } catch (e) {
      this.activeLoader(false);

      setTimeout(() => {
        if (e.message === "logout") {
          const exposeData = {
            type: "logout",
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
      console.log("error: ", e.message);
    }
  };

  cheersSubmit = (data) => {
    console.log(data, "fasdfs");
    if (!data.cheersCheck && !data.cheersChecked) {
      return;
    }
    if (
      (data.cheersCheck == 0 || data.cheersCheck === undefined) &&
      data.cheersChecked === true
    ) {
      this.setState({ activeTabLocal: 0 });
    }
    this.cheersSubmit(data);
  };

  onSearchHandler = (text) => {
    // console.log(text, "texttext");
  };

  onOpenFilters = () => {
    this.bottomSheetRef.current.snapTo(0);
  };

  onChangeFilters = (id) => {
    this.setState({ selectedId: id });
  };

  onEndReached = () => {
    this.loadMoreOutletHanler();
  };

  loadMoreOutletHanler() {
    console.log("Load More");
    const data = {
      refresh: false,
      more: true,
    };
    this.getOutletsDataHelper(data);
  }

  onRefresh = () => {
    this.outletRefreshHanler();
  };

  outletRefreshHanler() {
    const data = {
      refresh: true,
      more: false,
    };
    this.getOutletsDataHelper(data);
  }

  onFavHandler = (data) => {
    const outletList = this.state.outletList;
    const newOutletList = outletList.map((outletItem) => {
      if (
        outletItem.outletId === data.outletId &&
        outletItem.merchantId === data.merchantId
      ) {
        return {
          ...outletItem,
          favourite: data.favourite,
        };
      } else {
        return outletItem;
      }
    });
    this.setState({
      adaptor: {
        data: {
          ...this.state,
          // outletList: newOutletList
        },
      },
    });
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.filterRaf.current) {
        const badge = this.filterRaf.current.badgeCount();
        const chipsData = this.filterRaf.current.getChipsData();
        this.setChips(chipsData);
        this.setBadgeCount(badge);
      }
    }, 500);
  }

  onDoneHanlder = () => {
    this.bottomSheetRef.current.snapTo(1);
    this.addFilterHanler(this.state.filterList);
    setTimeout(() => {
      const badge = this.filterRaf.current.badgeCount();
      const chipsData = this.filterRaf.current.getChipsData();
      this.setChips(chipsData);
      this.setBadgeCount(badge);
      this.filterRaf.current.close();
    }, 100);

    // alert(this.state.selectedId)
  };

  onClearHandler = () => {
    const badge = this.filterRaf.current.badgeCount();
    if (badge > 0) {
      //this.bottomSheetRef.current.snapTo(1);
      setTimeout(() => {
        this.filterRaf.current.clearFilter();
        this.setBadgeCount(0);
        this.setChips([]);
        //this.props.CallBacks.addFilter(this.state.filterList);
      }, 100);
    } else {
      //do nothing
    }
  };

  onDeleteChip = (data) => {
    this.filterRaf.current.onDeleteFilter(data).then((res) => {
      const badge = this.filterRaf.current.badgeCount();
      const chipsData = this.filterRaf.current.getChipsData();
      // console.log(badge, chipsData, "qwerty");
      this.setChips(chipsData);
      this.setBadgeCount(badge);
      this.filterRaf.current.close();
    });
  };

  hideErrorPopup = () => {
    this.ErrorHandler({ error: false, message: "" });
  };

  getTabsDataHelper = async () => {
    try {
      this.activeLoader(true);

      const token = this.props.token;
      const params: tabsParams = {
        category: this.props.category.apiName,
        location_id: this.props.location.id,
        language: isRTL ? "ar" : "en",
      };

      const tabs = await OutletBL.getTabs(token, params);
      console.log(tabs, "tabs"); //ais k bad outlet

      if (tabs.tabs.length === 0) throw new Error("Tabs couldn't found");
      this.setState({ tabs: tabs.tabs, activeTab: tabs.tabs[0] }, () => {
        const data = {
          refresh: false,
          more: false,
        };
        this.getOutletsDataHelper(data);
      });
      this.activeLoader(false);
    } catch (e) {
      this.activeLoader(false);

      setTimeout(() => {
        if (e.message === "logout") {
          const exposeData = {
            type: "logout",
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
      console.log("error: ", e.message);
    }
  };

  getOutletsDataHelper = async (data) => {
    let selectedFilters = {};
    if (this.props.selectedFilters) {
      selectedFilters = this.props.selectedFilters[this.props.category.apiName];
    }
    try {
      var position: any = await getUserLocation(this.props);
    } catch (error) {
      var position = {
        coords: {
          latitude: 0,
          longitude: 0,
        },
      };
    }

    try {
      if (!data.more) {
        this.activeLoader(true);
      }

      let filtersSelectedForNo = [];
      let filtersSelectedForYes = [];

      if (
        selectedFilters &&
        selectedFilters["selectedAmenities"] &&
        Object.keys(selectedFilters["selectedAmenities"]).length !== 0
      ) {
        Object.keys(selectedFilters["selectedAmenities"]).map((key) => {
          if (selectedFilters["selectedAmenities"][key].flag) {
            filtersSelectedForYes.push(key);
          } else {
            filtersSelectedForNo.push(key);
          }
        });
      }

      let offSet = 0;
      if (
        !data.refresh &&
        data.more &&
        tabsOutlets &&
        tabsOutlets[this.state.activeTab.uid]
      ) {
        offSet = tabsOutlets[this.state.activeTab.uid].length;
      }

      // //console.log("offSet: ", offSet)
      const token = this.props.token;
      const params: outletParams = {
        location_id: this.props.location.id,
        category: this.props.category.apiName,
        offset: offSet,
        user_include_cheers: this.state.activeTab.params["is_cheers"]
          ? true
          : false,
        tabsParams: this.state.activeTab.params,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        language: isRTL ? "ar" : "en",
      };
      if (selectedFilters) {
        params["show_new_offers"] = selectedFilters.newOffer;
      }

      if (
        selectedFilters &&
        selectedFilters.selectedCuisine &&
        selectedFilters.selectedCuisine.length !== 0
      ) {
        params["cuisine_filter"] = selectedFilters.selectedCuisine;
      }

      if (
        selectedFilters &&
        selectedFilters.selectedType &&
        selectedFilters.selectedType.length !== 0
      ) {
        params["sub_category_filter"] = selectedFilters.selectedType;
      }

      if (filtersSelectedForNo.length !== 0) {
        params["filters_selected_for_no"] = filtersSelectedForNo;
      }
      if (filtersSelectedForYes.length !== 0) {
        params["filters_selected_for_yes"] = filtersSelectedForYes;
      }
      console.log("hamza", params, this.props.favouriteList);
      const outlets = await OutletBL.getOutlets(
        token,
        params,
        this.props.favouriteList
      );
      console.log("OUTLETS:", outlets, params, "nomi", data);
      this.props.onSetOutletList(outlets.outlets);
      /**
       * todo remove below function or fix below function
       */
      this.setOutletsToState(outlets.outlets, data);
      // this.getTabsOutletlistFromTabs(tabs.tabs, outlets.outlets);
      this.activeLoader(false);
    } catch (e) {
      this.activeLoader(false);
      setTimeout(() => {
        if (e.message === "logout") {
          const exposeData = {
            type: "logout",
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
      console.log("error: ", e.message);
    }
  };

  setOutletsToState = (outlets, data) => {
    if (Object.keys(tabsOutlets).length === 0) {
      this.state.tabs.map((tab, index) => {
        if (index === 0) {
          tabsOutlets[tab.uid] = outlets;
        } else {
          tabsOutlets[tab.uid] = null;
        }
      });
      // offSet: outlets.length,
    } else {
      let tabOutlets = { ...tabsOutlets };
      let activeTabOutlets = [];
      if (data.more && tabOutlets[this.state.activeTab.uid]) {
        activeTabOutlets = tabOutlets[this.state.activeTab.uid];
      }

      tabOutlets[this.state.activeTab.uid] = [...activeTabOutlets, ...outlets];

      this.props.onSetOutletList([...activeTabOutlets, ...outlets]);

      // offSet: this.state.offSet + outlets.length,
    }
  };

  activeLoader(flag: boolean): void {
    this.props.onSetAppLoading(flag);
  }

  ErrorHandler = (data: any) => {
    const { error, message } = data;
    const errorObj = {
      status: error,
      message,
    };
    this.props.onSetErrorObject(errorObj);
  };

  onOutletClick = (data) => {
    const stackData = {
      current_screen: screenName,
      action: "select_merchant",
      merchant_id: data.merchantId,
      outlet_id: data.outletId,
      category_id: this.props.category.apiName,
      categories: this.props.category,
      categories_analytics: this.props.category,
      location_id: this.props.location.id,
      changeSequenceNumber: false,
    };
    this.makeCustomAnalyticsStack(stackData);
    this.onOutletClickHanler(data);
  };

  onOutletClickHanler(data: any) {
    console.log("outlet click: ", data);
    this.props.onSetMerchantData(data);
    const exposeData = {
      type: "onOutletClicked",
      data: data,
      onFavHandler: this.onFavHandler,
    };
    exposeFunction(exposeData);
  }

  makeCustomAnalyticsStack = async (stackData) => {
    await makeStackMongo(stackData);
    //resetStackObject();
    const dataStack = await getStackArrayMongo();
    console.log(dataStack, "getStackArrayMongo");
  };

  removeFilterHandler = async () => {
    console.log("remove filter");
    let filter = { ...this.props.selectedFilters[this.props.category.apiName] };
    delete filter[this.props.category.apiName];

    this.props.onSetSelectedFilterReset();

    const data = {
      refresh: false,
      more: false,
    };
  };

  addFilterHanler = async (data: any) => {
    console.log("selectedFilters add filter: ", data);

    //analytics
    this.makeAnalyticsStack(
      screenName,
      "select_filter",
      this.props.category.category_id,
      this.props.category.apiName,
      this.props.category.analytics_category_name,
      this.props.location.location_id,
      false
    );
    console.log("addFilterHanler selectedFilters: nomi");

    let filter = this.state.filters ? { ...this.state.filters } : {};

    if (this.props.category.apiName) {
      filter = {
        ...this.state.filters,
        [this.props.category.apiName]: data,
      };
    }
    this.props.onSetSelectedFilter(filter);
    /**
     * todo remove below line
     */

    // this.setState(
    //     {
    //       adaptor: {
    //         data: {
    //           ...this.state,
    //           selectedFilter: data,
    //         },
    //       },
    //       filters: filter,
    //     },()=>{

    //     })

    // await setItem("selectedFilters", JSON.stringify(filter));
    // this.setState(
    //   {
    //     adaptor: {
    //       data: {
    //         ...this.state,
    //         selectedFilter: data,
    //       },
    //     },
    //     filters: filter,
    //   },
    //   () => {
    //     console.log("new adaptor: ", this.state);
    //     const data = {
    //       refresh: false,
    //       more: false,
    //     };
    //     this.getOutletsDataHelper(data);
    //   }
    // );
    this.getOutletsDataHelper(data);
  };

  onRefreshUIHandler = () => {
    console.log("refresh");
    // this.setState({
    //   refreshUI: ++this.state.refreshUI,
    // });
  };

  onSearchCLickHandler = () => {
    //analytics
    this.makeAnalyticsStack(
      screenName,
      "click_search",
      this.props.category.id,
      this.props.category.apiName,
      this.props.category.analytics_category_name,
      this.props.location.id,
      false
    );
    const exposeData = {
      type: "searchClieked",
      data: {},
    };
    exposeFunction(exposeData);
    console.log("search");
  };

  backHandler=()=> {
    this.makeAnalyticsStack(
      screenName,
      "select_back",
      this.props.category.id,
      this.props.category.apiName,
      this.props.category.analytics_category_name,
      this.props.location.id,
      false
    );

    const exposeData = {
      type: "back",
      data: {},
    };
    exposeFunction(exposeData);
  }

  render() {
    const { tabs, activeTab } = this.state;
    const activeTabUid = activeTab?.uid;
    const { mode, activeTabLocal, badge, chipsData } = this.state;
    return (
      <View
        style={{ flex: 1 }}
        onTouchStart={() => {
          //this.refs.bottomSHeet.onClose();
        }}
      >
        <SafeAreaView
          forceInset={{ bottom: "never" }}
          style={{
            flex: 1,
            backgroundColor: design["--global--primary--BackgroundColor"]
              ? design["--global--primary--BackgroundColor"]
              : "#FFFFFF",
            paddingTop: Platform.OS === "android" ? 30 : 0,
            ...getFlipForRTLStyle(),
          }}
        >
          <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
            <OutletHeader1
              onPressBack={this.backHandler}
              onPressRightButton={this.onPressRightButton}
              mode={mode}
            />

            <OutletHeader2
              tabs={tabs}
              activeTab={activeTabLocal}
              onChangeTab={this.onChangeTab}
            />
            <CustomSearchBar
              onSearchPress={this.onSearchCLickHandler}
              onSearch={this.onSearchHandler}
              onClickFilter={this.onOpenFilters}
              badge={badge}
              textRender={
                <CustomText
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    paddingHorizontal: 16,
                    fontFamily: "MuseoSans300",
                    color: "rgb(0, 0, 0)",
                    ...getFlipForRTLStyle(),
                  }}
                >
                  {i18n.t("Search by name, places & more…")}
                </CustomText>
              }
            />

            <CustomChipList
              chipsData={chipsData}
              onDeleteChip={this.onDeleteChip}
            />
            {mode === "List" && (
              <CustomListing
                onEndReached={this.onEndReached}
                onRefresh={this.onRefresh}
                onOutletClick={this.onOutletClick}
                i18nCollection={i18nCollection}
              />
            )}

            {mode === "List" && (
              // activeTab === 0 &&
              // activeTabUid==="cheers"
              <CustomNoRecord i18nCollection={i18nCollection} />
            )}

            {mode === "List" &&
              activeTabUid === "cheers" &&
              activeTabLocal === 1 &&
              !this.state.cheersCheck && (
                <Cheers
                  cheersChecked={this.state.cheersChecked}
                  cheersRules={this.state.cheersRules}
                  getCheersData={this.getCheersDataHelper}
                  cheersSubmit={this.cheersSubmit}
                />
              )}
            {mode === "Map" && (
              <Map
                currentPosition={this.state.currentPosition}
                mapApi={this.getMapOutletsHandler}
                onOutletClick={this.onOutletClick}
              />
            )}
          </View>
        </SafeAreaView>
        <CustomBottomSheetComp
          bottomSheerColor="#FFFFFF"
          ref={this.bottomSheetRef}
          initialPosition={0}
          snapPoints={["75%", 0]}
          isBackDrop={true}
          isBackDropDismissByPress={false}
          isRoundBorderWithTipHeader={false}
          containerStyle={{
            padding: 0,
            margin: 0,
            backgroundColor: "#fff",
          }}
          //headerStyle={{ ...iosBottomSheetHeaderStyles }}
          bodyStyle={{
            flex: 1,
            backgroundColor: "rgba(226, 226, 226, 0.7)",
            //...iosBottomSheetContentStyles,
          }}
          header={
            <View style={styles.doneBtnWrapper}>
              <TouchableOpacity onPress={this.onClearHandler} activeOpacity={1}>
                <View style={[styles.doneBtn, { marginLeft: 15 }]}>
                  <CustomText isRTL={isRTL} style={{ color: "#FFFFFF" }}>
                    {i18n.t("CLEAR")}
                  </CustomText>
                </View>
              </TouchableOpacity>

              <CustomText isRTL={isRTL} style={{ color: "#FFFFFF" }}>
                {i18n.t("FILTERS")}
              </CustomText>

              <TouchableOpacity onPress={this.onDoneHanlder}>
                <View style={[styles.doneBtn, { marginRight: 15 }]}>
                  <CustomText isRTL={isRTL} style={{ color: "#FFFFFF" }}>
                    {i18n.t("DONE")}
                  </CustomText>
                </View>
              </TouchableOpacity>
            </View>
          }
          body={
            // <View style={{ flex: 1, paddingBottom: 10 }}>
            <OutletFilter
              ref={this.filterRaf}
              onChangeFilters={this.onChangeFilters}
              selectedFilter={
                this.props.selectedFilters
                  ? this.props.selectedFilters[this.props.category.apiName]
                  : {}
              }
              removeFilter={this.removeFilterHandler}
              addFilter={this.addFilterHanler}
              categoryKey={this.props.category.apiName}
              onRefreshUI={this.onRefreshUIHandler}
              i18nCollection={i18nCollection}
            />
            // </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  doneBtnWrapper: {
    backgroundColor: "#A5A5A5",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  doneBtn: {
    height: 30,
    width: 68,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = createStructuredSelector({
  currentLocation: selectCurrentLocation, //
  location: selectLocation, //
  category: selectHomeCategory, //
  token: selectUserToken,
  user: selectUserInfo,
  selectedFilters: selectSelectedFilter,
  favouriteList: selectFavouriteList,
});

const mapDispatchToProps = (dispatch, props) => ({
  onSetAppLoading: (data) => dispatch(setAppLoading(data)),
  onSetErrorObject: (data) => dispatch(setErrorObject(data)),
  onSetOutletList: (data) => dispatch(setOutletList(data)),
  onSetMapOutletList: (data) => dispatch(setMapOutletList(data)),
  onSetFavouriteList: (data) => dispatch(setFavouriteList(data)),
  onSetSelectedFilter: (data) => dispatch(setSelectedFilter(data)),
  onSetMerchantData: (data) => dispatch(setMerchantData(data)),
  onSetSelectedFilterReset: () => dispatch(setSelectedFilterReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OutletScreen);
