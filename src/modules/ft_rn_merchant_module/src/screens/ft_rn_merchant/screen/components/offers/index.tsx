import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { OfferToDisplay } from '../../port';

//local imports
import RenderOffer from './renderOffer';

import { CustomComponents, FastTrackLibs, design } from 'rn_fast_track_uilib';

const { Loader, CustomText, ErrorModal } = CustomComponents;
const { Ionicons, Modal, SmoothPinCodeInput } = FastTrackLibs;

interface propsInterface {
  onOfferSelected: (data: any) => void;
  offers: any;
}

interface onSelectOfferReturnType {
  selectedOffer: OfferToDisplay;
  product_id: number;
}

const offers = (props: propsInterface) => {
  const [show, setShow] = useState(false);
  const { offers, onOfferSelected } = props;
  // console.log(offers, 'offers');
  return (
    <View>
      <CustomText style={styles.offersTitle}>
        OFFERS CONTAINED IN PRODUCT
      </CustomText>
      {offers.map((offer: any,index: number) => {
        return <RenderOffer key={index}  offer={offer} onSelectOffer={onOfferSelected} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 10,
    justifyContent: 'center',
  },
  offersTitle: {
    fontFamily: 'MuseoSans700',
    fontSize: 10,
    color: 'black',
    paddingStart: 10,
  },
});

export default offers;
