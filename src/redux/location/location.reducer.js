import { LocationActionTypes } from "./location.types";

const INITIAL_STATE = {
	LocationList: null,
  location:null,
  currentLocation:null,
};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LocationActionTypes.SET_LOCATION_LIST:
      return {
        ...state,
        LocationList: action.LocationList,
			};
			
			
			case LocationActionTypes.SET__HOME_SELECTED_LOCATION:
      return {
        ...state,
        location: action.location,
      };
      
      
      case LocationActionTypes.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.currentLocation,
      };


			case LocationActionTypes.SET_LOCATION_VALUES:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export default testReducer;
