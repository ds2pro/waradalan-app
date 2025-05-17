import { useAppTheme } from "@/lib/context/ThemeContext";

export function useColorScheme() {
  const { theme } = useAppTheme();
  return theme;
}
