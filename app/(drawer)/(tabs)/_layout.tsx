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
      screenOptions={{
        headerTitleAlign: "center",
        headerRight: () => (
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
        ),
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarItemStyle: { flexDirection: "row-reverse" },
      }}
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
        name="categories"
        options={{
          title: "الأقسام",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
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
