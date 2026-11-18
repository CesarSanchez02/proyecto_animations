import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../constants/theme';
import { ScreenContainer } from '../components/ScreenContainer';

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>MOTION LAB</Text>
        <Text style={styles.title}>Animaciones y sensores</Text>
        <Text style={styles.subtitle}>Selecciona un ejercicio en el menú lateral.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Prueba gestos táctiles, movimiento y respuesta al dispositivo.</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: { marginTop: 24 },
  eyebrow: { color: theme.primary, fontWeight: '700', letterSpacing: 1.5 },
  title: { color: theme.text, fontSize: 32, fontWeight: '800', marginTop: 8 },
  subtitle: { color: theme.muted, fontSize: 16, lineHeight: 22, marginTop: 12 },
  card: { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1, borderRadius: 12, padding: 18, marginTop: 28 },
  cardText: { color: theme.text, fontSize: 15, lineHeight: 22 },
});
