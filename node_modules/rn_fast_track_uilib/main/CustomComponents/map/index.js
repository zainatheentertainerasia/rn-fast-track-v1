import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import resturent_map_marker from "../../images/resturent_map_marker.png";
import TextLabel from "../Text/Text";

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: -37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

var width = Dimensions.get("window").width;

var rad = function (x) {
  return (x * Math.PI) / 180;
};

const selectedPinDetail = (currentPosition, selectedPin, onOutletClick) => {
  let distance = calculateDistance(currentPosition, {
    latitude: selectedPin.latitude,
    longitude: selectedPin.longitude,
  });
  if (distance >= 1000) {
    distance = Math.round(distance / 1000) + "km";
  } else {
    distance = distance + "m";
  }

  return (
    <View
      style={{
        width: width,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
      }}
    >
      <View
        style={{
          width: width - 20,
          height: 100,
          backgroundColor: "#FFFFFF",
          borderRadius: 4,
          marginBottom: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            onOutletClick({
              favourite: selectedPin.favourite,
              merchantId: selectedPin.merchantId,
              outletId: selectedPin.outletId,
            })
          }
        >
          <View
            style={{
              width: width - 20,
              height: 100,
              justifyContent: "center",
              // alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{ height: 100, width: 100 }}>
              <Image
                source={{ uri: selectedPin.merchantLogo }}
                style={{ height: 100, width: 100 }}
              />
            </View>

            <View style={{ marginLeft: 5, padding: 5 }}>
              <TextLabel
                style={{
                  textAlign: "left",
                  color: "#252525",
                  fontWeight: "500",
                  marginBottom: 5,
                }}
              >
                {selectedPin.merchantName}
              </TextLabel>

              <TextLabel
                style={{
                  textAlign: "left",
                  fontSize: 11,
                  width: width - 150,
                  marginBottom: 8,
                }}
              >
                {selectedPin.humanLocation}
              </TextLabel>

              <TextLabel style={{ textAlign: "left", fontSize: 12 }}>
                {distance}
              </TextLabel>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const calculateDistance = (p1, p2) => {
  var R = 6378137; // Earth's mean radius in meter
  var dLat = rad(p2.latitude - p1.latitude);
  var dLong = rad(p2.longitude - p1.longitude);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.latitude)) *
      Math.cos(rad(p2.latitude)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return Math.round(d); // returns the distance in meter
};

export default class index extends Component {
  map = null;

  // componentDidMount(){
  //   this.getLocation();
  // }

  getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
    }
  };

  state = {
    region: {
      latitude: -37.78825,
      longitude: -122.4324,
      latitudeDelta: 1,
      longitudeDelta: 1,
    },
    ready: false,
    filteredMarkers: [],
    selectedPin: null,
  };

  setRegion(region) {
    if (this.state.ready) {
      setTimeout(() => {
        this.map.animateToRegion(region);
      }, 10);
    }
    //this.setState({ region });
  }

  componentDidMount() {
    console.log("Component did mount");
  }

  onMapReady = (e) => {
    if (!this.state.ready) {
      this.setState({ ready: true }, () => {
        this.getCurrentPosition();
      });
    }
  };

  onRegionChange = (region) => {
    console.log("onRegionChange", region);
  };

  onRegionChangeComplete = (region) => {
    console.log("onRegionChangeComplete", region);
  };

  render() {
    const { region, selectedPin } = this.state;
    const {
      mapKey,
      list,
      currentPosition,
      mapApi,
      mapCenterPosition,
      onOutletClick,
    } = this.props;

    let markerArray = [];
    if (list) {
      markerArray = [...list];
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          apiKey={mapKey}
          ref={(map) => {
            this.map = map;
          }}
          style={styles.map}
          // showsUserLocation={true}
          initialRegion={{
            ...initialRegion,
            latitude: mapCenterPosition.latitude,
            longitude: mapCenterPosition.longitude,
          }}
          // region={region}
          // region={{
          //   ...initialRegion,
          //   latitude: mapCenterPosition.latitude,
          //   longitude: mapCenterPosition.longitude,
          // }}

          onRegionChangeComplete={(region) => this.setState({ region })}
          onRegionChangeComplete={(region) => {
            const center = region;
            let northeast = {
              latitude: center.latitude + center.latitudeDelta / 2,
              longitude: center.longitude + center.longitudeDelta / 2,
            };

            const data = {
              coords: {
                lat: center.latitude,
                lng: center.longitude,
              },
              radius: calculateDistance(center, northeast),
            };

            mapApi(data);
          }}
        >
          {markerArray.map((markerItem) => {
            return (
              <Marker
                // description="Current location"
                // image={{
                //   uri:
                //     "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
                // }}

                image={resturent_map_marker}
                // coordinate={region}
                coordinate={{
                  ...initialRegion,
                  latitude: markerItem.latitude,
                  longitude: markerItem.longitude,
                }}
                onPress={() => {
                  this.setState({ selectedPin: markerItem });
                }}
              />
            );
          })}
        </MapView>
        {selectedPin
          ? selectedPinDetail(currentPosition, selectedPin, onOutletClick)
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: 500,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
