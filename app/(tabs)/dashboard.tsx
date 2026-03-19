import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';

// Mock de viajes programados
const MOCK_TRIPS = [
  {
    id: '1',
    name: 'Ruta Escolar - Mañana',
    time: '07:30 AM',
    passengers: 12,
    status: 'pending',
    route: [
      { latitude: -33.4489, longitude: -70.6693, title: 'Inicio: Colegio A' },
      { latitude: -33.4510, longitude: -70.6650, title: 'Parada 1: Juanito' },
      { latitude: -33.4550, longitude: -70.6600, title: 'Parada 2: Maria' },
      { latitude: -33.4600, longitude: -70.6550, title: 'Fin: Residencial B' },
    ]
  },
  {
    id: '2',
    name: 'Ruta Corporativa - Tarde',
    time: '05:30 PM',
    passengers: 8,
    status: 'pending',
    route: [
      { latitude: -33.4150, longitude: -70.6050, title: 'Empresa X' },
      { latitude: -33.4200, longitude: -70.6150, title: 'Metro Tobalaba' },
    ]
  }
];

export default function DashboardScreen() {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<typeof MOCK_TRIPS[0] | null>(null);
  const [isTripActive, setIsTripActive] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
      }
    })();
  }, []);

  const handleStartTrip = () => {
    if (!selectedTrip) {
      Alert.alert('Atención', 'Por favor selecciona un viaje primero.');
      return;
    }
    setIsTripActive(true);
  };

  const handleFinishTrip = () => {
    setIsTripActive(false);
    setSelectedTrip(null);
    Alert.alert('Viaje Finalizado', 'El viaje ha concluido con éxito.');
  };

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  if (isTripActive && selectedTrip) {
    return (
      <View style={styles.container}>
        <View style={styles.activeTripHeader}>
          <Text style={styles.activeTripTitle}>{selectedTrip.name}</Text>
          <Text style={styles.activeTripSub}>{selectedTrip.time} - {selectedTrip.passengers} Pasajeros</Text>
        </View>
        
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedTrip.route[0].latitude,
            longitude: selectedTrip.route[0].longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          showsUserLocation
        >
          {selectedTrip.route.map((point, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: point.latitude, longitude: point.longitude }}
              title={point.title}
              pinColor={index === 0 ? 'green' : index === selectedTrip.route.length - 1 ? 'red' : 'blue'}
            />
          ))}
          <Polyline
            coordinates={selectedTrip.route}
            strokeWidth={4}
            strokeColor="#007bff"
          />
        </MapView>

        <View style={styles.tripControls}>
          <TouchableOpacity style={styles.finishButton} onPress={handleFinishTrip}>
            <Text style={styles.buttonText}>Finalizar Recorrido</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Hola, Transportista 👋</Text>
        <Text style={styles.date}>Tus viajes para hoy</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selecciona un Viaje Programado</Text>
        {MOCK_TRIPS.map((trip) => (
          <TouchableOpacity 
            key={trip.id} 
            style={[
              styles.tripCard, 
              selectedTrip?.id === trip.id && styles.tripCardSelected
            ]}
            onPress={() => setSelectedTrip(trip)}
          >
            <View>
              <Text style={styles.tripName}>{trip.name}</Text>
              <Text style={styles.tripDetails}>{trip.time} | {trip.passengers} Pasajeros</Text>
            </View>
            {selectedTrip?.id === trip.id && (
              <View style={styles.selectedBadge}>
                <Text style={styles.selectedBadgeText}>Seleccionado</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {selectedTrip && (
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.startButton} onPress={handleStartTrip}>
            <Text style={styles.buttonText}>Iniciar {selectedTrip.name}</Text>
          </TouchableOpacity>
        </View>
      )}

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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  tripCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  tripCardSelected: {
    borderColor: '#007bff',
    backgroundColor: '#eef7ff',
  },
  tripName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  tripDetails: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  selectedBadge: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  selectedBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  actionContainer: {
    padding: 20,
  },
  startButton: {
    backgroundColor: '#28a745',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#28a745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTripHeader: {
    padding: 40,
    paddingTop: 60,
    backgroundColor: '#1a1a1a',
  },
  activeTripTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  activeTripSub: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  tripControls: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
  },
  finishButton: {
    backgroundColor: '#dc3545',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  logoutButton: {
    padding: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#dc3545',
    fontWeight: '600',
  },
});
