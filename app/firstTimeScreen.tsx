import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { ThemedButton as Button } from "@/components/ThemedButton";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type FirstTimeNavigationType = {
  index: null;
};

const FirstTimeScreen = () => {
  const { language, toggleLanguage } = useLanguage();
  const FirstTimeNavigation =
    useNavigation<NavigationProp<FirstTimeNavigationType>>();
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === 3; // Assuming there are 4 steps
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      FirstTimeNavigation.navigate("index", null);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>
              {language === "en" ? "Welcome to MyApp!" : "أهلاً بك في تطبيق!"}
            </Text>
            <Button
              title={
                language === "en"
                  ? "Switch to Arabic"
                  : "التبديل إلى الإنجليزية"
              }
              onPress={toggleLanguage}
            />
          </View>
        );
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>
              {language === "en"
                ? "Discover amazing features"
                : "استكشف ميزات رائعة"}
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>
              {language === "en"
                ? "Stay connected with friends"
                : "ابقَ متصلاً بالأصدقاء"}
            </Text>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.title}>
              {language === "en" ? "Join us today!" : "انضم إلينا اليوم!"}
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderStep()}

      <View style={styles.navigation}>
        {/* Render the Go Back button only if not on the first step */}
        {!isFirstStep && (
          <Button
            title={language === "en" ? "Go Back" : "العودة"}
            onPress={handleBack}
          />
        )}
        <Button
          title={
            isLastStep
              ? language === "en"
                ? "Finish"
                : "إنهاء"
              : language === "en"
              ? "Next"
              : "التالي"
          }
          onPress={handleNext}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    padding: 8,
  },
  navigation: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    marginHorizontal: 5, // Add space between buttons
  },
});

export default FirstTimeScreen;