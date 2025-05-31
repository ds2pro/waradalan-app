import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
} from "react-native";
import { useAppTheme } from "@/lib/context/ThemeContext";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function ContactScreen() {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleEmail = () => {
    const subject = "رسالة من تطبيق ورد الآن";
    const body = `الاسم: ${name}\nالبريد الإلكتروني: ${email}\nالرسالة:\n${message}`;
    const mailtoUrl = `mailto:info@waradalan.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailtoUrl);
  };

  const isValid =
    name.length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    message.length >= 5 &&
    message.length <= 1000;

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={[
              styles.container,
              { backgroundColor: colors.background, flexGrow: 1 },
            ]}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            {/* <View style={styles.headerRow}>
              <Pressable onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </Pressable>
              <Text style={[styles.headerTitle, { color: colors.text }]}>
                اتصل بنا
              </Text>
            </View> */}

            {/* Logo */}
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Intro */}
            <Text style={[styles.description, { color: colors.text }]}>
              نرحب بتواصلكم معنا في أي وقت! سواء كان لديكم استفسار، اقتراح أو
              تعليق، يرجى استخدام النموذج أدناه للتواصل. سنقوم بالرد عليكم في
              أقرب وقت ممكن.
            </Text>

            {/* Form */}
            <View style={styles.form}>
              <TextInput
                style={[
                  styles.input,
                  { color: colors.text, borderColor: colors.text },
                ]}
                placeholder="الاسم"
                placeholderTextColor="#888"
                textAlign="right"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                style={[
                  styles.input,
                  { color: colors.text, borderColor: colors.text },
                ]}
                placeholder="البريد الإلكتروني"
                placeholderTextColor="#888"
                textAlign="right"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  { color: colors.text, borderColor: colors.text },
                ]}
                placeholder="اكتب رسالتك هنا..."
                placeholderTextColor="#888"
                textAlign="right"
                multiline
                numberOfLines={6}
                maxLength={1000}
                value={message}
                onChangeText={setMessage}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={[styles.charCount, { color: colors.text }]}>
                {message.length}/1000
              </Text>
              <Pressable
                style={[
                  styles.submitButton,
                  { backgroundColor: isValid ? "#4BA761" : "#ccc" },
                ]}
                disabled={!isValid}
                onPress={() => {
                  handleEmail();
                  // Reset form fields
                  setName("");
                  setEmail("");
                  setMessage("");
                }}
              >
                <Text style={styles.submitText}>إرسال</Text>
              </Pressable>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: colors.text }]}>
                مبنى صيدلية الرحباني - جبيل - لبنان
              </Text>
              <Pressable
                onPress={() => Linking.openURL("https://www.waradalan.com")}
              >
                <Text style={[styles.footerText, { color: colors.tint }]}>
                  www.waradalan.com
                </Text>
              </Pressable>
              <Pressable
                onPress={() => Linking.openURL("mailto:info@waradalan.com")}
              >
                <Text style={[styles.footerText, { color: colors.tint }]}>
                  info@waradalan.com
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexGrow: 1,
  },
  // headerRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 20,
  // },
  // headerTitle: {
  //   flex: 1,
  //   textAlign: "center",
  //   fontSize: 20,
  //   fontWeight: "bold",
  // },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 4,
  },
  logo: {
    width: 160,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  form: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    marginBottom: 12,
  },
  submitButton: {
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
