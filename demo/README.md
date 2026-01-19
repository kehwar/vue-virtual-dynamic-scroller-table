# Vue Virtual Dynamic Scroller Table - Nuxt Layer

This is a **Nuxt Layer** that provides reusable components for building high-performance virtual scrolling data tables.

## What's Included

This layer provides:

- **`VirtualDataTable.vue`** - Main virtual scrolling table component
- **shadcn-vue UI components** - Table components and utilities
- **Plugins** - Vue Virtual Scroller CSS loader
- **Type definitions** - TypeScript support for vue-virtual-scroller
- **Tailwind configuration** - Pre-configured theme with shadcn-vue colors
- **Utilities** - Helper functions for component styling

## Using This Layer

### In This Project

The root directory extends this layer. To run the demo:

```bash
cd ..
npm install --legacy-peer-deps
npm run dev
```

### In Your Own Nuxt Project

1. Copy this `demo` folder to your project (or add as a git submodule)

2. Update your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  extends: ['./demo'], // path to this layer
  // ... your other config
})
```

3. The layer's components will be automatically available:

```vue
<template>
  <VirtualDataTable :columns="columns" :data="data" />
</template>
```

## Layer Structure

```
demo/
├── components/          # Auto-imported components
│   ├── VirtualDataTable.vue
│   └── ui/             # shadcn-vue components
├── lib/                # Utility functions
│   └── utils.ts
├── plugins/            # Nuxt plugins
│   └── vue-virtual-scroller.client.ts
├── assets/             # Styles
│   └── css/main.css
├── types/              # TypeScript definitions
│   └── vue-virtual-scroller.d.ts
├── nuxt.config.ts      # Layer configuration
└── package.json        # Layer dependencies
```

## Configuration

This layer configures:
- **@nuxtjs/tailwindcss** - Tailwind CSS integration
- **shadcn-nuxt** - shadcn-vue component management
- **TypeScript** - Type checking and definitions
- **Vite** - Vue script setup features

## Learn More

For more information about Nuxt Layers, check out the [Nuxt documentation](https://nuxt.com/docs/guide/going-further/layers).
