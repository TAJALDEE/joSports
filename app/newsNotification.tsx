import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as ThemedView } from "@/components/ThemedView";
import { useLanguage } from "@/context/LanguageContext";

// Define the type for the sport
interface Sport {
  id: number;
  name: string;
  arabicName: string;
}

// Create a list of sports
const sportsList: Sport[] = [
  { id: 1, name: "Football", arabicName: "كرة القدم" },
  { id: 2, name: "Basketball", arabicName: "كرة السلة" },
  { id: 3, name: "Athletics", arabicName: "ألعاب القوى" },
  { id: 4, name: "Swimming", arabicName: "السباحة" },
  { id: 5, name: "Tennis", arabicName: "التنس الأرضي" },
  { id: 6, name: "Tennis Table", arabicName: "التنس طاولة" },
  { id: 7, name: "Padel", arabicName: "تنس المجداف" },
  { id: 8, name: "Volleyball", arabicName: "كرة الطائرة" },
  { id: 9, name: "Boxing", arabicName: "الملاكمة" },
  { id: 10, name: "Handball", arabicName: "كرة اليد" },
  { id: 11, name: "Gymnastics", arabicName: "الجمباز" },
  { id: 12, name: "Judo", arabicName: "الجودو" },
  { id: 13, name: "Cycling", arabicName: "ركوب الدراجات" },
  { id: 14, name: "Rugby", arabicName: "الرجبي" },
  { id: 15, name: "Karate", arabicName: "الكاراتيه" },
  { id: 16, name: "Taekwondo", arabicName: "التايكواندو" },
  { id: 17, name: "3×3 Basketball", arabicName: "كرة السلة 3×3" },
  { id: 18, name: "Jiu-Jitsu", arabicName: "الجوجيتسو" },
  { id: 19, name: "Equestrian", arabicName: "الفروسية" },
  { id: 20, name: "Squash", arabicName: "السكواش" },
  { id: 21, name: "Weightlifting", arabicName: "رفع الأثقال" },
  { id: 22, name: "Wrestling", arabicName: "المصارعة" },
  { id: 23, name: "Fencing", arabicName: "المبارزة" },
  { id: 24, name: "Archery", arabicName: "القوس والنشاب" },
  { id: 25, name: "Bowling", arabicName: "البولينج" },
  { id: 26, name: "Triathlon", arabicName: "ترايثلون" },
  { id: 27, name: "Diving", arabicName: "الغطس" },
  { id: 28, name: "Skydiving", arabicName: "القفز بالمظلات" },
  { id: 29, name: "Car Racing", arabicName: "سباقات السيارات" },
  { id: 30, name: "Chess", arabicName: "الشطرنج" },
  { id: 31, name: "Shooting", arabicName: "الرماية" },
  { id: 32, name: "Hunting", arabicName: "الصيد" },
];

// Define the type for the state
interface SubscribedSports {
  [key: string]: boolean;
}

export default function Example() {
  const { language } = useLanguage();
  const [subscribedSports, setSubscribedSports] = useState<SubscribedSports>(
    sportsList.reduce((acc, sport) => {
      acc[sport.name] = false; // Initialize all sports as not subscribed
      return acc;
    }, {} as SubscribedSports)
  );

  const toggleSwitch = (sport: string) => {
    setSubscribedSports((prev) => ({
      ...prev,
      [sport]: !prev[sport],
    }));
  };

  return (
    <ThemedView style={styles.Container}>
      <ScrollView>
        <View
          style={{
            flexDirection: language == "en" ? "row" : "row-reverse",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {sportsList.map((sport) => (
            <View key={sport.id} style={styles.card}>
              <Text style={styles.text}>
                {language === "en" ? `${sport.name}` : `${sport.arabicName}`}
              </Text>
              <View
                style={{
                  flexDirection: language == "en" ? "row-reverse" : "row",
                }}
              >
                <Switch
                  value={subscribedSports[sport.name]}
                  onValueChange={() => toggleSwitch(sport.name)}
                  trackColor={{ false: "#767577", true: "#ccc" }}
                  thumbColor={
                    subscribedSports[sport.name] ? "#4CAF50" : "#f4f3f4"
                  }
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10,
  },
  grid: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%", // Two cards per row
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2, // For Android shadow
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
