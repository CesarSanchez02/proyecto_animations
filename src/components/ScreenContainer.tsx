import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { theme } from '../constants/theme';

export function ScreenContainer({ children }: { children: ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background, padding: 20 },
});
