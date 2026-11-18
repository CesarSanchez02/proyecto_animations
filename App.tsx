import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import DragRotateScreen from './src/screens/DragRotateScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import MultitouchScreen from './src/screens/MultitouchScreen';
import BounceScreen from './src/screens/BounceScreen';
import CarouselScreen from './src/screens/CarouselScreen';
import AccelerometerScreen from './src/screens/AccelerometerScreen';
import { RootDrawerParamList } from './src/navigation/navigationTypes';
import { theme } from './src/constants/theme';

const Drawer = createDrawerNavigator<RootDrawerParamList>();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.brand}><Text style={styles.brandTitle}>MOTION</Text><Text style={styles.brandAccent}>LAB</Text></View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Inicio"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
              headerStyle: { backgroundColor: theme.surface, borderBottomColor: theme.border, borderBottomWidth: 1 },
              headerTintColor: theme.text,
              drawerStyle: { backgroundColor: theme.surface, width: 260, borderRightColor: theme.border, borderRightWidth: 1 },
              drawerActiveBackgroundColor: '#E8F0FE', drawerActiveTintColor: '#2457A6', drawerInactiveTintColor: theme.muted,
              drawerLabelStyle: { fontSize: 14, fontWeight: '600' }, drawerItemStyle: { borderRadius: 8, marginHorizontal: 8 },
            }}
          >
            <Drawer.Screen name="Inicio" component={HomeScreen} />
            <Drawer.Screen name="Arrastrar y rotar" component={DragRotateScreen} />
            <Drawer.Screen name="Carga animada" component={LoadingScreen} />
            <Drawer.Screen name="Gestos múltiples" component={MultitouchScreen} />
            <Drawer.Screen name="Rebote" component={BounceScreen} />
            <Drawer.Screen name="Carrusel" component={CarouselScreen} />
            <Drawer.Screen name="Acelerómetro" component={AccelerometerScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 }, drawerContent: { flex: 1, paddingTop: 12 },
  brand: { flexDirection: 'row', alignItems: 'baseline', paddingHorizontal: 16, marginBottom: 24, marginTop: 8 },
  brandTitle: { color: theme.text, fontSize: 20, fontWeight: '800', letterSpacing: 1 }, brandAccent: { color: theme.primary, fontSize: 20, fontWeight: '800', letterSpacing: 1 },
});
