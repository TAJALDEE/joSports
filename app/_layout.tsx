import { I18nManager } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  NavigationProp,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { MapProvider } from "@/context/MapContext";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    const isArabic = I18nManager.isRTL;
    if (isArabic) {
      I18nManager.allowRTL(false); // Force right-to-left layout
      console.log("arabic");
    } else {
      console.log("english");
    }
  }, []);
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Show splash screen until fonts are loaded
  }

  return (
    <LanguageProvider>
      <ThemeProvider>
        <MapProvider>
          <MainStack />
        </MapProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

type FirstTimeNavigation = {
  firstTimeScreen: null;
};
const MainStack = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<FirstTimeNavigation>>();
  useEffect(() => {
    if (navigation) {
      navigation.navigate("firstTimeScreen", null);
    }
  }, [navigation]);
  useEffect(() => {
    const isArabic = I18nManager.isRTL;
    if (isArabic) {
      I18nManager.allowRTL(false); // Force right-to-left layout
      console.log("arabic");
    } else {
      console.log("english");
    }
  }, []);
  return (
    <NavigationThemeProvider
      value={theme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="firstTimeScreen" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="addNews" />
        <Stack.Screen name="newsDetail" />
        <Stack.Screen name="login" />
        <Stack.Screen name="newsNotification" />
        <Stack.Screen name="TeamDetails" />
        <Stack.Screen name="tickets" />
        <Stack.Screen name="signup" options={{ title: "Create New Account" }} />
      </Stack>
    </NavigationThemeProvider>
  );
};
