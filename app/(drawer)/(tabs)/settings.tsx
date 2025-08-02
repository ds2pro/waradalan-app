import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { useAppTheme } from "@/lib/context/ThemeContext";
import { useState, useEffect } from "react";
import Colors from "@/constants/Colors";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useAppTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const isDark = theme === "dark";
  const colors = Colors[theme];

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("notifications_enabled");
      setNotificationsEnabled(saved === "true");
    })();
  }, []);

  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      await AsyncStorage.setItem("notifications_enabled", "false");
      setNotificationsEnabled(false);
      return;
    }

    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      if (newStatus !== "granted") {
        Alert.alert("تم رفض الإذن", "يرجى تفعيل الإشعارات من الإعدادات.");
        return;
      }
    }

    await AsyncStorage.setItem("notifications_enabled", "true");
    setNotificationsEnabled(true);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.card },
      ]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          مظهر التطبيق
        </Text>
        <View style={[styles.row, { backgroundColor: colors.background }]}>
          <Text style={[styles.text, { color: colors.text }]}>مضيء</Text>
          <Switch
            value={!isDark}
            onValueChange={toggleTheme}
            thumbColor={!isDark ? "#4BA761" : "#ccc"}
            trackColor={{ false: "#ccc", true: "#CFF0DD" }}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          إشعارات
        </Text>
        <View style={[styles.row, { backgroundColor: colors.background }]}>
          <Text style={[styles.text, { color: colors.text }]}>
            السماح بالإشعارات
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            thumbColor={notificationsEnabled ? "#4BA761" : "#ccc"}
            trackColor={{ false: "#ccc", true: "#CFF0DD" }}
          />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end", marginTop: 60 }}>
        <Text style={[styles.footer, { color: colors.text }]}>
          © جميع الحقوق محفوظة ورد الآن {new Date().getFullYear()}{" "}
        </Text>
        <Text style={[styles.version, { color: colors.text }]}>v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "right",
    fontWeight: "600",
  },
  row: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  text: {
    fontSize: 16,
    textAlign: "right",
  },
  linkContainer: {
    marginTop: 10,
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    marginTop: 4,
  },
});
