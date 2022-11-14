export default {
  grid: {
    container: "120rem",
  },
  border: {
    radius: "0.4rem",
  },
  font: {
    family:
      "Sora, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    weight: {
      normal: 400,
      bold: 700,
    },
    sizes: {
      xsmall: "1.2rem",
      small: "1.4rem",
      medium: "1.6rem",
      large: "2.2rem",
    },
  },
  colors: {
    background: "#eee",
    white: "#fff",
    gray: {
      dark: "#717274",
      main: "#CCCCCC",
      light: "#F5F5F5",
    },
    disabled: "#CCCCCC",
    black: "#222",
    blue: {
      lighter: "#B1D4E0",
      light: "#2E8BC0",
      main: "#145DA0",
      dark: "#0C2D48",
    },
    red: {
      light: "#f97171",
      main: "#FC5050",
      dark: "#f63131",
    },
    yellow: "#FFCE52",
    green: "#51CA73",
  },
  spacings: {
    xxsmall: "0.6rem",
    xsmall: "1.6rem",
    small: "2.4rem",
    medium: "3.2rem",
    large: "4.0rem",
    xlarge: "4.8rem",
    xxlarge: "5.6rem",
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50,
  },
} as const;
