import * as React from "react";
import Svg, { Path } from "react-native-svg";

// By: mdi
// See: https://v0.app/icon/mdi/swim
// Example: <IconMdiSwim width={24} height={24} fill="#ffd300" />

interface IconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const IconSwimming: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = "currentColor",
  ...props
}) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" {...props}>
    <Path
      fill={fill}
      d="M2 18c2.22-1 4.44-2 6.67-2c2.22 0 4.44 2 6.66 2c2.23 0 4.45-2 6.67-2v3c-2.22 0-4.44 2-6.67 2c-2.22 0-4.44-2-6.66-2c-2.23 0-4.45 1-6.67 2zm6.67-5c-.78 0-1.55.12-2.32.32l4.92-3.44l-1.04-1.24c-.14-.17-.23-.4-.23-.64c0-.34.17-.65.44-.83l5.72-4l1.15 1.63l-4.84 3.39l5.23 6.23c-.79.33-1.58.58-2.37.58c-2.22 0-4.44-2-6.66-2M18 7a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"
    />
  </Svg>
);