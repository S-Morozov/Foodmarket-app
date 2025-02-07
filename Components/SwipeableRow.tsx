import React, { useRef, useCallback } from 'react';
import { StyleSheet, I18nManager } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface SwipeableRowProps {
  children: React.ReactNode;
  onDelete: () => void;
}

const SwipeableRow: React.FC<SwipeableRowProps> = ({ children, onDelete }) => {
  const swipeableRef = useRef<Swipeable>(null);

  const handleDelete = useCallback(() => {
    swipeableRef.current?.close();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onDelete();
  }, [onDelete]);

  const renderRightActions = useCallback(() => (
    <RectButton style={styles.actionButton} onPress={handleDelete}>
      <Ionicons name="trash-outline" size={24} color="#fff" style={styles.iconStyle} />
    </RectButton>
  ), [handleDelete]);

  return (
    <Swipeable
      ref={swipeableRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableOpen={handleDelete}
    >
      {children}
    </Swipeable>
  );
};

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

export default React.memo(SwipeableRow);
