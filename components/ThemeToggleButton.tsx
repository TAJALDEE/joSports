import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { ThemedView } from "./ThemedView";
import { useTheme } from "@/context/ThemeContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLanguage } from "@/context/LanguageContext";

type ColorProps = {
  lightColor?: string;
  darkColor?: string;
};

const ThemeToggleButton = ({ lightColor, darkColor }: ColorProps) => {
  const { theme, setTheme } = useTheme();
  const [isManual, setIsManual] = useState<boolean>(true);
  const tint = useThemeColor({ light: lightColor, dark: darkColor }, "tint");
  const { language, toggleLanguage } = useLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1, marginRight: 4 }}>
          <Button
            title={language == "en" ? "Light" : "فاتح"}
            onPress={() => {
              setTheme("light");
              setIsManual(true);
            }}
            color={theme === "light" && isManual ? "#4CAF50" : "gray"}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 4 }}>
          <Button
            title={language == "en" ? "Dark" : "داكن"}
            onPress={() => {
              setTheme("dark");
              setIsManual(true);
            }}
            color={theme === "dark" && isManual ? "#CE1126" : "gray"}
          />
        </View>
      </View>

      <View style={{ flex: 1, marginVertical: 8 }}>
        <Button
          title={
            language == "en"
              ? "Auto: Decice settings"
              : "تلقائي: اعدادات الجهاز"
          }
          onPress={() => {
            setTheme("default");
            setIsManual(false);
          }}
          color={isManual != true ? tint : "gray"}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  themeText: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default ThemeToggleButton;
