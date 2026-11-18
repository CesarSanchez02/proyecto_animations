import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { ScreenContainer } from '../components/ScreenContainer';
import { theme } from '../constants/theme';

export default function LoadingScreen() {
  const spin = useSharedValue(0); const progress = useSharedValue(8);
  useEffect(() => { spin.value = withRepeat(withTiming(360, { duration: 1000, easing: Easing.linear }), -1, false); progress.value = withRepeat(withTiming(100, { duration: 2200 }), -1, true); }, []);
  const spinnerStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${spin.value}deg` }] }));
  const progressStyle = useAnimatedStyle(() => ({ width: `${progress.value}%` }));
  return (
    <ScreenContainer>
      <Text style={styles.title}>Carga animada</Text>
      <View style={styles.center}>
        <Animated.View style={[styles.spinner, spinnerStyle]}><View style={styles.spinnerCore} /></Animated.View>
        <Text style={styles.status}>Sincronizando</Text>
        <View style={styles.track}><Animated.View style={[styles.progress, progressStyle]} /></View>
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  title: { color: theme.text, fontSize: 30, fontWeight: '900' }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  spinner: { width: 120, height: 120, borderRadius: 60, borderWidth: 10, borderColor: theme.surfaceLight, borderTopColor: theme.primary, alignItems: 'center', justifyContent: 'center' }, spinnerCore: { width: 14, height: 14, borderRadius: 7, backgroundColor: theme.primary },
  status: { color: theme.text, fontSize: 18, marginTop: 28, fontWeight: '700' }, track: { width: '82%', height: 12, borderRadius: 6, backgroundColor: theme.surfaceLight, marginTop: 22, overflow: 'hidden' }, progress: { height: '100%', backgroundColor: theme.primary, borderRadius: 6 },
});
