import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const IconVolleyball: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 256 256" {...props}>
    <Path
      fill={fill}
      d="M128 26a102 102 0 1 0 102 102A102.12 102.12 0 0 0 128 26m83.37 135.89a90 90 0 0 1-97.85 3.18L131.46 134h86.34a89.49 89.49 0 0 1-6.43 27.89M88.3 47.24a89.54 89.54 0 0 1 27.35-8.39A90 90 0 0 1 167.34 122h-35.88ZM217.8 122h-38.46a102.12 102.12 0 0 0-40.84-83.38A90.15 90.15 0 0 1 217.8 122M77.92 53.26l19.21 33.27a102.16 102.16 0 0 0-51.79 77.06A89.93 89.93 0 0 1 77.92 53.26M57 183.19a90 90 0 0 1 46.17-86.26l17.9 31.07l-43.15 74.74A90.59 90.59 0 0 1 57 183.19M128 218a89.5 89.5 0 0 1-39.7-9.24l19.22-33.29a102.13 102.13 0 0 0 92.58 6.34A89.91 89.91 0 0 1 128 218"
    />
  </Svg>
);
