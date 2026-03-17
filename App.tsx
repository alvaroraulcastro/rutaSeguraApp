import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🚐 RutaSegura</Text>
        <Text style={styles.subtitle}>App del Transportista</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Estado: <Text style={styles.statusActive}>Conectado</Text>
          </Text>
          <Text style={styles.cardInfo}>Inicia sesión para comenzar tu ruta del día.</Text>
        </View>

        <TouchableOpacity style={styles.button} activeOpacity={0.7}>
          <Text style={styles.buttonText}>Comenzar Ruta</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  statusActive: {
    color: '#28a745',
  },
  cardInfo: {
    color: '#495057',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
