
	// stores
import { store as ft_rn_notificationStore } from './ft_rn_notification/src/redux/store';
import { store as ft_rn_search_moduleStore } from './ft_rn_search_module/src/redux/store';
import { store as ft_rn_outlet_moduleStore } from './ft_rn_outlet_module/src/redux/store';
import { store as ft_rn_home_moduleStore } from './ft_rn_home_module/src/redux/store';
import { store as ft_rn_auth_moduleStore } from './ft_rn_auth_module/src/redux/store';
import { store as ft_rn_merchant_moduleStore } from './ft_rn_merchant_module/src/redux/store';
import { store as ft_rn_fav_moduleStore } from './ft_rn_fav_module/src/redux/store';
import { store as ft_rn_user_profile_moduleStore } from './ft_rn_user_profile_module/src/redux/store';


// module json to get info for expose and consume
import ft_rn_notificationJson from './ft_rn_notification/src/Module.json'
import ft_rn_search_moduleJson from './ft_rn_search_module/src/Module.json'
import ft_rn_outlet_moduleJson from './ft_rn_outlet_module/src/Module.json'
import ft_rn_home_moduleJson from './ft_rn_home_module/src/Module.json'
import ft_rn_auth_moduleJson from './ft_rn_auth_module/src/Module.json'
import ft_rn_merchant_moduleJson from './ft_rn_merchant_module/src/Module.json'
import ft_rn_fav_moduleJson from './ft_rn_fav_module/src/Module.json'
import ft_rn_user_profile_moduleJson from './ft_rn_user_profile_module/src/Module.json'


import { onSetComsumeValues as ft_rn_notificationConsumer } from './ft_rn_notification/src/redux/consumer';
import { onSetComsumeValues as ft_rn_search_moduleConsumer } from './ft_rn_search_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_outlet_moduleConsumer } from './ft_rn_outlet_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_home_moduleConsumer } from './ft_rn_home_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_auth_moduleConsumer } from './ft_rn_auth_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_merchant_moduleConsumer } from './ft_rn_merchant_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_fav_moduleConsumer } from './ft_rn_fav_module/src/redux/consumer';
import { onSetComsumeValues as ft_rn_user_profile_moduleConsumer } from './ft_rn_user_profile_module/src/redux/consumer';


import _ from 'lodash';
import path from 'path';

const pickedObjectFromExpose = (moduleJson, store) => {
	let returnableObject = {};
	moduleJson.expose.map((exposeItem) => {
		const pickedObject = _.pick(store[exposeItem.reducerName], exposeItem.keys);
		returnableObject = {
			...returnableObject,
			...pickedObject
		};
	});
	return returnableObject;
};

const giveDataToReducer = async (data, consumer) => {
	await consumer({ isTemplate: true, ...data });
};


