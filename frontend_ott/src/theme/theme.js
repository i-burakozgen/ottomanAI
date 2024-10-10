// theme.js
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("gray.100", "gray.900")(props),
      color: mode("gray.800", "whiteAlpha.900")(props),
    },
  }),
};

const components = {
  Box: {
    baseStyle: (props) => ({
      bg: mode("white", "gray.800")(props),
      borderColor: mode("gray.200", "gray.600")(props),
    }),
  },
  Button: {
    baseStyle: (props) => ({
      bg: mode("blue.500", "blue.300")(props),
      color: mode("white", "black")(props),
      _hover: {
        bg: mode("blue.600", "blue.400")(props),
      },
    }),
  },
};

const theme = extendTheme({
  styles,
  components,
  config: {
    initialColorMode: "dark",
    useSystemColorMode: true,
  },
});

export default theme;
