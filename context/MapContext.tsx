import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface MapContextType {
  currentMap: string;
  toggleMap: () => void;
}

// Create a context
const MapContext = createContext<MapContextType | undefined>(undefined);

// Create a provider component
export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [currentMap, setCurrentMap] = useState<string>("Map");

  const toggleMap = () => {
    setCurrentMap((prevMap) => (prevMap === "Map" ? "NotFoundScreen" : "Map"));
  };

  return (
    <MapContext.Provider value={{ currentMap, toggleMap }}>
      {children}
    </MapContext.Provider>
  );
};

// Create a custom hook to use the MapContext
export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
