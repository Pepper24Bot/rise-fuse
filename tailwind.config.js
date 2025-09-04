/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      textColor: {
        primary: "var(--color-text-primary)",
        accent: "var(--color-text-accent)",
        secondary: "var(--color-text-secondary)",
      },

      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",

        background: "var(--color-background)",
        "background-secondary": "var(--color-background-secondary)",

        foreground: "var(--color-foreground)",
        "foreground-secondary": "var(--color-foreground-secondary)",

        button: "var(--color-button)",
        "button-primary": "var(--color-button-primary)",
        "button-secondary": "var(--color-button-secondary)",
        "button-accent": "var(--color-button-accent)",
        "button-outline": "var(--color-button-outline)",

        border: "var(--color-border)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
