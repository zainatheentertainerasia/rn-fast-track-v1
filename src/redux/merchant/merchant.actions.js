import { MerchantActionTypes } from './merchant.types';


export const setMerchantValues = (data) =>({
	type : MerchantActionTypes.SET_MERCHANT_VALUES,
	data:data
})