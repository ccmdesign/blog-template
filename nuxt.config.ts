import { defineNuxtConfig } from "nuxt/config";
import { resolve } from "path";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Blog Template",
      meta: [
        { name: "description", content: "Blog Template" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: 'og:site_name',  content: 'Blog Template'},
        { property: 'og:title',  content: 'Blog Template'},
        { property: 'og:description',  content: 'Blog Template'},
        { property: 'og:image',  content: '/images/OG.jpg'},
        { property: 'og:image:alt',  content: 'Page image for Blog Template'},
        { name: 'twitter:image',  content: '/images/OG.jpg'},
        { name: 'twitter:image:alt',  content: 'Blog Template'},
        { name: 'twitter:description', content: 'Blog Template' }
      ],
      script: [],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: "stylesheet", href: "https://use.typekit.net/tsd2tcy.css" },
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",
        },
      ],
    }
  },
  css: [
    '@/public/css/theme.css',
    '@/public/css/styles.css',
  ],
  components: {
    "dirs": [
      "~/components"
    ]
  },
  modules: [
    '@nuxt/content',
    'nuxt-simple-sitemap',
    '@nuxtjs/robots'
  ],
  build: {
    postcss: {
      plugins: {
        'postcss-import': {},
      }
    }
  }
});
