import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export default function RootLayout() {
  useEffect(() => {
    let subscriptionReceived: Notifications.Subscription | undefined;
    let subscriptionResponse: Notifications.Subscription | undefined;

    const register = async () => {
      if (Platform.OS === 'web') return;
      if (!Device.isDevice) return;

      const settings = await Notifications.getPermissionsAsync();
      let finalStatus = settings.status;

      if (finalStatus !== 'granted') {
        const request = await Notifications.requestPermissionsAsync();
        finalStatus = request.status;
      }

      if (finalStatus !== 'granted') return;

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
        });
      }

      try {
        const token = await Notifications.getDevicePushTokenAsync();
        console.log('FCM token:', token.data);
      } catch {
        const token = await Notifications.getExpoPushTokenAsync();
        console.log('Expo push token:', token.data);
      }
    };

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    register();

    subscriptionReceived = Notifications.addNotificationReceivedListener(() => {});
    subscriptionResponse = Notifications.addNotificationResponseReceivedListener(() => {});

    return () => {
      subscriptionReceived?.remove();
      subscriptionResponse?.remove();
    };
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
