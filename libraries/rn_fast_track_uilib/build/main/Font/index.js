import * as Font from 'expo-font';

export const init_font = () => {
  return Font.loadAsync({
    // Load a font `Montserrat` from a static resource
    MuseoSans300: require('../../design/fonts/museosans_300-webfont.ttf'),
    MuseoSans500: require('../../design/fonts/museosans_500-webfont.ttf'),
    MuseoSans700: require('../../design/fonts/museosans_700-webfont.ttf'),
  });
};
