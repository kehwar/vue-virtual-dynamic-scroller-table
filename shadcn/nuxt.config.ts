// https://nuxt.com/docs/api/configuration/nuxt-config
// This is a Nuxt layer configuration for shadcn upstream components
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  
  typescript: {
    typeCheck: false,
  },
  
  vite: {
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  }
})
