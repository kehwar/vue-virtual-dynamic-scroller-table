# Quick Start Guide

This guide will help you integrate the Vue Virtual Dynamic Scroller Table into your existing **Nuxt 4** project.

## Prerequisites

- Nuxt 4.x
- Node.js 18+
- TypeScript (recommended)

## Step-by-Step Integration for Nuxt 4

### 1. Install Dependencies

```bash
# Core dependencies
npm install vue-virtual-scroller@next @tanstack/vue-table --legacy-peer-deps

# shadcn-vue dependencies
npm install radix-vue class-variance-authority clsx tailwind-merge lucide-vue-next

# Tailwind CSS module for Nuxt
npm install -D @nuxtjs/tailwindcss

# shadcn-nuxt module (recommended for Nuxt integration)
npm install -D shadcn-nuxt
```

### 2. Configure Nuxt

Update `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  
  app: {
    head: {
      title: 'Your App Title',
    }
  },
  
  css: ['~/assets/css/main.css'],
  
  typescript: {
    typeCheck: false,
    tsConfig: {
      include: ['types/**/*.d.ts']
    }
  }
})
```

> **Note:** The `shadcn-nuxt` module provides better Nuxt integration with auto-imports and CLI tooling for managing shadcn-vue components. It simplifies component management and ensures compatibility with Nuxt's build system.

### 3. Configure Tailwind CSS

Create `tailwind.config.js`:

```js
export default {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Add other shadcn-vue color variables...
      },
    },
  },
  plugins: [],
}
```

Create `assets/css/main.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* Add other CSS variables... */
  }
}
```

### 4. Create shadcn-vue Configuration (Optional)

Create `components.json` for shadcn-vue CLI support:

```json
{
  "$schema": "https://www.shadcn-vue.com/schema.json",
  "style": "default",
  "typescript": true,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "assets/css/main.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "framework": "nuxt",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "componentDir": "./components/ui"
}
```

This allows you to use the shadcn-vue CLI to add or update components:

```bash
npx shadcn-vue@latest add button
```

### 5. Create Plugin for vue-virtual-scroller

Create `plugins/vue-virtual-scroller.client.ts`:

```typescript
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

export default defineNuxtPlugin(() => {
  // Vue virtual scroller CSS loaded globally
})
```

### 6. Copy Required Components

Copy these files/directories to your Nuxt project:

```
├── components/
│   ├── VirtualDataTable.vue
│   └── ui/table/
│       ├── Table.vue
│       ├── TableBody.vue
│       ├── TableCell.vue
│       ├── TableHead.vue
│       ├── TableHeader.vue
│       ├── TableRow.vue
│       └── index.ts
├── lib/
│   └── utils.ts
└── types/
    └── vue-virtual-scroller.d.ts
```

### 7. Create Type Definitions

Create `types/vue-virtual-scroller.d.ts`:

```typescript
declare module 'vue-virtual-scroller' {
  import { DefineComponent, Slot } from 'vue'

  export interface DynamicScrollerProps {
    items: any[]
    minItemSize: number | string
    keyField?: string
  }

  export const DynamicScroller: DefineComponent<DynamicScrollerProps, {}, {}, {}, {}, {}, {}, {
    default?: Slot<{ item: any; index: number; active: boolean }>
  }>
  
  export const DynamicScrollerItem: DefineComponent<any>
}
```

### 8. Create Your Data Model

```typescript
interface MyDataType {
  id: number
  // Add your fields here
  name: string
  status: string
  // ...
}
```

### 9. Define Columns

```typescript
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'

const columns: ColumnDef<MyDataType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 80,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h('button', {
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        class: 'flex items-center gap-2 hover:text-foreground',
      }, [
        'Name',
        h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })
      ])
    },
    size: 200,
  },
  // Add more columns...
]
```

### 10. Use the Component in Your Nuxt App

In your `app.vue` or any page:

```vue
<script setup lang="ts">
import { ref, h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'

// Your data type
interface MyDataType {
  id: number
  name: string
}

// Your columns
const columns: ColumnDef<MyDataType>[] = [
  { accessorKey: 'id', header: 'ID', size: 80 },
  {
    accessorKey: 'name',
    header: ({ column }) => h('button', {
      onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
    }, ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
  },
]

// Your data
const data = ref<MyDataType[]>([/* your data */])
</script>

<template>
  <div class="container mx-auto py-10">
    <ClientOnly>
      <VirtualDataTable 
        :columns="columns" 
        :data="data" 
        :min-item-size="57" 
      />
      <template #fallback>
        <div class="flex items-center justify-center h-96">
          <p>Loading table...</p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>
```

**Important:** Always wrap `VirtualDataTable` in `<ClientOnly>` to avoid SSR hydration issues with the virtual scroller.
  id: number
  name: string
}

// Your columns
const columns: ColumnDef<MyDataType>[] = [
  // ... column definitions
]

// Your data
const data = ref<MyDataType[]>([
  // ... your data
])
</script>

<template>
  <div class="container mx-auto py-10">
    <VirtualDataTable 
      :columns="columns" 
      :data="data" 
      :min-item-size="57" 
    />
  </div>
</template>
```

## Customization Examples

### Custom Cell Rendering

```typescript
{
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const status = row.getValue('status') as string
    const colorMap = {
      active: 'text-green-600',
      inactive: 'text-gray-600',
      pending: 'text-yellow-600',
    }
    return h('span', { 
      class: colorMap[status] || 'text-gray-600' 
    }, status)
  },
}
```

### Adjust Virtual Scroller Height

Modify the `.scroller` class in `VirtualDataTable.vue`:

```css
.scroller {
  height: 800px; /* Your desired height */
  width: 100%;
  overflow-y: auto;
}
```

### Change Row Height

Pass a different `minItemSize`:

```vue
<VirtualDataTable 
  :columns="columns" 
  :data="data" 
  :min-item-size="70" 
/>
```

## Performance Tips

1. **Use Fixed Widths**: Define explicit `size` for columns to improve rendering performance
2. **Minimize Cell Computation**: Avoid complex calculations in cell renderers
3. **Memoize Data**: Use `computed()` for derived data
4. **Debounce Filters**: If adding search/filter, debounce user input
5. **Virtual Column Headers**: For very wide tables with many columns, consider virtualizing horizontally

## Common Issues

### Issue: Virtual scroller not rendering properly
**Solution**: Ensure the parent container has a defined height or the scroller has a fixed height.

### Issue: Sorting doesn't work
**Solution**: Make sure you've imported `getSortedRowModel` and added it to the `useVueTable` config.

### Issue: TypeScript errors with vue-virtual-scroller
**Solution**: Copy the `vue-virtual-scroller.d.ts` file to your `src` directory.

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## Need Help?

Check out the full demo at: https://kehwar.github.io/vue-virtual-dynamic-scroller-table/

Or review the complete source code in the repository.
