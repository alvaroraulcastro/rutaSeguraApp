import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

type RoutePoint = {
  latitude: number;
  longitude: number;
  title: string;
};

type Props = {
  route: RoutePoint[];
  style?: StyleProp<ViewStyle>;
};

export default function TripMap({ route, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>Mapa no disponible</Text>
      <Text style={styles.subtitle}>Usa la aplicación en Android o iOS para ver el mapa</Text>
      <View style={styles.routeBox}>
        <Text style={styles.routeTitle}>Ruta</Text>
        {route.map((point, index) => (
          <Text key={index} style={styles.routeItem}>
            {index + 1}. {point.title}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 16,
  },
  routeBox: {
    width: '100%',
    maxWidth: 520,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  routeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  routeItem: {
    fontSize: 14,
    color: '#343a40',
    marginBottom: 6,
  },
});
