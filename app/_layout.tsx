import { Stack } from "expo-router";
import { ThemeProvider } from "@/lib/context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
      </Stack>
    </ThemeProvider>
  );
}
