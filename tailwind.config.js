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
  // Enable all variants because we strip unused anyways
  variants: [
    "responsive",
    "group-hover",
    "group-focus",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled",
  ],
  purge: ["./src/**/*.ts", "./src/**/*.tsx", "./src/**/*.js"],
  plugins: [],
};
