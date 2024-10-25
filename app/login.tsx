import React, { useState, useEffect } from "react";
import { StyleSheet, Keyboard } from "react-native";
import { ThemedView as View } from "@/components/ThemedView";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedTextInput as TextInput } from "@/components/ThemedTextInput";
import { ThemedButton as Button } from "@/components/ThemedButton";
import { ThemedLink as Link } from "@/components/ThemedLink";
import { useLanguage } from "@/context/LanguageContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    // Clean up listeners on component unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = () => {
    alert(
      language === "en"
        ? "Please enter the correct email and password."
        : "الرجاء ادخال الحساب او كلمة السر الصحيحة"
    );
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password pressed");
  };

  const handleSignUp = () => {
    console.log("Sign Up pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          {language === "en" ? "log in" : "تسجيل دخول"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={
            language === "en"
              ? "Username or Phone Number"
              : "اسم المستخدم او رقم الهاتف"
          }
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder={language === "en" ? "Password" : "كلمة السر"}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={{ margin: 5 }}>
          {language === "en" ? "Forgot Password?" : "نسيت كلمة السر؟"}
        </Text>
        <Button
          title={language === "en" ? "log in" : "تسجيل دخول"}
          onPress={handleLogin}
        />

        {/* Conditionally render the account creation prompt */}
        {!isKeyboardVisible && (
          <View style={styles.linksContainer}>
            <Text>
              {language === "en" ? "Don't have an account? " : "ليس لديك حساي؟"}
            </Text>
            <Link
              title={
                language === "en" ? "Create New Account" : "انشاء حساب جديد"
              }
              href={"/signup"}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  linksContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});
