import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { ThemedButton as Button } from "@/components/ThemedButton";
import { ThemedLink } from "@/components/ThemedLink";
import { Colors } from "@/constants/Colors";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useLanguage } from "@/context/LanguageContext";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { useThemeColor } from "@/hooks/useThemeColor";

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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View
            style={{
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "#ccc",
              overflow: "hidden",
              padding: 10,
            }}
          >
            <TabBarIcon name="person" color={IconColor} size={50} />
          </View>
          <Text style={styles.name}>
            {language === "en" ? "TAJALDEEN" : "تاج الدين"}
          </Text>
        </View>
        <ThemedLink
          title={language === "en" ? "Add Article" : " اضافة مقال"}
          href={"/addNews"}
          onPress={() => {
            console.log("message");
          }}
        />

        <Button
          title={language === "en" ? "log in" : "تسجيل دخول"}
          onPress={() => navigation.navigate("login", null)}
        />
        <Button
          title={language === "en" ? "English" : "عربي"}
          onPress={toggleLanguage}
        />
        <ThemeToggleButton />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default ProfilePage;
