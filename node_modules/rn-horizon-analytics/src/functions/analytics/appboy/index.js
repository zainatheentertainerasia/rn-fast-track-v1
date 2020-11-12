import { reject } from 'lodash';
import { resolve } from 'path';
import {Platform,Linking} from 'react-native';

const ReactAppboy = require('react-native-appboy-sdk');
// import FCM from "react-native-fcm";

const getDeviceToken=async ()=>{
  var deviceToken='';

  // await  FCM.getFCMToken().then(token => {
  //   console.log("TOKEN (getFCMToken)", token);
    
  //   deviceToken=token;
  // });


  return deviceToken;
}


const registerUserAppBoy=(userProfile)=>{
  ReactAppboy.enableSDK();
  ReactAppboy.changeUser(userProfile.userId+"");
  ReactAppboy.setFirstName(userProfile.firstName)
  ReactAppboy.setLastName(userProfile.lastName)
  ReactAppboy.setEmail(userProfile.email)
  ReactAppboy.setCountry(userProfile.countryOfResidence)
  ReactAppboy.setPhoneNumber(userProfile.mobilePhone)
  ReactAppboy.setEmailNotificationSubscriptionType(ReactAppboy.NotificationSubscriptionTypes.SUBSCRIBED);  
  ReactAppboy.setPushNotificationSubscriptionType("subscribed")
  // console.log(token,"token fcm fcm")
  // ReactAppboy.registerAndroidPushToken(token);
}

const registerSelectedLocation=(locationName)=>{
  ReactAppboy.setCustomUserAttribute("Product Location Selected in the App",locationName);
}

const registrationCompleteEvent=()=>{
  ReactAppboy.logCustomEvent("registration complete",{});
  return;
  ReactAppboy.setCustomUserAttribute("registration complete","registration complete");
}


const afterRedemptionEvent=(redemptionEventData)=>{
  ReactAppboy.logCustomEvent("Redeemed",{
    Redemptiondate:new Date(),
    ...redemptionEventData
  })
  return;
  ReactAppboy.setCustomUserAttribute("Redemptiondate",new Date());
  ReactAppboy.setCustomUserAttribute("MerchantName",redemptionEventData.MerchantName);
  ReactAppboy.setCustomUserAttribute("OutletName",redemptionEventData.OutletName);

  // if(currentOffer!=null)
  // {
  ReactAppboy.setCustomUserAttribute("Savings",redemptionEventData.Savings);
  // }
  ReactAppboy.setCustomUserAttribute("Currency",redemptionEventData.Currency);
// ReactAppboy.setCustomUserAttribute("eventProperties","Redeemed");

}

const onSearchEvent=(data)=>{
  ReactAppboy.logCustomEvent("Global Search",{
    'Last Search':data.lastSearch,
    Timestamp:data.timeStamp
  })
  return;
  ReactAppboy.setCustomUserAttribute("Last Search",data.lastSearch);
  // " HH:mm dd:mm:yyyy" current date timestamp
  ReactAppboy.setCustomUserAttribute("Timestamp",data.timeStamp);
  // ReactAppboy.setCustomUserAttribute("eventProperties","Global Search");

}

const setDatOfBirth=(dateOfBirth)=>{
  ReactAppboy.setDateOfBirth(dateOfBirth)
}

const pushEnableDisable=(isEnable)=>{
  const subscriptionType=isEnable?"subscribed":"unsubscribed";
  ReactAppboy.setPushNotificationSubscriptionType(subscriptionType)
}

const androidGetInitialURL=(callback)=>{
  Linking.getInitialURL().then(url => {
    callback(url)
  }).catch(e=>{
    callback(url);
    console.log(e,"error")
  })

}

const AppBoyGetInitialURL=Platform.OS==="ios"?ReactAppboy.getInitialURL:androidGetInitialURL;

export default {
  registerUserAppBoy,
  registrationCompleteEvent,
  afterRedemptionEvent,
  onSearchEvent,
  setDatOfBirth,
  getDeviceToken,
  registerSelectedLocation,
  pushEnableDisable,
  AppBoyGetInitialURL
}