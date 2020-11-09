import { HomeActionTypes } from "./home.types";

const INITIAL_STATE = {
	homeSection: null,
	category: null
};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HomeActionTypes.SET_HOME_SECTION:
      return {
        ...state,
        homeSection: action.homeSection,
			};
			
			
			case HomeActionTypes.SET_HOME_CATEGORY:
      return {
        ...state,
        category: action.category,
      };


			case HomeActionTypes.SET_HOME_VALUES:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export default testReducer;
