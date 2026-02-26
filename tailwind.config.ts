import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glitch: {
          "0%": { clipPath: "inset(20% 0 50% 0)" } as any,
          "5%": { clipPath: "inset(10% 0 60% 0)" } as any,
          "10%": { clipPath: "inset(15% 0 55% 0)" } as any,
          "15%": { clipPath: "inset(25% 0 35% 0)" } as any,
          "20%": { clipPath: "inset(30% 0 40% 0)" } as any,
          "25%": { clipPath: "inset(40% 0 20% 0)" } as any,
          "30%": { clipPath: "inset(10% 0 60% 0)" } as any,
          "35%": { clipPath: "inset(15% 0 55% 0)" } as any,
          "40%": { clipPath: "inset(25% 0 35% 0)" } as any,
          "45%": { clipPath: "inset(30% 0 40% 0)" } as any,
          "50%": { clipPath: "inset(20% 0 50% 0)" } as any,
          "55%": { clipPath: "inset(10% 0 60% 0)" } as any,
          "60%": { clipPath: "inset(15% 0 55% 0)" } as any,
          "65%": { clipPath: "inset(25% 0 35% 0)" } as any,
          "70%": { clipPath: "inset(30% 0 40% 0)" } as any,
          "75%": { clipPath: "inset(40% 0 20% 0)" } as any,
          "80%": { clipPath: "inset(20% 0 50% 0)" } as any,
          "85%": { clipPath: "inset(10% 0 60% 0)" } as any,
          "90%": { clipPath: "inset(15% 0 55% 0)" } as any,
          "95%": { clipPath: "inset(25% 0 35% 0)" } as any,
          "100%": { clipPath: "inset(30% 0 40% 0)" } as any,
        },
      },
      animation: {
        "glitch-after": "glitch var(--after-duration) infinite linear alternate-reverse",
        "glitch-before": "glitch var(--before-duration) infinite linear alternate-reverse",
      },
    },
  },
  plugins: [],
};

export default config;