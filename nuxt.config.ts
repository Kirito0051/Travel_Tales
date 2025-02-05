export default defineNuxtConfig({
  devServer: {
    port: 3000,
  },
  devtools: { enabled: false },
  modules: ["@clerk/nuxt"],
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Atma:wght@300;400;500;600;700&family=Boogaloo&family=Edu+AU+VIC+WA+NT+Pre:wght@400..700&family=Playwrite+NG+Modern:wght@100..400&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swaps",
        },
      ],
    },
  },

  compatibilityDate: "2024-12-15",
});
