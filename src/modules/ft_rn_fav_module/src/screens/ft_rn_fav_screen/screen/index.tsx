import React from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import { Port as port } from './port';
import Favourite from './components/fav';

import APP_COLORS from '../screen/res/colors';

import GlobalStyles from '../screen/res/styles/globalStyles';
import i18n, { getFlipForRTLStyle } from '../screen/utils/localization/I18n';
import {
  CustomComponents,
  init_font,
  FastTrackLibs,
} from 'rn_fast_track_uilib';

const { HeaderWithLogo } = CustomComponents;
const { createMaterialTopTabNavigator } = FastTrackLibs;
const Tab = createMaterialTopTabNavigator();
export default class FavouriteMain extends React.Component<port> {
  //for removing warning
  //https://stackoverflow.com/questions/60586470/how-to-remove-warning-in-react-native
  favouriteComponent = () => {
    console.log(this.props.data, 'favouriteComponent');
    return <Favourite calbacks={this.props.CallBacks} data={this.props.data} />;
  };

  render() {
    return (
      <SafeAreaView style={[GlobalStyles.droidSafeArea, getFlipForRTLStyle()]}>
        <View
          style={{
            flex: 1,
            backgroundColor: APP_COLORS.COLOR_BACKGROUND,
            flexDirection: 'column',
          }}
        >
          <HeaderWithLogo getFlipForRTLStyle={getFlipForRTLStyle} />
          <Tab.Navigator
            tabBarOptions={{
              inactiveTintColor: APP_COLORS.COLOR_666666,
              activeTintColor: APP_COLORS.COLOR_BLACK,
              style: {
                backgroundColor: 'white',
                marginTop: 0,
                marginBottom: 0,
                height: 40,
              },
              indicatorStyle: {
                height: 3,
                backgroundColor: APP_COLORS.COLOR_THEME,
              },
              labelStyle: {
                fontFamily: 'MuseoSans700',
                lineHeight: 16,
                ...getFlipForRTLStyle(),
              },
            }}
          >
            <Tab.Screen
              name='Fav'
              component={() => {
                return (
                  <Favourite
                    calbacks={this.props.CallBacks}
                    data={this.props.data}
                  />
                );
              }}
              options={{
                title: i18n.t('FAVOURITES'),
              }}
            />
          </Tab.Navigator>
        </View>
      </SafeAreaView>
    );
  }
}
