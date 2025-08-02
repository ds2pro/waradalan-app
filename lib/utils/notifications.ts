import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import type { NotificationBehavior } from "expo-notifications";

/**
 * Registers the device for push notifications, logs the token,
 * and sends it to your backend (notifications.waradalan.com).
 */
export async function registerForPushNotificationsAsync(): Promise<
  string | null
> {
  if (!Device.isDevice) {
    alert("Must use physical device for Push Notifications");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Permission not granted for push notifications.");
    return null;
  }

  const { data: token } = await Notifications.getExpoPushTokenAsync();
  console.log("📲 Expo Push Token:", token);

  try {
    await fetch("https://notifications.waradalan.com/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  } catch (error) {
    console.error("❌ Failed to register token on backend:", error);
  }

  return token;
}

// Notification display behavior
Notifications.setNotificationHandler({
  handleNotification: async (): Promise<NotificationBehavior> => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
