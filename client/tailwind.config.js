export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "min-full-1000": "min(1000px, 100%)",
        "min-full-800": "min600px, 100%)",
        "min-full-600": "min(600px, 100%)",
        "min-full-400": "min(400px, 100%)",
        "min-full-300": "min(300px, 100%)",
        "min-full-200": "min(200px, 100%)",
        "min-half-1000": "min(1000px, 50%)",
        "min-half-800": "min600px, 50%)",
        "min-half-600": "min(600px, 50%)",
        "min-half-400": "min(400px, 50%)",
        "min-half-200": "min(200px, 50%)",
      },
    },
  },
  plugins: [require("daisyui")],
};
