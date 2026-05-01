import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const LOGIN_URL = 'https://ruta-segura-administrador.vercel.app/api/v1/auth/login';

export default function LoginScreen() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    if (isSubmitting) return;

    const email = identifier.trim();
    const apiKey = process.env.EXPO_PUBLIC_RUTA_SEGURA_API_KEY;
    const isWeb = Platform.OS === 'web';
    const loginUrl = isWeb ? '/api/v1/auth/login' : LOGIN_URL;

    setErrorMessage(null);

    if (!email || !password) {
      Alert.alert('Atención', 'Completa el email y la contraseña.');
      return;
    }

    if (!apiKey) {
      Alert.alert(
        'Falta configuración',
        'Define la variable EXPO_PUBLIC_RUTA_SEGURA_API_KEY para poder autenticar.'
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(isWeb ? {} : { apiKey }),
        },
        body: JSON.stringify({ email, password }),
      });

      const raw = await response.text();
      let data: any = null;
      try {
        data = raw ? JSON.parse(raw) : null;
      } catch {}

      if (!response.ok) {
        const message =
          data?.message ??
          data?.error ??
          `No fue posible iniciar sesión (HTTP ${response.status}).`;
        setErrorMessage(message);
        Alert.alert('Error de inicio de sesión', message);
        return;
      }

      router.replace('/(tabs)/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error de red al iniciar sesión.';
      setErrorMessage(message);
      Alert.alert('Error', message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.emoji}>🚐</Text>
          <Text style={styles.title}>RutaSegura</Text>
          <Text style={styles.subtitle}>Panel del Transportista</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email o Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="ejemplo@correo.com"
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => router.push('/(auth)/forgot-password')}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          <TouchableOpacity
            style={[styles.loginButton, isSubmitting && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.registerLink}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d',
    marginTop: 8,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontWeight: '600',
  },
  errorText: {
    marginTop: 16,
    color: '#dc3545',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    color: '#6c757d',
    fontSize: 16,
  },
  registerLink: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
