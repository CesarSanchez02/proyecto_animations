import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ScreenContainer } from '../components/ScreenContainer';
import { theme } from '../constants/theme';

export default function DragRotateScreen() {
  const x = useSharedValue(0); const y = useSharedValue(0); const rotate = useSharedValue(0);
  const pan = Gesture.Pan()
    .onUpdate((event) => { x.value = event.translationX; y.value = event.translationY; rotate.value = event.translationX * 0.35; })
    .onEnd(() => { x.value = withSpring(0); y.value = withSpring(0); rotate.value = withSpring(0); });
  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }, { translateY: y.value }, { rotate: `${rotate.value}deg` }] }));
  return (
    <ScreenContainer>
      <Text style={styles.title}>Arrastra y rota</Text>
      <Text style={styles.help}>Mueve el bloque; su inclinación seguirá la dirección.</Text>
      <View style={styles.area}>
        <GestureDetector gesture={pan}><Animated.View style={[styles.shape, style]}><Text style={styles.shapeText}>↗</Text></Animated.View></GestureDetector>
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  title: { color: theme.text, fontSize: 30, fontWeight: '900' }, help: { color: theme.muted, marginTop: 8, marginBottom: 24 },
  area: { flex: 1, maxHeight: 520, backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: 12, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  shape: { width: 130, height: 130, borderRadius: 16, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center' }, shapeText: { color: 'white', fontSize: 54 },
});
