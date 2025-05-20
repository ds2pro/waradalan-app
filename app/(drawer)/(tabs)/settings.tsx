import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useAppTheme } from "@/lib/context/ThemeContext";
import { useState } from "react";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

export default function SettingsScreen() {
  const systemScheme = useColorScheme();
  const { theme, toggleTheme } = useAppTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const isDark = theme === "dark";
  const colors = Colors[theme];

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
            onValueChange={setNotificationsEnabled}
            thumbColor={notificationsEnabled ? "#4BA761" : "#ccc"}
            trackColor={{ false: "#ccc", true: "#CFF0DD" }}
          />
        </View>
      </View>

      {/* Push footer to bottom */}
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
