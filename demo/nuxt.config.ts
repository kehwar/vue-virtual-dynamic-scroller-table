// https://nuxt.com/docs/api/configuration/nuxt-config
// This is a Nuxt layer configuration
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  
  css: ['~/assets/css/main.css'],
  
  typescript: {
    typeCheck: false,
    tsConfig: {
      include: ['types/**/*.d.ts']
    }
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
