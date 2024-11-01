import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  View as RNView,
} from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedViewProps, ThemedView as View } from "@/components/ThemedView";
import { useRoute } from "@react-navigation/native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useLanguage } from "@/context/LanguageContext";

interface match {
  matchId: string;
  teamA: string;
  teamB: string;
  score: string;
  date: string;
  time: string;
  place: string;
}

export default function Tickets({ lightColor, darkColor }: ThemedViewProps) {
  const route = useRoute();
  const {
    titleEn,
    titleAr,
    images,
    descriptionEn,
    descriptionAr,
    date,
    sportid,
    matchId,
  } = route.params as {
    titleEn: string;
    titleAr: string;
    images: string[];
    descriptionEn: string;
    descriptionAr: string;
    date: string;
    sportid: string;
    matchId: string;
  };

  const [matchData, setMatchData] = useState<null | match>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const controller = new AbortController();
    const fetchMatchData = async () => {
      try {
        const response = await fetch(
          `https://sqljosports.vercel.app/api/news/readMatch?matchId=${matchId}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setMatchData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
          console.log(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMatchData();

    return () => {
      controller.abort();
    };
  }, [matchId]);

  const [visible, setIsVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Transform images to the required format
  const formattedImages = images.map((imageUri) => ({ uri: imageUri }));

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const selectedBackgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background2"
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{language == "en" ? titleEn : titleAr}</Text>

        <View style={styles.imageContainer}>
          {formattedImages.map((image, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                setImageIndex(index);
                setIsVisible(true);
              }}
            >
              <Image source={image} style={styles.image} resizeMode="cover" />
            </TouchableWithoutFeedback>
          ))}
        </View>

        <Text style={styles.description}>
          {language == "en" ? descriptionEn : descriptionAr}
        </Text>
        {/* Ticket Purchase Options */}
        <View style={{ alignItems: "center", padding: 16 }}>
          <Text type="title">
            {language == "en" ? "Buy a Ticket" : "أشتري تذكرة"}
          </Text>
          <View style={{ width: "100%" }}>
            <ThemedButton
              title={language == "en" ? "Vip" : "Vip"}
              onPress={() => {
                alert("no avaible tickets for this at the moment");
              }}
            />
            <ThemedButton
              title={language == "en" ? "normal" : "عادي"}
              onPress={() => {
                alert("no avaible tickets for this at the moment");
              }}
            />
          </View>
        </View>
        {matchData && (
          <View
            style={[styles.card, { backgroundColor: selectedBackgroundColor }]}
          >
            <Text style={styles.date}>
              {matchData.date} {matchData.time}
            </Text>

            <RNView style={styles.row}>
              <RNView style={styles.teamContainer}>
                <Image
                  source={require("../assets/images/react-logo.png")}
                  style={styles.logo}
                />
                <Text style={styles.teamName}>{matchData.teamA}</Text>
              </RNView>
              <Text style={styles.score}>{matchData.score}</Text>
              <RNView style={styles.teamContainer}>
                <Image
                  source={require("../assets/images/react-logo.png")}
                  style={styles.logo}
                />
                <Text style={styles.teamName}>{matchData.teamB}</Text>
              </RNView>
            </RNView>
            <Text style={styles.place}>{matchData.place}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 8,
    paddingVertical: 8,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  matchDetails: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  detailsText: {
    fontSize: 16,
    marginVertical: 2,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },

  card: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  place: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamContainer: {
    alignItems: "center",
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 4,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  score: {
    fontSize: 16,
    marginVertical: 4,
  },
});
