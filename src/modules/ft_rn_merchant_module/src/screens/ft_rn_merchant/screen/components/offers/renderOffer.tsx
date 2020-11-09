import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { OfferToDisplay } from '../../port';

import { CustomComponents, FastTrackLibs, design } from 'rn_fast_track_uilib';

const { CustomText } = CustomComponents;
const { Feather } = FastTrackLibs;
interface onSelectOfferReturnType {
  selectedOffer: OfferToDisplay;
  product_id: number;
}

interface RenderOfferProps {
  offer: any;
  onSelectOffer: (data: onSelectOfferReturnType) => void;
}

const RenderOffer = (props: RenderOfferProps) => {
  const [show, setShow] = useState(false);
  const { product_id, section_name, offers_to_display } = props.offer;
  const { onSelectOffer } = props;
  return (
    <View>
      <View style={styles.parent}>
        <View style={{ flexDirection: 'column', flex: 1 }}>
          <CustomText
            style={{
              fontFamily: 'MuseoSans300',
              fontSize: 15,
              marginBottom: 5,
              color: '#303030',
            }}
          >
            {section_name}
          </CustomText>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.parent}
          onPress={() => console.log('clicked')}
        >
          <Feather
            style={{ marginTop: 2, marginEnd: 15 }}
            name={show === true ? 'plus' : 'minus'}
            size={20}
            color='#007FFF'
            onPress={() => {
              setShow(!show);
            }}
          />
        </TouchableOpacity>
      </View>

      {show === false
        ? offers_to_display.map((offer: any, index: number) => {
            if (offer.redeemability !== 2) {
              return (
                <TouchableOpacity
                  key={index}
                  disabled={true}
                  onPress={() => {
                    let callbackData = {
                      selectedOffer: offer,
                      product_id: product_id,
                    };
                    onSelectOffer(callbackData);
                  }}
                  style={{
                    marginTop: 5,
                    backgroundColor: design['--global--secondary--BackgroundColor']?design['--global--secondary--BackgroundColor']:'#fff',
                    height: 48,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      marginStart: 10,
                      marginEnd: 10,
                    }}
                    source={{
                      uri: offer.voucher_type_image,
                    }}
                  />
                  <View style={{ flexDirection: 'column', flex: 1 }}>
                    <CustomText>{offer.name}</CustomText>
                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: 'row',
                      }}
                    >
                      {offer.additional_details.map(
                        (vd: any, index: number) => {
                          return (
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                paddingEnd: 15,
                                alignItems: 'center',
                              }}
                            >
                              <CustomText
                                style={{
                                  color: `#${vd.color}`,
                                  paddingStart: 20,
                                  fontSize: 10,
                                  fontFamily: 'MuseoSans300',
                                }}
                              >
                                {vd.title}
                              </CustomText>
                            </View>
                          );
                        }
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  onPress={() => {
                    let callbackData = {
                      selectedOffer: offer,
                      product_id: product_id,
                    };
                    onSelectOffer(callbackData);
                  }}
                  style={{
                    marginTop: 5,
                    backgroundColor: 'white',
                    height: 48,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                      marginStart: 10,
                      marginEnd: 10,
                    }}
                    source={{
                      uri: offer.voucher_type_image,
                    }}
                  />
                  <View style={{ flexDirection: 'column', flex: 1 }}>
                    <CustomText
                      style={{ fontSize: 15, fontFamily: 'MuseoSans500' }}
                    >
                      {offer.name}
                    </CustomText>
                    <View
                      style={{
                        marginTop: 5,
                        flexDirection: 'row',
                      }}
                    >
                      {offer.additional_details.map(
                        (vd: any, index: number) => {
                          let color = vd.color === '' ? 'black' : vd.color;
                          return (
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                paddingEnd: 15,
                                alignItems: 'center',
                              }}
                            >
                              <Image
                                style={{ height: 20, width: 20 }}
                                source={{ uri: vd.image }}
                              />
                              <CustomText
                                style={{
                                  color: `${color}`,
                                  paddingStart: 5,
                                  fontSize: 10,
                                  fontFamily: 'MuseoSans300',
                                }}
                              >
                                {vd.title}
                              </CustomText>
                            </View>
                          );
                        }
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
          })
        : null}
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
    fontFamily: 'MuseoSans500',
    fontSize: 12,
    fontWeight: 'bold',
    fontStyle: 'normal',
    color: '#353535',
    paddingStart: 10,
  },
});

export default RenderOffer;
