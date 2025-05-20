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
        // backgroundColor={color.background}
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

            <DrawerLink href="/" label="الرئيسية" color={color.text} />
            <DrawerLink href="/about" label="من نحن" color={color.text} />
            <DrawerLink href="/contact" label="اتصل بنا" color={color.text} />
            <DrawerLink
              href="/privacy"
              label="سياسة الخصوصية"
              color={color.text}
            />
          </View>
        )}
      >
        <Drawer.Screen name="(tabs)" />
      </Drawer>
    </>
  );
}

function DrawerLink({
  href,
  label,
  color,
}: {
  href: "/about" | "/contact" | "/privacy" | "/";
  label: string;
  color: string;
}) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.link}>
        <Text style={[styles.text, { color }]}>{label}</Text>
      </Pressable>
    </Link>
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
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  text: {
    fontSize: 18,
    textAlign: "right",
    fontWeight: "600",
  },
});
