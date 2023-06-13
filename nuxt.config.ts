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

  pages: true,

  css: [
    "vuetify/lib/styles/main.sass",
    "/assets/main.scss",
    "/assets/overrides.scss",
  ],

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },

  runtimeConfig: {
    public: {
      unsplashAccessKey: process.env.UNSPLASH_ACCESS_KEY,
      unsplashBaseUrl: "https://api.unsplash.com/",
    },
  },

  debug: true,

  devtools: {
    enabled: true,
  },
  modules: ["@pinia/nuxt"],
});
