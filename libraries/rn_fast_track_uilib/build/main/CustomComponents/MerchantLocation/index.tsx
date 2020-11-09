import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../Text/Text';
import { Entypo, Ionicons } from '@expo/vector-icons';

interface propsInterface {
  name: string;
  isRTL: any;
  i18n: any;
  handleChangeLocation: () => void;
}

const changeLocation = (props: propsInterface) => {
  const { name, handleChangeLocation, isRTL, i18n } = props;
  return (
    <View style={styles.parent}>
      <Text isRTL={isRTL} style={styles.locationText}>
        {name}
      </Text>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.parent}
        onPress={() => handleChangeLocation()}
      >
        <Text isRTL={isRTL} style={styles.otherLocationText}>
          {i18n.t('Other Location')}
        </Text>

        <Entypo
          style={{ marginTop: 2,marginEnd:5 }}
          name='chevron-right'
          size={20}
          color='#9F9F9F'
          onPress={() => {}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingStart: 10,
    justifyContent: 'center',
  },
  locationText: {
    flex: 1,
    fontFamily: 'MuseoSans300',
    fontSize: 13,
    fontStyle: 'normal',
    color: '#2a2a2a',
  },
  otherLocationText: {
    fontFamily: 'MuseoSans300',
    fontSize: 12,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#9b9b9b',
  },
});

export default changeLocation;
