# appRutaSegura — App Transportista

Aplicación móvil desarrollada con **React Native (Expo)** para la gestión de rutas de transporte en tiempo real, rastreo GPS y notificaciones automáticas.

## Tecnologías Principales
- **Framework:** Expo 55 (React Native)
- **Lenguaje:** TypeScript
- **Navegación:** Expo Router
- **Geolocalización:** Expo Location (Permisos configurados)
- **Despliegue:** EAS Build (Expo Application Services)

## Requisitos Previos
- **Node.js:** v24.14.0 o superior (LTS recomendado)
- **Expo Go:** Instalado en tu dispositivo Android para pruebas locales.
- **EAS CLI:** Para generar el APK (`npm install -g eas-cli`).

## Instalación y Pruebas Locales
1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Iniciar el servidor de desarrollo:**
   ```bash
   npm start
   ```
3. **Probar en dispositivo:** Escanea el código QR desde la app **Expo Go** en tu Android. Asegúrate de estar en la misma red Wi-Fi.

## Generación del APK (Build)
Para generar un archivo APK instalable:
1. Iniciar sesión en Expo: `eas login`
2. Configurar el build: `eas build:configure`
3. Compilar APK (Perfil de vista previa):
   ```bash
   eas build -p android --profile preview
   ```

## Documentación del Proyecto
- [Diagrama ER](./docs/diagrama-er.md): Estructura de la base de datos y relaciones.
- [Plan de Desarrollo](./docs/plan-desarrollo-app-transporte.md): Cronograma y fases del proyecto.
- [Propuesta Técnica](./PROPOSAL.md): Detalle de la arquitectura y funcionalidades.

## Estructura de Archivos
- `app/`: Pantallas y navegación (Auth, Tabs, Dashboard).
- `assets/`: Recursos visuales e iconos.
- `docs/`: Documentación técnica.
- `app.json`: Configuración nativa y permisos de ubicación.
