import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { ScreenContainer } from '../components/ScreenContainer';
import { theme } from '../constants/theme';

export default function MultitouchScreen() {
  const translateX = useSharedValue(0); const translateY = useSharedValue(0);
  const scale = useSharedValue(1); const rotation = useSharedValue(0);
  const savedX = useSharedValue(0); const savedY = useSharedValue(0); const savedScale = useSharedValue(1); const savedRotation = useSharedValue(0);
  const pan = Gesture.Pan().onStart(() => { savedX.value = translateX.value; savedY.value = translateY.value; }).onUpdate((e) => { translateX.value = savedX.value + e.translationX; translateY.value = savedY.value + e.translationY; });
  const pinch = Gesture.Pinch().onStart(() => { savedScale.value = scale.value; }).onUpdate((e) => { scale.value = Math.min(3, Math.max(0.5, savedScale.value * e.scale)); });
  const rotateGesture = Gesture.Rotation().onStart(() => { savedRotation.value = rotation.value; }).onUpdate((e) => { rotation.value = savedRotation.value + e.rotation; });
  const gestures = Gesture.Simultaneous(pan, pinch, rotateGesture);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }, { rotate: `${rotation.value}rad` }] }));
  return (
    <ScreenContainer>
      <Text style={styles.title}>Gestos múltiples</Text>
      <Text style={styles.help}>Arrastra, pellizca y gira la tarjeta al mismo tiempo.</Text>
      <View style={styles.area}>
        <GestureDetector gesture={gestures}><Animated.View style={[styles.card, animatedStyle]}><Text style={styles.cardText}>MULTITOUCH</Text></Animated.View></GestureDetector>
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  title: { color: theme.text, fontSize: 30, fontWeight: '800' }, help: { color: theme.muted, marginTop: 8, marginBottom: 20 }, area: { flex: 1, maxHeight: 520, backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  card: { width: 210, height: 210, borderRadius: 16, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center' }, cardText: { color: 'white', fontWeight: '800', letterSpacing: 1 },
});
