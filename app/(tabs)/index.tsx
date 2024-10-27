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

interface NewsCardProps {
  item: NewsDetailParams;
}

type NewsDetailParams = {
  id: string;
  title: string;
  description: string;
  images: string[]; // This should be an array
  sportId: string;
  date: string;
  matchId: string | null;
};

type RootStackParamList = {
  newsDetail: NewsDetailParams;
  tickets: NewsDetailParams;
};

export default function News() {
  const [newsData, setNewsData] = useState<NewsDetailParams[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://sqljosports.vercel.app/api/news/read"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: NewsDetailParams[] = await response.json();

        // Parse images properly
        const parsedData = data.map((item) => ({
          ...item,
          images: Array.isArray(item.images)
            ? item.images
            : JSON.parse(item.images), // Ensure it's an array
        }));

        setNewsData(parsedData);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Sort news data by date after fetching
  const sortedNewsData = newsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
    const images = Array.isArray(item.images) ? item.images : []; // Ensure images is an array

    return (
      <View style={styles.card}>
        <Pressable>
          <Text>Date: {item.date.substring(0, 10)}</Text>

          {images.length === 1 ? (
            <Image source={{ uri: images[0] }} style={styles.singleImage} />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {images.map((imageUri, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUri }}
                  style={styles.image}
                />
              ))}
            </ScrollView>
          )}

          <View>
            <Text style={styles.title}>{item.title}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.description}
            >
              {item.description}
            </Text>
            {item.matchId != null ? (
              <ThemedButton
                title="Buy a Ticket"
                onPress={() =>
                  navigation.navigate("tickets", {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    images: images,
                    sportId: item.sportId,
                    date: item.date,
                    matchId: item.matchId,
                  })
                }
              />
            ) : (
              <ThemedButton
                title="View More"
                onPress={() =>
                  navigation.navigate("newsDetail", {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    images: images, // This should be an array of strings
                    sportId: item.sportId,
                    date: item.date,
                    matchId: item.matchId,
                  })
                }
              />
            )}
          </View>
        </Pressable>
        <View style={styles.line} />
      </View>
    );
  };

  const renderItem = ({ item }: { item: NewsDetailParams }) => (
    <NewsCard item={item} />
  );

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View>
      <FlatList
        data={sortedNewsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
  },
  singleImage: {
    resizeMode: "cover",
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  image: {
    resizeMode: "cover",
    width: 100,
    height: 200,
    marginRight: 10,
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
