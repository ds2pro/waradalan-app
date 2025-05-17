import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as WebBrowser from "expo-web-browser";

export default function About() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>من نحن</Text>
      </View>

      {/* Logo */}
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Description */}
      <Text style={[styles.description, { color: colors.text }]}>
        موقع إخباري وإعلامي مستقل وملتزم القضايا الوطنية للبنان السيد الحر
        المستقل، ومساحة حرية لكل ملتزم وطنيًا، ولكل الذين يؤمنون أن لبنان هو
        لأبنائه، قبل أن يكون لأي شقيق أو صديق.
      </Text>
      <Text style={[styles.description, { color: colors.text }]}>
        للإنضمام الى مجموعة ورد الآن على فايسبوك وواتساب، اضغط على الروابط
        التالية:
      </Text>

      {/* Social Links */}
      <View style={styles.socialRow}>
        <Pressable
          style={[styles.socialButton, { backgroundColor: "#3b5998" }]}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://www.facebook.com/waradalanjbeil?mibextid=JRoKGi"
            )
          }
        >
          <FontAwesome name="facebook" size={20} color="#fff" />
          <Text style={styles.socialText}>Facebook</Text>
        </Pressable>

        <Pressable
          style={[styles.socialButton, { backgroundColor: "#25D366" }]}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://whatsapp.com/channel/0029Vb51s58IyPtJdF4ic511"
            )
          }
        >
          <FontAwesome name="whatsapp" size={20} color="#fff" />
          <Text style={styles.socialText}>WhatsApp</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    width: 160,
    height: 140,
    alignSelf: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  socialText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
