import * as React from "react";
import Svg, { Path } from "react-native-svg";

// By: mdi
// See: https://v0.app/icon/mdi/tennis
// Example: <IconMdiTennis width={24} height={24} fill="#ffd300" />

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const IconTennis: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
    <Path
      fill={fill}
      d="M18 15a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M6.05 14.54s1.41-1.42 1.42-4.24c-.36-2.19.5-4.76 2.47-6.72C12.87.65 17.14.17 19.5 2.5c2.33 2.36 1.85 6.63-1.08 9.56c-1.96 1.97-4.53 2.83-6.72 2.47c-2.82.01-4.24 1.42-4.24 1.42l-4.24 4.24l-1.41-1.41zM18.07 3.93C16.5 2.37 13.5 2.84 11.35 5c-2.14 2.14-2.62 5.15-1.06 6.71c1.57 1.56 4.57 1.08 6.71-1.06c2.16-2.15 2.63-5.15 1.07-6.72"
    />
  </Svg>
);