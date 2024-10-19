import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";

export default function BasketballRules() {
  const rules = [
    "The game consists of four quarters, each lasting 12 minutes (NBA).",
    "A match is played between two teams of five players.",
    "The objective is to score more points than the opposing team.",
    "A field goal is worth two points, or three points if taken from beyond the three-point line.",
    "Free throws are worth one point and are awarded after certain fouls.",
    "The game begins with a jump ball at center court.",
    "Players must dribble the ball while moving; traveling (taking too many steps) is not allowed.",
    "Fouls can result in free throws or possession changes, depending on the type.",
    "A player is disqualified after accumulating six fouls (NBA).",
    "The shot clock is set to 24 seconds, and teams must attempt a shot within this time.",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Basketball Rules</Text>
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
    paddingBottom: 20,
  },
  rule: {
    fontSize: 16,
    marginBottom: 15,
  },
});
