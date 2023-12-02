import type { Config } from "tailwindcss";
import type { Config as DaisyUIConfig } from "daisyui";

const config: Config & { daisyui?: DaisyUIConfig } = {
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#38bdf8",

          secondary: "#6366f1",

          accent: "#1FB2A6",

          neutral: "#191D24",

          "base-100": "#2A303C",

          info: "#67e8f9",

          success: "#38bdf8",

          warning: "#FBBD23",

          error: "#F87272",
        },
      },
    ],
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        BebasNeue: ["Bebas Neue", "cursive"],
      },
      backgroundImage: {
        gradienta: "url('/src/assets/bg1.jpg')",
        gradientb: "url('/src/assets/bg2.jpg')",
      },
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
export default config;
