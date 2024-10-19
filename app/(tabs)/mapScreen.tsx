import React from "react";
import { View, Button } from "react-native";
import { useMap } from "@/context/MapContext"; // Adjust the import path as needed
import Map from "../map"; // Adjust the import path as needed
import NotFoundScreen from "../+not-found"; // Adjust the import path as needed
import Login from "../login";

const MapScreen: React.FC = () => {
  const { currentMap, toggleMap } = useMap(); // Use the context

  return (
    <View style={{ flex: 1 }}>
      {currentMap === "Map" ? <Map /> : <Login />}
    </View>
  );
};

export default MapScreen;
