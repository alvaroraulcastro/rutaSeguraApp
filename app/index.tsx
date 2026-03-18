import { Redirect } from 'expo-router';

export default function Index() {
  // Aquí se podría verificar si el usuario ya tiene una sesión activa
  // Por ahora redirigimos siempre al login
  return <Redirect href="/(auth)/login" />;
}
