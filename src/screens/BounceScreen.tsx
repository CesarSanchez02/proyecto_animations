import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { ScreenContainer } from '../components/ScreenContainer';
import { theme } from '../constants/theme';

export default function BounceScreen() {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const press = () => { scale.value = withSpring(0.72, { damping: 10, stiffness: 400 }); };
  const release = () => { scale.value = withSpring(1, { damping: 5, stiffness: 180, mass: 0.7 }); };
  return (
    <ScreenContainer>
      <Text style={styles.title}>Animación de rebote</Text>
      <Text style={styles.help}>Mantén presionado el círculo y suéltalo.</Text>
      <Animated.View style={[styles.center, style]}>
        <Pressable onPressIn={press} onPressOut={release} style={styles.button}><Text style={styles.text}>¡Toca!</Text></Pressable>
      </Animated.View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  title: { color: theme.text, fontSize: 30, fontWeight: '800' }, help: { color: theme.muted, marginTop: 8 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: { width: 180, height: 180, borderRadius: 90, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center', elevation: 2 }, text: { color: 'white', fontSize: 22, fontWeight: '800' },
});
