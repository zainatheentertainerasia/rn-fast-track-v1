import React, { Component } from "react";
import { Image, View, Dimensions, TouchableWithoutFeedback } from "react-native";
import Carousel from 'react-native-snap-carousel';
import CustomText from '../Text/Text'
const width = Dimensions.get("window").width;

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: this.props.carouselItems,
    };
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={{marginRight:5,backgroundColor:"#F0F0F0"}}>
      <TouchableWithoutFeedback onPress={() => this.props.onPress(item)}>
        <View>
          <Image
            resizeMode="contain"
            source={{
              uri: item.image
            }}
            style={{ width: 320, height: 143 }}
          />
          <View style={{justifyContent:"center",alignItems:"center",height:50}}>
          {item.title!=="" && 
          <CustomText style={{ fontSize: 14 }}>
            {item.title}
          </CustomText>
        }
        </View>
        </View>
      </TouchableWithoutFeedback>
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Carousel
          inactiveSlideScale={1}
          layout={"default"}
          ref={(ref) => (this.carousel = ref)}
          data={this.state.carouselItems}
          sliderWidth={width - 50}
          itemWidth={width - 50}
          renderItem={this._renderItem}
          onSnapToItem={(index) => this.setState({ activeIndex: index })}
        />
      </View>
    );
  }
}

export default index;
