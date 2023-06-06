// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          href: "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap",
          rel: "stylesheet",
        },
      ],
    },
  },
  css: ["vuetify/lib/styles/main.sass", "/assets/main.scss"],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  runtimeConfig: {
    unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
    unsplashSecretKey: process.env.UNSPLASH_SECRET_KEY,
    public: {
      unsplashBaseUrl: "https://api.unsplash.com/",
    },
  },
});
