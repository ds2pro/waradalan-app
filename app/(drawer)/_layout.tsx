import { View, Text, Pressable, StyleSheet, I18nManager } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { Link } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { StatusBar } from "expo-status-bar";

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  }, []);

  return (
    <>
      <StatusBar
        animated={true}
        style={colorScheme === "dark" ? "light" : "dark"}
        backgroundColor={colorScheme === "dark" ? "#121212" : "#fff"}
      />
      <Drawer
        screenOptions={{
          drawerPosition: "right",
          headerShown: false,
          drawerStyle: {
            width: "100%", // full screen width
          },
        }}
        drawerContent={(props) => (
          <View style={styles.overlayDrawer}>
            <Pressable
              onPress={() =>
                props.navigation.dispatch(DrawerActions.closeDrawer())
              }
              style={styles.closeButton}
            >
              <Ionicons name="close" size={30} />
            </Pressable>

            <Link href="/" asChild>
              <Pressable style={styles.link}>
                <Text
                  style={[
                    styles.text,
                    { color: Colors[colorScheme ?? "light"].tint },
                  ]}
                >
                  الرئيسية
                </Text>
              </Pressable>
            </Link>
            <Link href="/about" asChild>
              <Pressable style={styles.link}>
                <Text
                  style={[
                    styles.text,
                    { color: Colors[colorScheme ?? "light"].tint },
                  ]}
                >
                  من نحن
                </Text>
              </Pressable>
            </Link>
            <Link href="/contact" asChild>
              <Pressable style={styles.link}>
                <Text
                  style={[
                    styles.text,
                    { color: Colors[colorScheme ?? "light"].tint },
                  ]}
                >
                  اتصل بنا
                </Text>
              </Pressable>
            </Link>
            <Link href="/privacy" asChild>
              <Pressable style={styles.link}>
                <Text
                  style={[
                    styles.text,
                    { color: Colors[colorScheme ?? "light"].tint },
                  ]}
                >
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
    backgroundColor: "#fff",
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
