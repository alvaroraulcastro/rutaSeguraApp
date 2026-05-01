# AGENTS.md — rutaSeguraApp

## Resumen
App React Native con Expo (SDK 55) y Expo Router para gestión de viajes/rutas, con geolocalización y un dashboard con mapa (nativo) + fallback web.

## Comandos clave
- `npm install` — Instala dependencias
- `npm start` — Inicia el servidor de desarrollo (Expo)
- `npm run android` — Inicia Expo intentando abrir en Android (requiere Android SDK + adb)
- `npm run ios` — Inicia Expo para iOS (en macOS)
- `npm run web` — Inicia Expo para web
- `npx expo install --fix` — Alinea versiones compatibles con el SDK de Expo instalado
- `npx tsc --noEmit` — Typecheck (TypeScript)

## Entrada y rutas
- Entry: `expo-router/entry` (ver [package.json](file:///C:/Aplicaciones/rutaSeguraApp/package.json))
- Rutas en `app/` (file-based routing)
  - Auth: `app/(auth)/` (ej. `login.tsx`)
  - Tabs: `app/(tabs)/` (ej. `dashboard.tsx`)
  - Redirección inicial: `app/index.tsx` → `/(auth)/login`

## Configuración importante
- TypeScript strict: [tsconfig.json](file:///C:/Aplicaciones/rutaSeguraApp/tsconfig.json)
- Android package: `com.alvaroraulcastro.rutaSeguraApp` (ver [app.json](file:///C:/Aplicaciones/rutaSeguraApp/app.json))
- Permisos de ubicación:
  - iOS: `NSLocationWhenInUseUsageDescription`
  - Android: `ACCESS_COARSE_LOCATION`, `ACCESS_FINE_LOCATION`, `FOREGROUND_SERVICE`, `FOREGROUND_SERVICE_LOCATION`

## Login (backend real + CORS en web)
- Endpoint upstream: `https://ruta-segura-administrador.vercel.app/api/v1/auth/login`
- Contrato (según `docs/curl-ruta-segura-login.md`):
  - Headers: `Content-Type: application/json` + `apiKey: <valor>`
  - Body: `{ "email": "...", "password": "..." }`
- Implementación:
  - [login.tsx](file:///C:/Aplicaciones/rutaSeguraApp/app/(auth)/login.tsx)
  - En web usa `POST /api/v1/auth/login` (same-origin) para evitar CORS por el header `apiKey`
  - Proxy local en Metro: [metro.config.js](file:///C:/Aplicaciones/rutaSeguraApp/metro.config.js)
- Variable de entorno requerida:
  - `EXPO_PUBLIC_RUTA_SEGURA_API_KEY`
  - Ejemplo (PowerShell):
    - `$env:EXPO_PUBLIC_RUTA_SEGURA_API_KEY="TU_API_KEY"; npm start`

## Mapas (react-native-maps) y compatibilidad web
- `react-native-maps` no es compatible con web (rompe el bundling por imports nativos).
- Solución: componente por plataforma:
  - Nativo: [TripMap.native.tsx](file:///C:/Aplicaciones/rutaSeguraApp/components/TripMap.native.tsx)
  - Web: [TripMap.web.tsx](file:///C:/Aplicaciones/rutaSeguraApp/components/TripMap.web.tsx)
  - Fallback/base: [TripMap.tsx](file:///C:/Aplicaciones/rutaSeguraApp/components/TripMap.tsx)
- Uso desde el dashboard: [dashboard.tsx](file:///C:/Aplicaciones/rutaSeguraApp/app/(tabs)/dashboard.tsx)

## EAS Build (eas.json)
- Config: [eas.json](file:///C:/Aplicaciones/rutaSeguraApp/eas.json)
  - `development`: development client + internal distribution
  - `preview`: internal distribution (útil para APK de prueba)
  - `production`: `autoIncrement: true`
- Comando típico (APK preview):
  - `eas build -p android --profile preview`

## Troubleshooting rápido
- Expo Go “Project is incompatible…”:
  - Actualiza Expo Go en el dispositivo (Play Store) o usa un development build.
- `npm run android` falla con Android SDK/adb:
  - Debes tener Android SDK instalado y `adb` disponible.
  - Configura `ANDROID_HOME` y agrega `platform-tools` al `PATH` si el equipo no tiene `adb`.
