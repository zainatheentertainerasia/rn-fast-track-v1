import { OutletActionTypes } from "./outlet.types";

const INITIAL_STATE = {
  outlet:null,
  currentOutlet:null,
  merchantData:null,
  selectedFilters:null,
  favouriteList:null,
};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
			
			case OutletActionTypes.SET_HOME_SELECTED_OUTLET:
      return {
        ...state,
        outlet: action.outlet,
      };
      
      
      case OutletActionTypes.SET_MERCHANT_DATA:
      return {
        ...state,
        merchantData: action.merchantData,
      };
      
      
      case OutletActionTypes.SET_CURRENT_OUTLET:
      return {
        ...state,
        currentOutlet: action.currentOutlet,
      };


			case OutletActionTypes.SET_OUTLET_VALUES:
      return {
        ...state,
        ...action.data,
      };
      
      case OutletActionTypes.SET_SELECTED_FILTER:
      return {
        ...state,
        selectedFilters:action.selectedFilters
      };
      
      case OutletActionTypes.SET_FAVOURITE_LIST:
      return {
        ...state,
        favouriteList:action.favouriteList
      };


      case OutletActionTypes.SET_SELECTED_FILTER_RESET:
      return {
        ...state,
        selectedFilters:null
      };

    default:
      return state;
  }
};

export default testReducer;
