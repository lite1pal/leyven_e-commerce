import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "node_modules/flowbite-react/lib/esm/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      scale: {
        "105": "1.05",
      },
      keyframes: {
        marquee: {
          to: {
            transform: "translateX(-100%)",
          },
        },
        stop: {
          to: {
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "glitch-1": "glitch 4s linear infinite alternate-reverse",
        "glitch-2": "glitch 2s linear infinite alternate-reverse",
        marquee: "marquee 50s linear infinite",
        "dialog-overlay-show": "dialog-overlay-show 0.5s",
        "dialog-overlay-hide": "dialog-overlay-hide 0.5s",
        "shiny-badge-slide": "shiny-badge-slide 6s infinite",
        jiggle: "jiggle 0.6s cubic-bezier(0.85, 0, 0.15, 1)",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("daisyui"),
    require("@tailwindcss/typography"),
  ],
};
export default config;
