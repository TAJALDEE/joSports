import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
import { ThemedButton } from "@/components/ThemedButton";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface ItemType {
  id: string;
  title: string;
  description: string;
  image: string;
  sportId: string;
  date: string;
}
interface NewsCardProps {
  item: ItemType;
}
type NewsDetailParams = {
  id: string;
  title: string;
  description: string;
  image: string;
  sportid: string;
  date: string;
};
type RootStackParamList = {
  newsDetail: NewsDetailParams;
};

export default function News() {
  const [test, setTest] = useState<number>(0);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const newsData: ItemType[] = [
    {
      id: "1",
      title: "Jordan National Team Secures Victory in Latest Match!",
      description: `  The Jordan national football team has a rich history in the sport, competing in various international tournaments and championships. 
  Established in 1953, the team has made significant strides in improving its performance on the global stage. 

  Over the years, they have participated in numerous World Cup qualifiers and Asian Cup tournaments, showcasing the talent and determination of Jordanian players. 
  The team's journey has been marked by both challenges and triumphs, with memorable matches that have captured the hearts of fans across the nation.

  In recent years, the Jordan Football Association has invested in youth development programs, aiming to nurture the next generation of football stars. 
  This focus on grassroots development is essential for the long-term success of the team, as young talents emerge from local academies, bringing fresh energy and skills to the national squad.

  The players have shown remarkable resilience and teamwork, working tirelessly to elevate Jordan's status in international football. 
  Matches against rival teams often see passionate displays of skill, strategy, and sportsmanship, embodying the spirit of competition that football is known for.

  Furthermore, the support from fans plays a crucial role in motivating the players. 
  Stadiums filled with cheering supporters create an electrifying atmosphere, driving the team to give their best performance.

  Looking ahead, the Jordan national football team aims to qualify for future World Cup tournaments, aspiring to compete with the best teams in the world. 
  With a combination of experienced players and emerging talents, the team is poised for greater achievements in the years to come.
`,
      image:
        "https://thumbs.dreamstime.com/b/jordan-national-football-team-flag-soaring-eagle-seamless-loop-motion-ripples-small-waves-flag-editorial-jordan-236556335.jpg",
      sportId: "football",
      date: "2024-09-20T12:00:00Z", // Example date
    },
    {
      id: "2",
      title: "Upcoming Qualifiers: Jordan Aims for World Cup Spot",
      description:
        "As the World Cup qualifiers approach, the Jordan national team is gearing up to secure their place on the global stage.",
      image:
        "https://img.freepik.com/premium-vector/banner-design-football-ball-with-flag-jordan-football-net-goal-by-national-soccer-team-jordan_292608-23522.jpg",
      sportId: "football",
      date: "2024-09-15T09:30:00Z", // Example date
    },
    {
      id: "3",
      title: "Young Talent Shines in Jordan Football Academy",
      description:
        "The Jordan Football Academy is producing a new generation of stars, with young players impressing scouts across the region.",
      image:
        "https://img.freepik.com/premium-photo/jordan-country-flag-draped-football-soccer-pitch-ball-3d-rendering_601748-25490.jpg",
      sportId: "football",
      date: "2024-09-10T08:00:00Z", // Example date
    },
  ];

  // Sort news data by date
  const sortedNewsData = newsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const NewsCard: React.FC<NewsCardProps> = ({ item }) => (
    <View style={styles.card}>
      <Pressable>
        <Text>Date: {item.date.substring(0, 10)}</Text>
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 200 }}
        />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.description}
          >
            {item.description}
          </Text>
          <ThemedButton
            title="View More"
            onPress={() =>
              navigation.navigate("newsDetail", {
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image,
                sportid: item.sportId,
                date: item.date,
              })
            }
          />
        </View>
      </Pressable>
      <View style={styles.line} />
    </View>
  );

  const renderItem = ({ item }: { item: ItemType }) => <NewsCard item={item} />;

  return (
    <View>
      <FlatList
        data={sortedNewsData} // Use sorted data
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  Center: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    margin: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  description: {
    margin: 5,
  },
  line: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
    marginTop: 30,
  },
});
