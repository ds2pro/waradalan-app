import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { Pressable, Image } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={({ route }) => ({
        headerTitleAlign: "center",
        headerRight: () =>
          route.name === "index" ? (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginRight: 20 }}
            >
              <Ionicons
                name="menu"
                size={24}
                color={Colors[colorScheme ?? "light"].text}
              />
            </Pressable>
          ) : null,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerTitleStyle: {
          color: Colors[colorScheme ?? "light"].text,
        },
      })}
    >
      <Tabs.Screen
        name="settings"
        options={{
          title: "الإعدادات",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "اتصل بنا",
          tabBarIcon: ({ color }) => (
            <Ionicons name="mail" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "البحث",
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
          headerTitle: () => (
            <Image
              source={require("@/assets/images/logo.png")}
              style={{ width: 64, height: 64 }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}
