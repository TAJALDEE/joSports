import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useColorScheme } from "react-native";

type Theme = "light" | "dark" | "default";

type ThemeContextType = {
  theme: Theme;
  setTheme: (selectedTheme: Theme) => void; // Update toggleTheme to setTheme
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const systemTheme = useColorScheme() === "dark" ? "dark" : "light"; // Get the system theme
  const [manualTheme, setManualTheme] = useState<Theme>("default"); // Default to device

  // Update manualTheme if systemTheme changes
  useEffect(() => {
    if (manualTheme === "default") {
      setManualTheme(systemTheme); // Sync with system theme
    }
  }, [systemTheme]);

  const theme = manualTheme === "default" ? systemTheme : manualTheme; // Use manualTheme unless it's "default"

  const setTheme = (selectedTheme: Theme) => {
    setManualTheme(selectedTheme);
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
