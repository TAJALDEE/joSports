import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "light" | "dark" | "default";

type ThemeContextType = {
  theme: Theme;
  setTheme: (selectedTheme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "@app_theme"; // Key for storing theme

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const systemTheme = useColorScheme() === "dark" ? "dark" : "light";
  const [manualTheme, setManualTheme] = useState<Theme>("default");

  // Load theme from AsyncStorage on mount
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (storedTheme) {
        setManualTheme(storedTheme as Theme);
      } else {
        setManualTheme(systemTheme);
      }
    };
    loadTheme();
  }, [systemTheme]);

  // Update manualTheme if systemTheme changes
  useEffect(() => {
    if (manualTheme === "default") {
      setManualTheme(systemTheme);
    }
  }, [systemTheme]);

  const theme = manualTheme === "default" ? systemTheme : manualTheme;

  const setTheme = async (selectedTheme: Theme) => {
    setManualTheme(selectedTheme);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, selectedTheme); // Save to AsyncStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
