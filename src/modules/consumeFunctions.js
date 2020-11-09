

import { onSetComsumeValues as ft_rn_notificationConsumer } from './ft_rn_notification/src/redux/consumer';
import { onSetComsumeValues as ft_rn_search_moduleConsumer } from './ft_rn_search_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_outlet_moduleConsumer } from './ft_rn_outlet_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_home_moduleConsumer } from './ft_rn_home_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_auth_moduleConsumer } from './ft_rn_auth_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_merchant_moduleConsumer } from './ft_rn_merchant_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_fav_moduleConsumer } from './ft_rn_fav_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_user_profile_moduleConsumer } from './ft_rn_user_profile_module/src/redux/consumer';


export const setConsumeFunctionft_rn_notification =async (data) => {
			await ft_rn_notificationConsumer(data);
		};
export const setConsumeFunctionft_rn_search_module =async (data) => {
			await ft_rn_search_moduleConsumer(data);
		};
export const setConsumeFunctionft_rn_outlet_module =async (data) => {
			await ft_rn_outlet_moduleConsumer(data);
		};
export const setConsumeFunctionft_rn_home_module =async (data) => {
			await ft_rn_home_moduleConsumer(data);
		};
export const setConsumeFunctionft_rn_auth_module =async (data) => {
			await ft_rn_auth_moduleConsumer(data);
		};
export const setConsumeFunctionft_rn_merchant_module =async (data) => {
			await ft_rn_merchant_moduleConsumer(data);
		};
export const setConsumeFunctionft_rn_fav_module =async (data) => {
			await ft_rn_fav_moduleConsumer(data);
		};
export const setConsumeFunctionft_rn_user_profile_module =async (data) => {
			await ft_rn_user_profile_moduleConsumer(data);
		};

	