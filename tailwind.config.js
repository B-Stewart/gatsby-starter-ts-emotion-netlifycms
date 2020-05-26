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
      neutral: defaultTheme.colors.gray,
      primary: defaultTheme.colors.teal,
      secondary: defaultTheme.colors.purple,
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  variants: {},
  plugins: [],
};
