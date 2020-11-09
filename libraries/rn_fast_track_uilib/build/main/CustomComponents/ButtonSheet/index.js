import React, { Component } from 'react';
import { View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { Portal } from 'react-native-paper';

class index extends Component {
  bs = React.createRef();

  onOpenBottomSheet = () => {
    this.bs.current.snapTo(1);
  };

  onClose = () => {
    this.bs.current.snapTo(0);
  };

  render() {
    const { initialSnap, snapPoints } = this.props;
    return (
      <Portal>
        <BottomSheet
          ref={this.bs}
          initialSnap={initialSnap}
          snapPoints={snapPoints}
          renderContent={this.props.renderContent}
          renderHeader={this.props.renderHeader}
          enabledContentGestureInteraction={false} //added due to android scroll view
        />
      </Portal>
    );
  }
}

export default index;
