const tintColorLight = "#4CAF50"; // Updated primary color for light theme
const tintColorDark = "#FF6A00"; // Updated primary color for dark theme

export const Colors = {
  light: {
    title: "#4CAF50",
    text: "#333333", // Dark Charcoal for text
    secondryText: "#F5F5F5",
    background: "#F5F5F5", // Light Gray for background
    tint: tintColorLight,
    icon: "#687076", // Original icon color
    tabIconDefault: "#687076", // Original default tab icon color
    tabIconSelected: tintColorLight,
    selectedTab2: "#bfbfbf",
  },
  dark: {
    title: "#FF6A00",
    text: "#ECEDEE", // Light text for dark theme
    secondryText: "#ECEDEE",
    background: "#2C2C2C", // Almost Black for background
    tint: tintColorDark,
    icon: "#9BA1A6", // Original icon color
    tabIconDefault: "#9BA1A6", // Original default tab icon color
    tabIconSelected: tintColorDark,
    selectedTab2: "#616161",
  },
};
