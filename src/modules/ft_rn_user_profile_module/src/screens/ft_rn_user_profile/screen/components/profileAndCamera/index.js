import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import profileDummyImage from '../../images/profilepic_placeholder.gif';
import cameraimage from '../../images/camera-icon.png';
import * as ImageManipulator from 'expo-image-manipulator';

import {
  CustomComponents,
  init_font,
  FastTrackLibs,
  design
} from 'rn_fast_track_uilib';

const {
  ErrorModal,
  Loader,
  CustomText,
  TextLabel,
  HeaderWithBackButton,
  WebViewModal,
  ResetPasswordModal,
  ResetPasswordSuccessModal,
} = CustomComponents;
const {
  AntDesign,
  Header,
  createMaterialTopTabNavigator,
  ImagePicker,
  Permissions,
  ActionSheet,
} = FastTrackLibs;

class index extends Component {
  onSetImageHandler = (file) => {
    this.props.onCameraClick(file);
  };

  _pickCamera = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        //alert('Sorry, we need camera permissions to make this work!');
        Alert.alert(
          '',
          'Turn on Camera permission from Settings to allow app to access your Camera',
          [
            {
              text: 'Settings',
              onPress: () => Linking.openURL('app-settings:'),
            },
            { text: 'Cancel', onPress: () => console.log('cancel') },
          ],
          { cancelable: false }
        );
        return;
      }
    } catch (error) {}

    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.cancelled) {
        const compressedImage = await ImageManipulator.manipulateAsync(result.uri, [{ resize: { width: 600 }}], {compress: 0.7});
        this.onSetImageHandler(compressedImage);
      }
    } catch (E) {
      console.log(E);
    }
  };

  _pickImage = async () => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    } catch (error) {}

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      if (!result.cancelled) {
        const compressedImage = await ImageManipulator.manipulateAsync(result.uri, [{ resize: { width: 600 }}], {compress: 0.7});
        this.onSetImageHandler(compressedImage);
      }
    } catch (E) {
      console.log(E);
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  onPressActionSheetHandler = (index) => {
    switch (index) {
      case 0:
        this._pickCamera();

        break;

      case 1:
        this._pickImage();
        break;
    }
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image
            source={
              user.profileImage === ''
                ? profileDummyImage
                : { uri: user.profileImage }
            }
            style={styles.image}
          />
        </View>

        <View style={styles.containerWrapper}>
          <View style={{ padding: 20 }}>
            <TextLabel
              style={{ paddingBottom: 10, fontSize: 18, lineHeight: 20 }}
            >
              {user.firstName + ' ' + user.lastName}
            </TextLabel>
            <TextLabel>{user.email}</TextLabel>
          </View>

          <View style={styles.camera}>
            <TouchableOpacity onPress={this.showActionSheet}>
              <Image
                source={cameraimage}
                style={{ height: 40, width: 40 }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        </View>

        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={'Update Profile Image'}
          options={['Camera', 'Gallery', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={2}
          onPress={this.onPressActionSheetHandler}
        />
      </View>
    );
  }
}

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: design['--global--tertiary--BackgroundColor']?design['--global--tertiary--BackgroundColor']:'rgb(240, 240, 240)',
  },
  imageWrapper: {
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
    borderColor: 'white',
    borderWidth: 2,
    resizeMode: 'cover',
  },
  camera: {
    height: 40,
    width: 40,
    position: 'absolute',
    right: 20,
    top: 20,
  },
  containerWrapper: {},
});