# Quick Start Guide

This guide will help you integrate the Vue Virtual Dynamic Scroller Table into your existing Vue 3 project.

## Prerequisites

- Vue 3.x
- Node.js 18+
- TypeScript (optional but recommended)

## Step-by-Step Integration

### 1. Install Dependencies

```bash
# Core dependencies
npm install vue-virtual-scroller@next @tanstack/vue-table

# shadcn-vue dependencies
npm install radix-vue class-variance-authority clsx tailwind-merge lucide-vue-next

# Tailwind CSS
npm install -D tailwindcss@^3 postcss autoprefixer
```

### 2. Configure Tailwind CSS

Create or update `tailwind.config.js`:

```js
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
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

Create `postcss.config.js`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Add Tailwind directives to your main CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. Copy Required Components

Copy these files from the demo to your project:

```
src/
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
└── vue-virtual-scroller.d.ts
```

### 4. Create Your Data Model

```typescript
interface MyDataType {
  id: number
  // Add your fields here
  name: string
  status: string
  // ...
}
```

### 5. Define Columns

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

### 6. Use the Component

```vue
<script setup lang="ts">
import { ref } from 'vue'
import VirtualDataTable from '@/components/VirtualDataTable.vue'
import type { ColumnDef } from '@tanstack/vue-table'

// Your data type
interface MyDataType {
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
