import React, { useState } from "react";
import { Button, StyleSheet } from "react-native";
import { ThemedView as View } from "./ThemedView";
import { useTheme } from "@/context/ThemeContext";
import { useThemeColor } from "@/hooks/useThemeColor";

type ColorProps = {
  lightColor?: string;
  darkColor?: string;
};

const ThemeToggleButton = ({ lightColor, darkColor }: ColorProps) => {
  const { theme, setTheme } = useTheme();
  const [isDefault, setIsDefault] = useState<boolean>(true);
  const tint = useThemeColor({ light: lightColor, dark: darkColor }, "tint");

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={{ flex: 1, marginRight: 4 }}>
          <Button
            title="Light"
            onPress={() => {
              setTheme("light");
              setIsDefault(false);
            }}
            color={theme === "light" ? "#4CAF50" : "gray"}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 4 }}>
          <Button
            title="Dark"
            onPress={() => {
              setTheme("dark");
              setIsDefault(false);
            }}
            color={theme === "dark" ? "#FF6A00" : "gray"}
          />
        </View>
      </View>

      <View style={{ flex: 1, marginVertical: 8 }}>
        <Button
          title="Device default"
          onPress={() => {
            setTheme("default");
            setIsDefault(true);
          }}
          color={isDefault ? tint : "gray"}
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
