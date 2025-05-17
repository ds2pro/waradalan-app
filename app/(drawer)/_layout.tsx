import {
  View,
  Text,
  Pressable,
  StyleSheet,
  I18nManager,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { Link } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useAppTheme } from "@/lib/context/ThemeContext";
import { StatusBar } from "expo-status-bar";

export default function DrawerLayout() {
  const { theme } = useAppTheme();
  const color = Colors[theme];
  const dimensions = useWindowDimensions();

  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  }, []);

  return (
    <>
      <StatusBar
        animated
        style={theme === "dark" ? "light" : "dark"}
        backgroundColor={color.background}
      />
      <Drawer
        screenOptions={{
          drawerPosition: "right",
          headerShown: false,
          drawerStyle: {
            width: dimensions.width,
            backgroundColor: color.background,
          },
        }}
        drawerContent={(props) => (
          <View
            style={[
              styles.overlayDrawer,
              { backgroundColor: color.background },
            ]}
          >
            <Pressable
              onPress={() =>
                props.navigation.dispatch(DrawerActions.closeDrawer())
              }
              style={styles.closeButton}
            >
              <Ionicons name="close" size={30} color={color.text} />
            </Pressable>

            <Link href="/" asChild>
              <Pressable style={styles.link}>
                <Text style={[styles.text, { color: color.text }]}>
                  الرئيسية
                </Text>
              </Pressable>
            </Link>
            <Link href="/about" asChild>
              <Pressable style={styles.link}>
                <Text style={[styles.text, { color: color.text }]}>من نحن</Text>
              </Pressable>
            </Link>
            <Link href="/contact" asChild>
              <Pressable style={styles.link}>
                <Text style={[styles.text, { color: color.text }]}>
                  اتصل بنا
                </Text>
              </Pressable>
            </Link>
            <Link href="/privacy" asChild>
              <Pressable style={styles.link}>
                <Text style={[styles.text, { color: color.text }]}>
                  سياسة الخصوصية
                </Text>
              </Pressable>
            </Link>
          </View>
        )}
      >
        <Drawer.Screen name="(tabs)" />
      </Drawer>
    </>
  );
}

const styles = StyleSheet.create({
  overlayDrawer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  closeButton: {
    alignSelf: "flex-start",
    marginBottom: 30,
  },
  link: {
    paddingVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#F1F9F3",
  },
  text: {
    fontSize: 18,
    textAlign: "right",
    fontWeight: "600",
  },
});
