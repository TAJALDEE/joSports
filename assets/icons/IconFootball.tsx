import * as React from "react";
import Svg, { Path } from "react-native-svg";

// By: bx
// See: https://v0.app/icon/bx/football
// Example: <IconBxFootball width={24} height={24} fill="#ffd300" />

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const IconBxFootball: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
    <Path
      fill={fill}
      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m1.67 14h-3.34l-1.38 1.897l.554 1.706A7.993 7.993 0 0 0 12 20c.871 0 1.71-.14 2.496-.397l.553-1.706zm-8.376-5.128l-1.292.938L4 12c0 1.73.549 3.331 1.482 4.64h1.91l1.323-1.82l-1.028-3.17zm13.412 0l-2.393.778l-1.028 3.17l1.322 1.82h1.91A7.963 7.963 0 0 0 20 12l-.003-.19zM12 9.536l-2.344 1.702l.896 2.762h2.895l.896-2.762zm2.291-5.203L13 5.273V7.79l2.694 1.957l2.24-.727l.554-1.703a8.014 8.014 0 0 0-4.196-2.984m-4.583 0a8.014 8.014 0 0 0-4.195 2.985l.554 1.702l2.239.727L11 7.79V5.273z"
    />
  </Svg>
);