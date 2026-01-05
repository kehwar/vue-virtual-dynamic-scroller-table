# Vue Virtual Dynamic Scroller Table

A high-performance Vue 3 data table implementation combining [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller) with [shadcn-vue](https://www.shadcn-vue.com/) components and [TanStack Table](https://tanstack.com/table), capable of handling millions of rows with dynamic height and smooth scrolling performance. **Built with Nuxt 4** for enhanced performance and modern development experience.

## 🚀 Demo

Visit the live demo: [https://kehwar.github.io/vue-virtual-dynamic-scroller-table/](https://kehwar.github.io/vue-virtual-dynamic-scroller-table/)

![Vue Virtual Dynamic Scroller Table Demo](https://github.com/user-attachments/assets/ca5577f0-c1e4-4518-9b72-6ede42331852)

## ✨ Features

- ✅ **Virtual Scrolling** - Renders only visible rows for optimal performance
- ✅ **Handles Millions of Rows** - Efficiently manages large datasets without performance degradation
- ✅ **Dynamic Row Height** - Automatically adjusts to content height
- ✅ **Sorting Capabilities** - Built-in column sorting support
- ✅ **Responsive Design** - Styled with Tailwind CSS for modern, responsive UI
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Customizable** - Easy to extend and customize with shadcn-vue components
- ✅ **Built on Nuxt 4** - Leverages Nuxt's auto-imports, file-based routing, and optimized build system

## 📦 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Nuxt** | 4.2.2 | Meta-framework for Vue with SSR/SSG |
| **Vue** | 3.5.26 | Progressive JavaScript framework |
| **TypeScript** | 5.9 | Type-safe development |
| **TanStack Table** | 8.x | Headless UI for building powerful tables |
| **vue-virtual-scroller** | 2.0-beta | Virtual scrolling component for Vue |
| **shadcn-vue** | Latest | Re-usable components built with Radix Vue |
| **Tailwind CSS** | 3.x | Utility-first CSS framework |

## 🎯 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kehwar/vue-virtual-dynamic-scroller-table.git
cd vue-virtual-dynamic-scroller-table/demo
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production (SSG):
```bash
npm run generate
```

5. Preview production build:
```bash
npx serve .output/public
```

## 📖 Implementation Guide

### 1. Install Required Dependencies

```bash
npm install vue-virtual-scroller @tanstack/vue-table
npm install radix-vue class-variance-authority clsx tailwind-merge lucide-vue-next
npm install -D tailwindcss@^3 postcss autoprefixer
```

### 2. Configure Tailwind CSS

Create `tailwind.config.js`:

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
        // ... add shadcn-vue color variables
      },
    },
  },
  plugins: [],
}
```

### 3. Create the Virtual Data Table Component

Create `src/components/VirtualDataTable.vue`:

```vue
<script setup lang="ts" generic="TData, TValue">
import { computed, ref } from 'vue'
import type { ColumnDef, SortingState, ColumnFiltersState } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

interface DataTableProps {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  minItemSize?: number
}

const props = withDefaults(defineProps<DataTableProps>(), {
  minItemSize: 57,
})

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])

const table = useVueTable({
  get data() { return props.data },
  get columns() { return props.columns },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: updaterOrValue => {
    sorting.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(sorting.value)
      : updaterOrValue
  },
  onColumnFiltersChange: updaterOrValue => {
    columnFilters.value = typeof updaterOrValue === 'function'
      ? updaterOrValue(columnFilters.value)
      : updaterOrValue
  },
  state: {
    get sorting() { return sorting.value },
    get columnFilters() { return columnFilters.value },
  },
})

const rows = computed(() => table.getRowModel().rows)
</script>

<template>
  <div class="w-full">
    <div class="rounded-md border bg-background">
      <!-- Header -->
      <div class="border-b">
        <div
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
          class="flex w-full"
        >
          <div
            v-for="header in headerGroup.headers"
            :key="header.id"
            class="h-12 px-4 text-left align-middle font-medium text-muted-foreground flex items-center"
            :style="{ 
              width: `${header.getSize()}px`,
              minWidth: `${header.getSize()}px`,
              flexShrink: 0
            }"
          >
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </div>
        </div>
      </div>

      <!-- Virtual Scrolled Body -->
      <DynamicScroller
        v-if="rows.length"
        :items="rows"
        :min-item-size="minItemSize"
        key-field="id"
        class="scroller"
      >
        <template #default="{ item: row, index, active }">
          <DynamicScrollerItem
            :item="row"
            :active="active"
            :data-index="index"
            :size-dependencies="[row.id]"
          >
            <div class="flex w-full border-b transition-colors hover:bg-muted/50">
              <div
                v-for="cell in row.getVisibleCells()"
                :key="cell.id"
                class="p-4 align-middle flex items-center"
                :style="{ 
                  width: `${cell.column.getSize()}px`,
                  minWidth: `${cell.column.getSize()}px`,
                  flexShrink: 0
                }"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </div>
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>

      <!-- Empty state -->
      <div v-else class="h-24 text-center flex items-center justify-center text-muted-foreground">
        No results.
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroller {
  height: 600px;
  width: 100%;
  overflow-y: auto;
}
</style>
```

### 4. Define Column Structure

```typescript
import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'

interface Person {
  id: number
  name: string
  email: string
  age: number
  // ... more fields
}

const columns: ColumnDef<Person>[] = [
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
      }, ['Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    size: 200,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 250,
  },
  // ... more columns
]
```

### 5. Use the Component

```vue
<template>
  <VirtualDataTable :columns="columns" :data="data" :min-item-size="57" />
</template>

<script setup lang="ts">
import VirtualDataTable from './components/VirtualDataTable.vue'

const data = ref<Person[]>(generateLargeDataset(100000))
</script>
```

## 🎨 Customization

### Adjust Virtual Scroller Height

Modify the `.scroller` class in the component:

```css
.scroller {
  height: 800px; /* Change to desired height */
  width: 100%;
  overflow-y: auto;
}
```

### Change Minimum Item Size

Pass a different `minItemSize` prop:

```vue
<VirtualDataTable :columns="columns" :data="data" :min-item-size="70" />
```

### Custom Cell Rendering

Use the `cell` property in column definitions:

```typescript
{
  accessorKey: 'status',
  header: 'Status',
  cell: ({ row }) => {
    const status = row.getValue('status') as string
    const colorClass = status === 'Active' ? 'text-green-600' : 'text-gray-600'
    return h('span', { class: colorClass }, status)
  },
}
```

## 🔧 Performance Tips

1. **Use Fixed Row Heights**: If all rows have the same height, consider using `RecycleScroller` instead of `DynamicScroller`
2. **Optimize Column Rendering**: Avoid complex computations in cell renderers
3. **Virtualize Columns**: For very wide tables, consider implementing horizontal virtualization
4. **Debounce Filters**: If implementing search/filter, debounce user input
5. **Memoize Data**: Use `computed` or `useMemo` for derived data

## 📚 API Reference

### VirtualDataTable Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `ColumnDef<TData, TValue>[]` | required | Column definitions |
| `data` | `TData[]` | required | Array of data items |
| `minItemSize` | `number` | `57` | Minimum height of each row in pixels |

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT

## 🙏 Acknowledgments

- [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller) by Guillaume Chau
- [shadcn-vue](https://www.shadcn-vue.com/) by Radix Vue team
- [TanStack Table](https://tanstack.com/table) by Tanner Linsley