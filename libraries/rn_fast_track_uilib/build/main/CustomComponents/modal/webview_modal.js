import React, { Component, useState } from 'react';
import {
  Alert,
  StyleSheet,
  TouchableHighlight,
  View,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Text from '../Text/Text';
import { Header } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import APP_COLORS from '../../../design/colors';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import {Portal} from 'react-native-paper'
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class WebViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        color='#009688'
        size='large'
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  onError = (errorName) => {
    return (
      <View style={styles.WebViewStyle}>
        <Text
          style={{
            textAlign: 'center',
            alignContent: 'center',
            justifyContent: 'center',
          }}
        >
          {errorName}
        </Text>
      </View>
    );
  };

  headerCenterComponent() {
    return (
      <Text numberOfLines={1} style={{ fontSize: 14 }}>
        {this.props.headerString}
      </Text>
    );
  }

  headerRightComponent() {
    const { disableCalback } = this.props;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          disableCalback();
        }}
        style={{ marginRight: 8 }}
      >
        <Ionicons
          name='md-close'
          size={32}
          color={APP_COLORS.LIGHT_GREY}
          onPress={() => disableCalback()}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const { urlString, isVisible } = this.props;
    return isVisible ? (
      <Portal>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: Platform.OS === 'android' ? 30 : 0,
          ...StyleSheet.absoluteFillObject,
          
        }}
      >
        <View style={{ width: '100%', height: '100%' }}>
          <Header
            containerStyle={{
              borderBottomColor: APP_COLORS.LIGHT_GREY,
              borderBottomWidth: 1,
              paddingTop: 0,
              height: 45,
              backgroundColor: '#fff',
            }}
            backgroundColor={'White'}
            centerComponent={this.headerCenterComponent()}
            rightComponent={this.headerRightComponent()}
          />

          <WebView
            style={styles.WebViewStyle}
            //Loading URL
            source={{ uri: urlString }}
            //Enable Javascript support
            javaScriptEnabled={true}
            //For the Cache
            domStorageEnabled={true}
            cacheEnabled={true}
            //show vertical scrol indicator
            showsVerticalScrollIndicator={true}
            //View to show while loading the webpage
            renderLoading={this.ActivityIndicatorLoadingView}
            // //Want to show the view or not
            startInLoadingState={true}
            onLoad={(syntheticEvent) => {}}
            //error handling
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.log('WebView error: ', nativeEvent);
            }}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;

              let f_errorName = 'Web View Error';
              let f_errorMessage =
                'Web View Http Error => ' + nativeEvent.statusCode;

              //console.warn('WebView received error status code: ', nativeEvent.statusCode);
            }}
            renderError={(errorName) => this.onError(errorName)}
          />
        </View>
      </SafeAreaView>
      </Portal>
    ) : null;
  }
}
const styles = StyleSheet.create({
  modalStyle: {
    margin: 0,
  },
  headerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cacaca',
    width: '100%',
    height: 50,
  },
  iconStyle: {
    position: 'absolute',
    right: 16,
  },
  WebViewStyle: {
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  ActivityIndicatorStyle: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

// export default App;
