module.exports = {
  content: [
    // your content files
    "./pages/**/*.{js,ts,vue}",
    "./components/**/*.{js,ts,vue}",
    "./layouts/**/*.{js,ts,vue}",
    "./plugins/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        atma: ["Atma", "sans-serif"],
        bob: ["Boogaloo", "sans-serif"],
        eduAU: ["Edu AU VIC WA NT Pre", "sans-serif"],
        playwrite: ["Playwrite NG Modern", "sans-serif"],
        sourGummy: ["Sour Gummy", "sans-serif"],
        lobster: ["Lobster", "cursive"],
        sriracha: ["Sriracha", "cursive"],
      },
    },
  },
  plugins: [],
};
