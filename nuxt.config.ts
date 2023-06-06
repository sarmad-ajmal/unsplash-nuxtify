// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Beautiful Free Images & Pictures | Unsplash",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/images/unsplash-logo.svg",
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
