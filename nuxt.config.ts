// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@vuestic/nuxt", 
    "@pinia/nuxt", 
    "@sidebase/nuxt-auth", 
    "@nuxtjs/tailwindcss"
  ],
  runtimeConfig: {
    passwordSecret: process.env.PASSWORD_SECRET,
    tokenExpireTime: process.env.TOKEN_EXPIRE_TIME,
  },
  auth: {
    baseURL: "http://localhost:3000",
    provider: {
      type: "refresh",
      endpoints: {
        signIn: {
          path: "/signin",
          method: "post",
        },
        signOut: {
          path: "/signout",
          method: "post",
        },
        signUp: {
          path: "/signup",
          method: "post", 
        },
        getSession: {
          path: "/session",
          method: "get",
        },
        refresh: {
          path: "/refresh",
          method: "post",
        }
      },
      token: {
        signInResponseTokenPointer: "/token/accessToken"
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: "/token/refreshToken"
      },
      sessionDataType: {
        id: 'number',
        email: 'string',
      }
    },
  },
  vuestic: {
    config: {
      // Config here
    },
  },
})
