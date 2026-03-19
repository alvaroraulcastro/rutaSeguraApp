import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

export default function DashboardScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const requestLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permiso de ubicación denegado');
      Alert.alert('Permiso Denegado', 'La aplicación necesita permisos de ubicación para funcionar correctamente.');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    Alert.alert('Ubicación Obtenida', `Lat: ${currentLocation.coords.latitude}, Lon: ${currentLocation.coords.longitude}`);
  };

  const handleLogout = () => {
    // Aquí iría la lógica de logout real
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Hola, Juan 👋</Text>
        <Text style={styles.date}>Miércoles, 18 de Marzo</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Rutas Hoy</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>124</Text>
          <Text style={styles.statLabel}>Pasajeros</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estado de Ubicación</Text>
        <View style={styles.currentRouteCard}>
          <Text style={styles.routeDetails}>
            {location ? `Ubicación: ${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}` : errorMsg || 'No se ha obtenido la ubicación'}
          </Text>
          <TouchableOpacity style={styles.locationButton} onPress={requestLocation}>
            <Text style={styles.startButtonText}>Actualizar Ubicación</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ruta Actual</Text>
        <View style={styles.currentRouteCard}>
          <Text style={styles.routeName}>Ruta Escolar - Mañana</Text>
          <Text style={styles.routeDetails}>12 Paradas | 07:30 AM</Text>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Iniciar Recorrido</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  date: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  statBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007bff',
  },
  statLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  currentRouteCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  routeDetails: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  locationButton: {
    backgroundColor: '#28a745',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: '600',
  },
});
