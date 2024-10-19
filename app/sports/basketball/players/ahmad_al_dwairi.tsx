import React from "react";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { StyleSheet, ScrollView } from "react-native";

export default function Ahmad_Al_Dwairi() {
  const player = {
    name: "Ahmad Al Dwairi",
    position: "Center",
    team: "Jordanian National Team",
    height: "7'0\"",
    weight: "230 lbs",
    achievements: [
      "Bronze Medal at the FIBA Asia Cup (2017)",
      "Top Rebounder in the Jordanian League (2020)",
      "MVP of the Arab Club Championship (2021)",
    ],
    bio: "Ahmad Al Dwairi is known for his shot-blocking ability and rebounding skills, making him a key player for the Jordanian national team.",
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{player.name}</Text>
        <Text style={styles.position}>Position: {player.position}</Text>
        <Text>
          <Text style={styles.bold}>Team:</Text> {player.team}
        </Text>
        <Text>
          <Text style={styles.bold}>Height:</Text> {player.height}
        </Text>
        <Text>
          <Text style={styles.bold}>Weight:</Text> {player.weight}
        </Text>
        <Text style={styles.achievementTitle}>Achievements:</Text>
        {player.achievements.map((achievement, index) => (
          <Text key={index} style={styles.achievement}>
            {achievement}
          </Text>
        ))}
        <Text style={styles.bioTitle}>Bio:</Text>
        <Text>{player.bio}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  position: { fontSize: 18, color: "#555" },
  bold: { fontWeight: "bold" },
  achievementTitle: { fontSize: 18, marginTop: 10, marginBottom: 5 },
  achievement: { marginLeft: 10 },
  bioTitle: { fontSize: 18, marginTop: 10, marginBottom: 5 },
});
