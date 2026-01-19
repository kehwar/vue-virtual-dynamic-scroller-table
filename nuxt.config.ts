// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  extends: ['./demo'],
  
  css: ['./demo/assets/css/main.css'],
  
  app: {
    baseURL: '/vue-virtual-dynamic-scroller-table/',
    head: {
      title: 'Vue Virtual Dynamic Scroller Table',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A high-performance data table combining vue-virtual-scroller with shadcn-vue components' }
      ]
    }
  }
})
