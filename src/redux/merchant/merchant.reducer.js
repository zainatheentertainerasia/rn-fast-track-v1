import { MerchantActionTypes } from "./merchant.types";

const INITIAL_STATE = {
  selectedOutlet:null,
  merchantData:null,
  selectedOffer:null,
  menu: '',
  website: '',
};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MerchantActionTypes.SET_MERCHANT_VALUES:
      return {
        ...state,
        ...action.data,
      };
			
		
    default:
      return state;
  }
};

export default testReducer;
