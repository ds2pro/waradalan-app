import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link } from "expo-router";

export default function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>مظهر التطبيق</Text>
        <Pressable style={styles.row}>
          <Text style={styles.text}>مضيء</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>إشعارات</Text>
        <Pressable style={styles.row}>
          <Text style={styles.text}>السماح بالإشعارات</Text>
        </Pressable>
        <Pressable style={styles.row}>
          <Text style={styles.text}>إدارة الإشعارات</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>خصوصية البيانات</Text>
        <Link href="/privacy" asChild>
          <Pressable style={styles.row}>
            <Text style={styles.text}>سياسة الخصوصية</Text>
          </Pressable>
        </Link>
        <Pressable style={styles.row}>
          <Text style={styles.text}>شروط الاستخدام</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>© جميع الحقوق محفوظة ورد الآن 2025</Text>
      <Text style={styles.version}>v1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f8fa",
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
    textAlign: "right",
    fontWeight: "600",
  },
  row: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  text: {
    fontSize: 16,
    textAlign: "right",
    color: "#333",
  },
  footer: {
    textAlign: "center",
    color: "#aaa",
    marginTop: 50,
  },
  version: {
    textAlign: "center",
    color: "#ccc",
    fontSize: 12,
  },
});
