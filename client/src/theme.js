import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    mainBackground: "#24292e"
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
    },
    background: {
      barBackground: "#24292e"
  },
  error: {
    color: "#d73a4a"
  }
    
};

export default theme;