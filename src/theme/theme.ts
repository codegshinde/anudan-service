import { ThemeConfig, extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { buttonStyle } from "./buttons";
import colors from "./colors";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const defaultColorSchema = withDefaultColorScheme({
  colorScheme: "primary",
});

const theme = extendTheme({
  components: {
    ...buttonStyle,
  },
  fonts: {
    numbers: "system-ui",
    heading: "Poppins, sans-serif", // Capitalize the font name
    body: "Poppins, sans-serif", // Capitalize the font name
  },
  colors,
  config,
  defaultColorSchema,
});

export default theme;

