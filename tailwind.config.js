const defaultTheme = require("tailwindcss/defaultTheme");

const nativeFontStack = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;

module.exports = {
  theme: {
    fontFamily: {
      header: ["Playfair Display", nativeFontStack],
      body: ["Oswald", nativeFontStack],
    },
    colors: {
      white: defaultTheme.colors.white,
      black: defaultTheme.colors.black,
      neutral: {
        light: defaultTheme.colors.gray[300],
        default: defaultTheme.colors.gray[600],
        dark: defaultTheme.colors.gray[900],
      },
      primary: {
        light: "#DF97C0",
        default: "#AD407D",
        dark: "#760E49",
      },
      secondary: {
        light: "#6EC4AF",
        default: "#28957A",
        dark: "#05674E",
      },
    },
    container: {
      center: true,
    },
  },
  variants: {},
  plugins: [],
};
