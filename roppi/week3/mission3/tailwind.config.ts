
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        customPurple: "#dda5e3",
      },
    },
   
  },
  plugins: [],
};

export default config;
