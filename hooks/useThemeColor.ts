import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
): string {
  const { theme } = useTheme();

  // Use non-null assertion since theme will be 'light' or 'dark'
  const colorFromProps = props[theme as "light" | "dark"];

  return colorFromProps ?? Colors[theme!][colorName]; // Use non-null assertion
}
