import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Pressable,
  Animated,
  Switch,
} from "react-native";
import { ThemedText as Text } from "@/components/ThemedText";
import { ThemedView as View } from "@/components/ThemedView";
//import MapView, { Marker } from "react-native-maps";
import { SelectList } from "react-native-dropdown-select-list";
import { useLanguage } from "@/context/LanguageContext";
import { WebView } from "react-native-webview";

interface Location {
  sportId: string;
  public: boolean;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title: {
    en: string;
    ar: string;
  };
  description: string;
  owner: string | null;
  hours: { open: string | null; close: string | null };
  phoneNumber: string | null;
  capacity: number | null;
  yearOpened: number | null;
}

const locations: Location[] = [
  {
    sportId: "Football",
    public: true,
    coordinate: { latitude: 31.985115, longitude: 35.905477 }, // Oman International Stadium
    title: {
      en: "Oman International Stadium",
      ar: "ستاد عمان الدولي",
    },
    description: "Amman - Al-Hussein Youth City",
    owner: "government",
    hours: { open: "09:00", close: "17:30" },
    phoneNumber: "07 XXXX XXXX",
    capacity: 17000,
    yearOpened: 1968,
  },
  {
    sportId: "Football",
    public: true,
    coordinate: { latitude: 32.537334, longitude: 35.863721 }, // Prince Hassan Sports City
    title: {
      en: "Prince Hassan Sports City",
      ar: "ملعب مدينة الحسن الرياضية",
    },
    description: "Irbid - Prince Hassan Sports City",
    owner: "government",
    hours: { open: "09:00", close: "17:30" },
    phoneNumber: "07 XXXX XXXX",
    capacity: 12000,
    yearOpened: 1990,
  },
  {
    sportId: "Football",
    public: true,
    coordinate: { latitude: 31.927245, longitude: 35.955113 }, // King Abdullah II Stadium
    title: {
      en: "King Abdullah II Stadium",
      ar: "ستاد الملك عبدالله",
    },
    description: "Amman - Al-Quds Street",
    owner: "government",
    hours: { open: "09:00", close: "17:00" },
    phoneNumber: "06 500 2222",
    capacity: 15000,
    yearOpened: 1999,
  },
  {
    sportId: "Football",
    public: true,
    coordinate: { latitude: 29.5482255, longitude: 35.0059986 }, // King Abdullah II Stadium
    title: {
      en: "Al-Aqaba Stadium",
      ar: "ملعب العقبة",
    },
    description: "Amman - Al-Quds Street",
    owner: "government",
    hours: { open: "09:00", close: "17:00" },
    phoneNumber: "06 500 2222",
    capacity: 15000,
    yearOpened: 1999,
  },
  {
    sportId: "Basketball",
    public: true,
    coordinate: { latitude: 31.9804073, longitude: 35.907472 }, // King Abdullah II Stadium
    title: {
      en: "King Abdullah II Stadium",
      ar: "صالة الأمير حمزة",
    },
    description: "Amman - Al-Quds Street",
    owner: "government",
    hours: { open: "09:00", close: "17:00" },
    phoneNumber: "06 500 2222",
    capacity: 15000,
    yearOpened: 1999,
  },
];

const sportsData = [
  { key: "1", value: "Football" },
  { key: "2", value: "Basketball" },
  { key: "3", value: "Tennis" },
  { key: "4", value: "Baseball" },
  { key: "5", value: "Cricket" },
  { key: "6", value: "Hockey" },
  { key: "7", value: "Rugby" },
];

export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [showGov, setShowGov] = useState(true);
  const [showNonGov, setShowNonGov] = useState(true);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const drawerAnimation = useState(new Animated.Value(-300))[0];
  const [selectedSport, setSelectedSport] = useState("Football");
  const { language, toggleLanguage } = useLanguage();

  const initialRegion = {
    latitude: 30.5852,
    longitude: 36.2384,
    latitudeDelta: 5,
    longitudeDelta: 5,
  };

  const filteredLocations = locations.filter((location) => {
    const sportMatch = selectedSport ? selectedSport == location.sportId : true; // Match by sport if selected
    const matchGov =
      (showGov && location.public) || (showNonGov && !location.public); // Government filter

    return sportMatch && matchGov; // Return true if both conditions match
  });

  const toggleDrawer = () => {
    if (drawerVisible) {
      Animated.timing(drawerAnimation, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setDrawerVisible(false));
    } else {
      setDrawerVisible(true);
      Animated.timing(drawerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <WebView
          source={{ uri: "https://sportmapview.vercel.app/" }}
          javaScriptEnabled={true}
          style={{ flex: 1 }}
          isFileUploadSupported={true}
        />
      </View>

      {/* Drawer for Filter Options */}
      {drawerVisible && (
        <Animated.View
          style={[
            styles.drawer,
            { transform: [{ translateX: drawerAnimation }] },
          ]}
        >
          <View style={styles.drawerContent}>
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.drawerTitle}>Sport</Text>
              <SelectList
                boxStyles={{
                  backgroundColor: "#cccccc",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                dropdownStyles={{ backgroundColor: "#cccccc" }}
                setSelected={setSelectedSport}
                data={sportsData}
                save="value"
              />
            </View>
            <View>
              <Text style={styles.drawerTitle}>Filter Options</Text>
              <View style={styles.switchContainer}>
                <Text>Show public</Text>
                <Switch
                  value={showGov}
                  onValueChange={setShowGov}
                  trackColor={{ false: "#767577", true: "#ff5252" }}
                  thumbColor={showGov ? "#fff" : "#f4f3f4"}
                />
              </View>
              <View style={styles.switchContainer}>
                <Text>Show Private</Text>
                <Switch
                  value={showNonGov}
                  onValueChange={setShowNonGov}
                  thumbColor={showNonGov ? "#fff" : "#f4f3f4"}
                />
              </View>
              <Pressable onPress={toggleDrawer}>
                <Text style={{ fontSize: 18, color: "red", marginTop: 20 }}>
                  Close
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    height: 400,
    width: "100%",
    position: "relative",
    flex: 1,
  },
  infoContainer: {
    padding: 20,
  },
  filter: {
    position: "absolute",
    top: 10, // Adjust as needed
    right: 10, // Position it on the right
    padding: 10,
    borderRadius: 5,
    elevation: 5, // Optional: Shadow effect
  },
  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 300,
    height: "100%",
    elevation: 5,
    zIndex: 1000,
  },
  drawerContent: {
    padding: 20,
    flex: 1,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