const dataSharing = async () => {
	try {

    //subscribing all the modules stores to check
    //all the stores have been initialized
    let count = 0;
    const unsubscribeft_rn_notification = ft_rn_notificationStore.subscribe(async () => {
		unsubscribeft_rn_notification();
		count++;
	      });
const unsubscribeft_rn_search_module = ft_rn_search_moduleStore.subscribe(async () => {
		unsubscribeft_rn_search_module();
		count++;
	      });
const unsubscribeft_rn_outlet_module = ft_rn_outlet_moduleStore.subscribe(async () => {
		unsubscribeft_rn_outlet_module();
		count++;
	      });
const unsubscribeft_rn_home_module = ft_rn_home_moduleStore.subscribe(async () => {
		unsubscribeft_rn_home_module();
		count++;
	      });
const unsubscribeft_rn_auth_module = ft_rn_auth_moduleStore.subscribe(async () => {
		unsubscribeft_rn_auth_module();
		count++;
	      });
const unsubscribeft_rn_merchant_module = ft_rn_merchant_moduleStore.subscribe(async () => {
		unsubscribeft_rn_merchant_module();
		count++;
	      });
const unsubscribeft_rn_fav_module = ft_rn_fav_moduleStore.subscribe(async () => {
		unsubscribeft_rn_fav_module();
		count++;
	      });
const unsubscribeft_rn_user_profile_module = ft_rn_user_profile_moduleStore.subscribe(async () => {
		unsubscribeft_rn_user_profile_module();
		count++;
	      });

    const isAllPromiseResolve = () => {
	if (count === 8 ) {
	  return true;
	} else {
	  return false;
	}
      };
	const x = new Promise((resolve) => {
		const unsubscribe = ft_rn_notificationStore.subscribe(async () => {
			unsubscribe();

			//added 500 MS time interval to clear IntervalTimer when all the promises are resolved

			setInterval(() => {
			if (isAllPromiseResolve()) {
			clearInterval();
			} else {
			console.log('here');
			}
			}, 500);
	
			const ft_rn_notification_store = ft_rn_notificationStore.getState();
const ft_rn_search_module_store = ft_rn_search_moduleStore.getState();
const ft_rn_outlet_module_store = ft_rn_outlet_moduleStore.getState();
const ft_rn_home_module_store = ft_rn_home_moduleStore.getState();
const ft_rn_auth_module_store = ft_rn_auth_moduleStore.getState();
const ft_rn_merchant_module_store = ft_rn_merchant_moduleStore.getState();
const ft_rn_fav_module_store = ft_rn_fav_moduleStore.getState();
const ft_rn_user_profile_module_store = ft_rn_user_profile_moduleStore.getState();


			let allData = {};

			const picked_expose_object_ft_rn_notification_store = pickedObjectFromExpose(ft_rn_notificationJson, ft_rn_notification_store);
		allData = {
			...allData,
			...picked_expose_object_ft_rn_notification_store
		};
const picked_expose_object_ft_rn_search_module_store = pickedObjectFromExpose(ft_rn_search_moduleJson, ft_rn_search_module_store);
		allData = {
			...allData,
			...picked_expose_object_ft_rn_search_module_store
		};
const picked_expose_object_ft_rn_outlet_module_store = pickedObjectFromExpose(ft_rn_outlet_moduleJson, ft_rn_outlet_module_store);
		allData = {
			...allData,
			...picked_expose_object_ft_rn_outlet_module_store
		};
const picked_expose_object_ft_rn_home_module_store = pickedObjectFromExpose(ft_rn_home_moduleJson, ft_rn_home_module_store);
		allData = {
			...allData,
			...picked_expose_object_ft_rn_home_module_store
		};
const picked_expose_object_ft_rn_auth_module_store = pickedObjectFromExpose(ft_rn_auth_moduleJson, ft_rn_auth_module_store);
		allData = {
			...allData,
			...picked_expose_object_ft_rn_auth_module_store
		};
const picked_expose_object_ft_rn_merchant_module_store = pickedObjectFromExpose(ft_rn_merchant_moduleJson, ft_rn_merchant_module_store);
		allData = {
			...allData,
			...picked_expose_object_ft_rn_merchant_module_store
		};
const picked_expose_object_ft_rn_fav_module_store = pickedObjectFromExpose(ft_rn_fav_moduleJson, ft_rn_fav_module_store);
		allData = {
			...allData,
			...picked_expose_object_ft_rn_fav_module_store
		};
const picked_expose_object_ft_rn_user_profile_module_store = pickedObjectFromExpose(ft_rn_user_profile_moduleJson, ft_rn_user_profile_module_store);
		allData = {
			...allData,
			...picked_expose_object_ft_rn_user_profile_module_store
		};

			const storeInfoArray = [
				{
			consumer : ft_rn_notificationConsumer
		},
				{
			consumer : ft_rn_search_moduleConsumer
		},
				{
			consumer : ft_rn_outlet_moduleConsumer
		},
				{
			consumer : ft_rn_home_moduleConsumer
		},
				{
			consumer : ft_rn_auth_moduleConsumer
		},
				{
			consumer : ft_rn_merchant_moduleConsumer
		},
				{
			consumer : ft_rn_fav_moduleConsumer
		},
				{
			consumer : ft_rn_user_profile_moduleConsumer
		}
			];

			const y =storeInfoArray.map(async (storeInfoItem) => {
				await giveDataToReducer(allData, storeInfoItem.consumer);
			});
			await Promise.all(y);
			
			resolve();
		});
	});
	await Promise.resolve(x);
	return true;
} catch (error) {
	console.log("error==>",error)
	return true;
}
};

export default dataSharing;

	