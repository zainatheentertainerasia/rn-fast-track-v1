import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { Entypo, Ionicons, Feather } from '@expo/vector-icons';

interface propsInterface {
  email: any;
  phone: any;
  location: any;
}

const dialCall = (number: any) => {
  let phoneNumber = '';
  if (Platform.OS === 'android') {
    phoneNumber = `tel:${number}`;
  } else {
    phoneNumber = `telprompt:${number}`;
  }
  Linking.openURL(phoneNumber);
};

const openGps = (lat: any, lng: any) => {
  let scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
  let url = scheme + `${lat},${lng}`;
  Linking.openURL(url);
};

const sendEmail = (email: string) => {
  Linking.openURL(`mailto:${email}`);
};

const header = (props: any) => {
  const {
    email,
    phone,
    location,
    merchant,
    selectedOutlet,
    pushAnalytics,
  } = props;
  return (
    <View style={styles.headerParent}>
      {email ? (
        <Feather
          style={styles.icon}
          name='mail'
          size={22}
          color='white'
          onPress={() => {
            //analytics
            const stackData = {
              current_screen: 'Merchant Detail',
              action: 'click_email',
              merchant_id: merchant.id,
              outlet_id: selectedOutlet.id,
              category_id: 0,
              categories: '',
              categories_analytics: '',
              location_id: 0,
              changeSequenceNumber: false,
            };
            pushAnalytics(stackData);
            sendEmail(email);
          }}
        />
      ) : null}
      {phone ? (
        <Feather
          style={styles.icon}
          name='phone-call'
          size={20}
          color='white'
          onPress={() => {
            //analytics
            const stackData = {
              current_screen: 'Merchant Detail',
              action: 'click_call',
              merchant_id: merchant.id,
              outlet_id: selectedOutlet.id,
              category_id: 0,
              categories: '',
              categories_analytics: '',
              location_id: 0,
              changeSequenceNumber: false,
            };
            pushAnalytics(stackData);

            dialCall(phone.replace(/\s/g, ''));
          }}
        />
      ) : null}
      {location ? (
        <Feather
          style={styles.icon}
          name='map-pin'
          size={20}
          color='white'
          onPress={() => {
            //analytics
            const stackData = {
              current_screen: 'Merchant Detail',
              action: 'click_outlet_location_map',
              merchant_id: merchant.id,
              outlet_id: selectedOutlet.id,
              category_id: 0,
              categories: '',
              categories_analytics: '',
              location_id: 0,
              changeSequenceNumber: false,
            };
            pushAnalytics(stackData);
            openGps(location.lat, location.lng);
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerParent: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#646466',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    alignItems: 'center',
    fontSize: 16,
    fontFamily: 'MuseoSans300',
    color: 'white',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingEnd: 20,
  },
});

export default header;
