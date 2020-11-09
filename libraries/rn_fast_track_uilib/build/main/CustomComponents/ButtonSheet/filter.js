import React, { Component } from 'react';
import BottomSheet from '../BottomSheetComp/index';
import { Portal } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';
class index extends Component {
  bs = React.createRef();

  onOpenBottomSheet = () => {
    this.bs.current.snapTo(1);
  };

  onClose = () => {
    this.bs.current.snapTo(0);
  };

  render() {
    const { initialSnap, snapPoints, renderHeader } = this.props;
    return (
      <Portal>
        <BottomSheet
          bottomSheerColor='#FFFFFF'
          // backDropColor="red"
          ref={this.bs}
          initialPosition={'0%'}
          snapPoints={snapPoints}
          isBackDropDismisByPress={false}
          isBackDrop={true}
          initialSnap={initialSnap}
          isRoundBorderWithTipHeader={false}
          backDropColor='red'
          // isModal
          // containerStyle={{backgroundColor:"red"}}
          // tipStyle={{backgroundColor:"red"}}
          // headerStyle={{backgroundColor:"red"}}
          // bodyStyle={{backgroundColor:"red",flex:1}}
          header={()=>{ renderHeader }}
          body={
            <View style={styles.body}>
              <Text style={styles.text}>Body</Text>
            </View>
          }
        />
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  box: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  boxWrapper: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default index;
