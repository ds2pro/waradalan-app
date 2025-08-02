import { useEffect, useRef } from "react";
import { Stack } from "expo-router";
import * as Notifications from "expo-notifications";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { registerForPushNotificationsAsync } from "@/lib/utils/notifications";

export default function RootLayout() {
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // Register for push token
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        console.log("📱 Expo Push Token:", token);
        // TODO: Send token to backend if needed
      }
    });

    // Notification received while app is in foreground
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("🔔 Notification received:", notification);
      });

    // User interacts with a notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("📨 Notification response:", response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
      </Stack>
    </ThemeProvider>
  );
}
