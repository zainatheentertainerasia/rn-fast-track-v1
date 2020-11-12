import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window');

interface sliderProps {
  urls: string[];
}

class ImageSlider extends React.Component<any, any> {
  render() {
    const { urls } = this.props;

    return (
      <Swiper
        containerStyle={{
          width: width,
          flexDirection: 'row',
          height: 200,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        key={urls.length}
        showsButtons={false}
        dot={
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
              borderWidth: 0.8,
              borderColor: 'white',
            }}
          />
        }
        activeDot={
          <View
            style={{
              backgroundColor: 'white',
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 3,
              marginRight: 3,
              marginTop: 3,
              marginBottom: 3,
            }}
          />
        }
      >
        {urls.map((url:any, index:number) => {
          return (
            <TouchableOpacity
            key={index}
              activeOpacity={1}
              onPress={() => {
                //analytics
                const stackData = {
                  current_screen: 'Merchant Detail',
                  action: 'click_image',
                  merchant_id: this.props.merchantID,
                  outlet_id: this.props.outletID,
                  category_id: 0,
                  categories: '',
                  categories_analytics: '',
                  location_id: 0,
                  changeSequenceNumber: false,
                };
                this.props.pushAnalytics(stackData);
                console.log('image clicked');
              }}
            >
              <View key={index}>
                <Image
                  source={{
                    uri: url,
                  }}
                  style={{
                    width: width,
                    height: 200,
                  }}
                  resizeMode='cover'
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </Swiper>
    );
  }
}

export default ImageSlider;

const styles = StyleSheet.create({
  sliderParent: {
    flexDirection: 'row',
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'MuseoSans300',
    color: '#2a2a2a',
  },
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});
