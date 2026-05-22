/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dino-green": "#5BA942",
        "dino-green-dark": "#3D8B36",
        "dino-orange": "#E67E3F",
        "dino-orange-dark": "#D66424",
        "dino-blue": "#5A8FB8",
        "dino-blue-dark": "#3E6E92",
        "sand-light": "#F2E4C4",
        "sand-base": "#E8D5A8",
        "sand-dark": "#C9AE7D",
        "dino-text": "#3D2E20",
        "dino-text-light": "#6B5544",
      },
      fontFamily: {
        display: ['"Lilita One"', "cursive"],
        body: ['"Nunito"', "sans-serif"],
      },
      animation: {
        "bounce-slow": "bounce 3s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "confetti-fall": "confetti-fall 2s ease-out forwards",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "confetti-fall": {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(720deg)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
