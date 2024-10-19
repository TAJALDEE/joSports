import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";

export default function FootballRules() {
  const rules = [
    "The game consists of two halves of 45 minutes each.",
    "A match is played between two teams of eleven players.",
    "The objective is to score more goals than the opposing team.",
    "The ball must fully cross the goal line to count as a goal.",
    "Only goalkeepers may handle the ball within their penalty area.",
    "A penalty kick is awarded for a foul committed inside the penalty area.",
    "Offside is called if a player is nearer to the opponent's goal line than both the ball and the second-to-last opponent when the ball is played to them.",
    "Fouls can result in free kicks or penalty kicks, depending on the severity and location.",
    "Yellow cards are warnings, while red cards result in expulsion from the match.",
    "Substitutions are limited to three per match, with an additional substitution in extra time.",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Football Rules</Text>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {rules.map((rule, index) => (
          <Text key={index} style={styles.rule}>
            {index + 1}. {rule}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    paddingBottom: 20, // Optional: add padding to the bottom of the scroll view
  },
  rule: {
    fontSize: 16,
    marginBottom: 15,
  },
});
