import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        linen: "#F8F4EC",
        cream: "#FFFDF8",
        sage: "#8CA08A",
        olive: "#6D7F63",
        blush: "#F1D6D9",
        petal: "#F7E7E8",
        mauve: "#B497A9",
        dust: "#D8C7D2",
        ink: "#1E2E45",
        navy: "#223656",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        script: ["var(--font-script)", "cursive"],
      },
      boxShadow: {
        paper: "0 16px 40px rgba(34, 54, 86, 0.09), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
      },
      borderRadius: {
        paper: "1.5rem",
      },
      backgroundImage: {
        noise:
          "radial-gradient(circle at 1px 1px, rgba(34, 54, 86, 0.06) 0.7px, transparent 0)",
      },
    },
  },
};

export default config;
