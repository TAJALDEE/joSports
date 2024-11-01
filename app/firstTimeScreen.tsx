import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View as RNView, AccessibilityInfo } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedViewProps, ThemedView as View } from "@/components/ThemedView";
import { ThemedButton as Button } from "@/components/ThemedButton";
import { ThemedButtonSecondry } from "@/components/ThemedButtonSecondry";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import SwitchSelector from "react-native-switch-selector";
import { useThemeColor } from "@/hooks/useThemeColor";

type FirstTimeNavigationType = {
  index: null;
};

const FirstTimeScreen = ({ lightColor, darkColor }: ThemedViewProps) => {
  const { language, toggleLanguage } = useLanguage();
  const FirstTimeNavigation =
    useNavigation<NavigationProp<FirstTimeNavigationType>>();
  const [currentStep, setCurrentStep] = useState(0);

  const isLastStep = currentStep === 3; // Assuming there are 4 steps
  const isFirstStep = currentStep === 0;

  const pageFocuseRef = useRef<RNView>(null);

  const selectedBackgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "tint"
  );
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "text"
  );
  const textColor2 = useThemeColor(
    { light: lightColor, dark: darkColor },
    "secondryText"
  );

  const bg2 = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background2"
  );

  const options = [
    { label: "English", value: "en" },
    { label: "عربي", value: "ar" },
  ];

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

  const handleLang = (value: string) => {
    if (value !== language) {
      toggleLanguage();
    }
  };
  useEffect(() => {
    // Set focus on the TouchableOpacity when the current step changes
    if (pageFocuseRef.current) {
      pageFocuseRef.current.focus();
    }
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <Text
              style={styles.title}
              accessibilityLabel="Choose a language"
              accessibilityHint="Double tap to change the language."
              onAccessibilityAction={({ nativeEvent }) => {
                if (nativeEvent.actionName === "activate") {
                  toggleLanguage();
                  AccessibilityInfo.announceForAccessibility(
                    language === "ar" ? "Language is English" : "اللغة العربية"
                  );
                }
              }}
              accessibilityActions={[
                { name: "activate", label: "Change language" },
              ]}
            >
              {language === "en" ? "Welcome to MyApp!" : "أهلاً بك في تطبيق!"}
            </Text>

            <View style={styles.switchContainer}>
              <SwitchSelector
                options={options}
                initial={language === "en" ? 0 : 1} // Initial selected index
                onPress={handleLang}
                textColor={textColor}
                selectedColor={textColor2}
                backgroundColor={bg2}
                buttonColor={selectedBackgroundColor}
                style={{ width: 200 }}
                animationDuration={200}
              />
            </View>
          </View>
        );
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text
              style={styles.title}
              accessibilityLabel="Stay updated with News and Matches from Over 30 Sports"
            >
              {language === "en"
                ? "Stay updated with News and Matches from Over 30 Sports"
                : "ابقَ على اطلاع بأخبار ومباريات أكثر من 30 رياضة "}
            </Text>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text
              style={styles.title}
              accessibilityLabel="Get to know the achievements of Jordanian champions"
            >
              {language === "en"
                ? "Get to know Jordanian Champions and Achievements"
                : "تعرف على أبطال الأردنين وإنجازاتهم"}
            </Text>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text
              style={styles.title}
              accessibilityLabel="Information about booking tickets"
            >
              {language === "en"
                ? "Book tickets and watch matches live in the stadiums"
                : "قم بحجز التذاكر وشاهد المباريات في الملاعب"}
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
          <ThemedButtonSecondry
            title={language === "en" ? "Go Back" : "العودة"}
            onPress={handleBack}
            accessibilityLabel="Go back to the previous step"
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
          accessibilityLabel={
            isLastStep
              ? language === "en"
                ? "Finish the setup"
                : "إنهاء الإعداد"
              : language === "en"
              ? "Proceed to the next step"
              : "الانتقال إلى الخطوة التالية"
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    padding: 8,
    lineHeight: 28,
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
  switchContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FirstTimeScreen;
