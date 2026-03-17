# Propuesta de Desarrollo — App Android (Transportista)

## Introducción
Esta propuesta detalla el plan de desarrollo para la aplicación móvil del transportista, centrada en la eficiencia operativa, el rastreo en tiempo real y la facilidad de uso.

## Stack Tecnológico Recomendado
Basado en el plan de desarrollo general, se propone el siguiente stack para la aplicación móvil:

- **Framework:** [React Native con Expo](https://expo.dev/) (SDK 50+)
- **Lenguaje:** TypeScript
- **Estilos:** NativeWind (Tailwind CSS para React Native)
- **Navegación:** Expo Router (basado en archivos, similar a Next.js)
- **Gestión de Estado:** TanStack Query (React Query) para datos de API y Zustand para estado local ligero.
- **Geolocalización:** `expo-location` + `expo-task-manager` (para rastreo en segundo plano).
- **Mapas:** `react-native-maps` con integración de Google Maps SDK.
- **Notificaciones:** `expo-notifications` configurado con Firebase Cloud Messaging (FCM).

## Arquitectura de la Aplicación
Se seguirá una estructura modular por capas:

```text
src/
├── app/            # Rutas y navegación (Expo Router)
├── components/     # Componentes UI reutilizables
├── hooks/          # Hooks personalizados (GPS, API, etc.)
├── services/       # Lógica de comunicación con el Backend (API)
├── store/          # Estado global (Zustand)
├── utils/          # Utilidades y constantes
└── types/          # Definiciones de TypeScript
```

## Funcionalidades Críticas
1. **Rastreo GPS en Segundo Plano:** Implementar un servicio que reporte la ubicación al servidor incluso si la app está minimizada, optimizando el uso de batería.
2. **Geofencing Automático:** Disparar notificaciones a los pasajeros cuando el conductor esté a menos de 1km o ~1 minuto de su domicilio.
3. **Modo Offline:** Permitir al conductor ver su ruta incluso sin conexión a internet momentánea.
4. **Sincronización en Tiempo Real:** Visualización del estado de las paradas (pasajero subió, canceló, etc.).

## Plan de Ejecución Inicial
1. **Estructura Base:** Configuración de Expo, TypeScript y NativeWind.
2. **Autenticación:** Flujo de login para el transportista.
3. **Módulo de Ruta:** Pantalla principal con la lista de paradas del día.
4. **Módulo GPS:** Integración de seguimiento y envío de coordenadas.
5. **Notificaciones Push:** Configuración de Firebase para recibir alertas del administrador.

## Siguientes Pasos
Una vez inicializado el repositorio, procederemos con la creación de las pantallas base y la configuración del entorno de desarrollo.
