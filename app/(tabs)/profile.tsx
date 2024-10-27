import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import React from "react";
import { StyleSheet, ScrollView, View as RNView } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
//import { ThemedButton } from "@/components/ThemedButton";
import { ThemedButtonSecondry as Button } from "@/components/ThemedButtonSecondry";
//import { ThemedLink } from "@/components/ThemedLink";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useLanguage } from "@/context/LanguageContext";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import { JoMap } from "@/assets/icons/JoMap";

type ColorProps = {
  lightColor?: string;
  darkColor?: string;
};

type NavType = {
  login: null;
};

const ProfilePage = ({ lightColor, darkColor }: ColorProps) => {
  const navigation = useNavigation<NavigationProp<NavType>>();
  const IconColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const { language, toggleLanguage } = useLanguage();

  return (
    <RNView style={styles.container}>
      {/* Background View */}
      <RNView style={styles.background} />

      {/* SVG */}
      <JoMap />

      <ScrollView style={styles.scrollContainer}>
        <RNView style={styles.profileContainer}>
          <RNView
            style={{
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "#ccc",
              overflow: "hidden",
              padding: 10,
            }}
          >
            <TabBarIcon name="person" color={IconColor} size={50} />
          </RNView>
          <Text style={styles.name}>
            {language === "en" ? "guest" : "زائر"}
          </Text>
        </RNView>
        <RNView style={styles.line} />
        <Text style={{ fontSize: 24, paddingVertical: 5, textAlign: "center" }}>
          {language == "en" ? "My account" : "حسابي"}
        </Text>

        <Link
          href={"/login"}
          style={{ color: IconColor, paddingVertical: 12, fontSize: 16 }}
        >
          {language === "en" ? "log in" : "تسجيل دخول"}
        </Link>
        <Link
          href={"/signup"}
          style={{ color: IconColor, paddingVertical: 12, fontSize: 16 }}
        >
          {language === "en" ? "signup" : "انشاء حساب"}
        </Link>
        {/* <Link
          href={"/profile"}
          style={{ color: IconColor, paddingVertical: 12, fontSize: 16 }}
        >
          {language === "en" ? "My info as guest" : "معلوماتي كزائر"}
        </Link> */}
        <RNView style={styles.line} />
        <Text style={{ fontSize: 24, paddingVertical: 5, textAlign: "center" }}>
          {language === "en" ? "notification" : "اشعارات"}
        </Text>
        <Link
          href={"/newsNotification"}
          style={{ color: IconColor, paddingVertical: 12, fontSize: 16 }}
        >
          {language === "en" ? "news notification" : "اشعارات الاخبار"}
        </Link>
        <Link
          href={"/profile"}
          style={{ color: IconColor, paddingVertical: 12, fontSize: 16 }}
        >
          {language === "en"
            ? "Matches notification"
            : "اشعارات نتائج المباريات"}
        </Link>
        <Link
          href={"/profile"}
          style={{ color: IconColor, paddingVertical: 12, fontSize: 16 }}
        >
          {language === "en" ? "tickits notification" : "اشعارات حجز تذاكر"}
        </Link>
        <RNView style={styles.line} />
        <Text style={{ fontSize: 24, paddingVertical: 5, textAlign: "center" }}>
          {language === "en" ? "Others" : "اخرى"}
        </Text>
        <Link
          href={"/profile"}
          style={{ color: IconColor, paddingVertical: 12, fontSize: 16 }}
        >
          {language === "en" ? "favorite" : "المفضلة"}
        </Link>
        <Link
          href={"/profile"}
          style={{ color: IconColor, paddingVertical: 12, fontSize: 16 }}
        >
          {language === "en" ? "saved" : "المحفوظة"}
        </Link>
        <Link
          href={"/profile"}
          style={{ color: IconColor, paddingVertical: 12, fontSize: 16 }}
        >
          {language === "en" ? "technical support" : "الدعم  الفني"}
        </Link>

        <RNView style={styles.line} />

        <Button
          title={language === "en" ? "English" : "عربي"}
          onPress={toggleLanguage}
        />
        <ThemeToggleButton />
      </ScrollView>
    </RNView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "yourBackgroundColor", // Replace with your desired color
    zIndex: -1, // Ensures it stays behind the other components
  },
  scrollContainer: {
    flex: 1,
    zIndex: 1, // Ensures the ScrollView stays above the background
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 12,
    marginTop: 32,
  },
});

export default ProfilePage;
