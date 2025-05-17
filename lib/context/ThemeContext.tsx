import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Appearance } from "react-native";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem("theme");
      if (saved === "light" || saved === "dark") {
        setTheme(saved);
      } else {
        const sys = Appearance.getColorScheme();
        setTheme(sys === "dark" ? "dark" : "light");
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useAppTheme must be used within ThemeProvider");
  return context;
}
