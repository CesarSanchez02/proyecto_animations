import React, { useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { ScreenContainer } from '../components/ScreenContainer';
import { theme } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 78;
const colors = ['#3B82F6', '#0891B2', '#64748B', '#475569', '#2563EB'];

function CarouselCard({ item, index, offset }: { item: number; index: number; offset: any }) {
  const style = useAnimatedStyle(() => {
    const distance = index * CARD_WIDTH - offset.value;
    const input = [-CARD_WIDTH, 0, CARD_WIDTH];
    const scale = interpolate(distance, input, [0.82, 1, 0.82], Extrapolation.CLAMP);
    const rotate = interpolate(distance, input, [-12, 0, 12], Extrapolation.CLAMP);
    return { transform: [{ scale }, { rotate: `${rotate}deg` }] };
  });
  return <Animated.View style={[styles.card, { backgroundColor: colors[item] }, style]}><Text style={styles.number}>0{item + 1}</Text><Text style={styles.cardTitle}>Tarjeta animada</Text></Animated.View>;
}

export default function CarouselScreen() {
  const offset = useSharedValue(0); const list = useRef<FlatList>(null);
  return (
    <ScreenContainer>
      <Text style={styles.title}>Carrusel animado</Text>
      <Text style={styles.help}>Desliza horizontalmente para explorar las tarjetas.</Text>
      <Animated.FlatList
        ref={list}
        data={[0, 1, 2, 3, 4]}
        keyExtractor={(item) => item.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={styles.list}
        onScroll={(event) => { offset.value = event.nativeEvent.contentOffset.x; }}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => <CarouselCard item={item} index={index} offset={offset} />}
      />
    </ScreenContainer>
  );
}
const styles = StyleSheet.create({
  title: { color: theme.text, fontSize: 30, fontWeight: '900' }, help: { color: theme.muted, marginTop: 8, marginBottom: 24 }, list: { alignItems: 'center' },
  card: { width: CARD_WIDTH - 14, height: 430, marginHorizontal: 7, borderRadius: 14, padding: 24, justifyContent: 'flex-end' }, number: { color: 'white', fontSize: 72, fontWeight: '900', opacity: 0.9 }, cardTitle: { color: 'white', fontSize: 22, fontWeight: '800', marginBottom: 14 },
});
