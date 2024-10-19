import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";

export default function TennisRules() {
  const rules = [
    "A match can be played as singles (one player per side) or doubles (two players per side).",
    "The objective is to win sets by winning games.",
    "A game is won by the first player to win four points, with at least a two-point advantage.",
    "Points are counted as: 0, 15, 30, 40, and game point.",
    "If both players reach 40, it is called 'deuce.' A player must win two consecutive points to win the game from deuce.",
    "Sets are won by the first player to win six games, with at least a two-game advantage.",
    "If players reach 6-6 in a set, a tiebreaker may be played, where the first to 7 points wins the set.",
    "Players serve alternately, with each player serving an entire game.",
    "The serve must land in the opponent's service box; otherwise, it is a fault.",
    "Players switch sides of the court after every odd-numbered game in a set.",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tennis Rules</Text>
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
