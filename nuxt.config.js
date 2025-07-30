import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - bryan-qr-app",
    title: "bryan-qr-app",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/html5-qrcode.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "@nuxtjs/auth-next"],

  auth: {
    redirect: {
      login: "/auth/signin",
      logout: "/auth/signin",
      callback: "/auth/callback",
      home: "/",
    },
    autoFetchUser: false,
    strategies: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "197832014040-95l3elqae2mt555ic3e8uuhb2ute704s.apps.googleusercontent.com",
        scheme: "oauth2",
        endpoints: {
          authorization: "https://accounts.google.com/o/oauth2/auth",
          userInfo: "https://www.googleapis.com/oauth2/v3/userinfo",
        },
        token: {
          property: "access_token",
          type: "Bearer",
          maxAge: 1800,
        },
        responseType: "token id_token",
        scope: ["openid", "profile", "email"],
        redirectUri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/auth/callback",
        codeChallengeMethod: "",
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
