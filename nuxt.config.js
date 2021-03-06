import pkg from './package';

export default {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Mico & Grace | You\'re invited!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Cormorant+Garamond:400,400i,700|Pinyon+Script|Adora+Bouton:400'},
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: '@/components/Loading.vue',

  /*
   ** Global CSS
   */
  css: [
    '@/assets/custom.scss',
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    {src: "~/plugins/full-page.client"},
    {src: "~/plugins/google-maps.client"},
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    '@bazzite/nuxt-optimized-images',
    '@nuxtjs/axios',
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    '@nuxtjs/pwa',
    'nuxt-fullpage.js',
  ],

  optimizedImages: {
    optimizeImages: true
  },

  axios: {
    proxyHeaders: false,
    credentials: false
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          exclude: /(node_modules)/
        })
      }
    },
    transpile: [/^vue2-google-maps($|\/)/],
  },
}
