import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ScreenContainer } from '../components/ScreenContainer';
import { theme } from '../constants/theme';

export default function AccelerometerScreen() {
  const x = useSharedValue(0); const [status, setStatus] = useState('Activa el movimiento'); const [available, setAvailable] = useState(true);
  const shake = () => {
    x.value = withTiming(-26, { duration: 55 }, () => {
      x.value = withTiming(26, { duration: 55 }, () => {
        x.value = withTiming(-18, { duration: 55 }, () => {
          x.value = withTiming(18, { duration: 55 }, () => {
            x.value = withTiming(0, { duration: 55 });
          });
        });
      });
    });
    setStatus('¡Sacudida detectada!');
    setTimeout(() => setStatus('Esperando un nuevo movimiento'), 900);
  };
  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  useEffect(() => {
    let subscription: any; let lastShake = 0;
    Accelerometer.isAvailableAsync().then((ok) => {
      setAvailable(ok);
      if (!ok) return;
      Accelerometer.setUpdateInterval(100);
      subscription = Accelerometer.addListener((data) => { const force = Math.sqrt(data.x ** 2 + data.y ** 2 + data.z ** 2); const now = Date.now(); if (force > 1.8 && now - lastShake > 1200) { lastShake = now; shake(); } });
    });
    return () => subscription?.remove();
  }, []);
  return (
    <ScreenContainer>
      <Text style={styles.title}>Acelerómetro</Text>
      <Text style={styles.help}>Sacude físicamente el dispositivo para activar la animación.</Text>
      <View style={styles.center}>
        <Animated.View style={[styles.device, style]}><View style={styles.screen} /></Animated.View>
        <Text style={styles.status}>{available ? status : 'Sensor no disponible en este dispositivo'}</Text>
      </View>
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  title: { color: theme.text, fontSize: 30, fontWeight: '900' }, help: { color: theme.muted, marginTop: 8 }, center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  device: { width: 190, height: 310, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 5, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' }, screen: { width: 145, height: 255, borderRadius: 10, backgroundColor: '#DCEAFE' }, status: { color: theme.primary, fontSize: 16, fontWeight: '700', marginTop: 28, textAlign: 'center' },
});
