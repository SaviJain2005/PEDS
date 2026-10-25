/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      colors: {
        clinical: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          600: "#0d9488",
          700: "#0f766e",
          900: "#134e4a",
        },
      },
      boxShadow: {
        dock: "0 -8px 32px rgba(15,23,42,.12)",
        card: "0 1px 3px rgba(15,23,42,.08)",
      },
    },
  },
  plugins: [],
};
