/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "earie-black": "#18181B",
        onyx: "#3F3F46",
        "baby-powder": "#FAFAF7",
        "robin-egg-blue": "#11C5C6",
        "jungle-green": "#199E74",
      },
      maxWidth: {
        "50%": "50%",
        "55%": "55%",
        "60%": "60%",
        "65%": "65%",
        "70%": "70%",
        "75%": "75%",
        "80%": "80%",
        "85%": "85%",
      },
    },
  },
  plugins: [],
};
