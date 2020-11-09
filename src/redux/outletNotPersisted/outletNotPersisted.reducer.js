import { OutletNotPersistedActionTypes } from "./outletNotPersisted.types";

const INITIAL_STATE = {
  OutletList: [],
  mapOutletList: [],
  cheersRules: null,
  cheersCheck: false,
  cheersChecked: false,
};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OutletNotPersistedActionTypes.SET_OUTLETNOTPERSISTED_LIST:
      return {
        ...state,
        OutletList: action.OutletList,
      };
      
      case OutletNotPersistedActionTypes.SET_OUTLETNOTPERSISTED_MAP_LIST:
      return {
        ...state,
        mapOutletList: action.mapOutletList,
			};
			
    default:
      return state;
  }
};

export default testReducer;
