import { defineNuxtConfig } from "nuxt/config";
import { resolve } from "path";
import projectConfig from "./project_config.json";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: projectConfig.title,
      meta: [
        { name: "description", content: projectConfig.description },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:site_name", content: projectConfig.title },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: 'og:title', property: 'og:title', content: projectConfig.title },
        { hid: 'og:description', property: 'og:description', content: projectConfig.description },
        { hid: 'og:image', property: 'og:image', content: projectConfig.image },
        { hid: 'og:url', property: 'og:url', content: projectConfig.url },
        { name: "twitter:image", content: projectConfig.image },
        { name: "twitter:image:alt", content: projectConfig.title },
        { name: "twitter:description", content: projectConfig.title }
      ],
      script: [],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "stylesheet", href: "https://use.typekit.net/tsd2tcy.css" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",
        },
      ],
    },
  },

  css: ["@/public/css/styles.css"],

  components: {
    dirs: ["~/components"],
  },

  modules: ["@nuxt/content", "nuxt-simple-sitemap", "@nuxtjs/robots"],

  build: {
    postcss: {
      plugins: {
        "postcss-import": {},
      },
    },
  },

  compatibilityDate: "2024-11-13",
});
