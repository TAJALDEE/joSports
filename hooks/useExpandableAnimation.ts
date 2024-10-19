// useExpandableAnimation.ts

import { useRef, useEffect } from "react";
import { Animated } from "react-native";

const useExpandableAnimation = (isVisible: boolean) => {
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      expandView();
    } else {
      collapseView();
    }
  }, [isVisible]);

  const expandView = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const collapseView = () => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const animatedHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, "100%"], // You can use a specific number for the full height
  });

  return {
    animatedHeight,
    expandView,
    collapseView,
  };
};

export default useExpandableAnimation;
