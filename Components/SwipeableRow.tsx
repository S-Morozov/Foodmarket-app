import React, { Component, PropsWithChildren } from 'react';
import { Animated, StyleSheet, I18nManager, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons } from '@expo/vector-icons';

interface SwipeableRowProps extends PropsWithChildren<{}> {
  onDelete: () => void;
}

export default class SwipeableRow extends Component<SwipeableRowProps> {
  private swipeableRef: Swipeable | null = null;

  setSwipeableRef = (ref: Swipeable | null) => {
    this.swipeableRef = ref;
  };

  handleClose = () => {
    if (this.swipeableRef) {
      this.swipeableRef.close();
    }
    this.props.onDelete();
  };

  renderRightAction = (
    _: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => (
    <RectButton style={styles.actionButton} onPress={this.handleClose}>
      <Ionicons name="trash-outline" size={24} color="#fff" style={styles.iconStyle} />
    </RectButton>
  );

  render() {
    return (
      <Swipeable
        ref={this.setSwipeableRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={this.renderRightAction}
      >
        {this.props.children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  actionButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#d32f2f',
    paddingHorizontal: 20,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  iconStyle: {
    margin: 10,
  },
});