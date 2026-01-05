<script setup lang="ts" generic="TData, TValue">
import { computed, ref } from 'vue'
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useVueTable,
} from '@tanstack/vue-table'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'

interface DataTableProps {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  minItemSize?: number
  emitUpdate?: boolean
}

const props = withDefaults(defineProps<DataTableProps>(), {
  minItemSize: 57,
  emitUpdate: false,
})

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return props.columns
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  onSortingChange: updaterOrValue => {
    sorting.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(sorting.value)
        : updaterOrValue
  },
  onColumnFiltersChange: updaterOrValue => {
    columnFilters.value =
      typeof updaterOrValue === 'function'
        ? updaterOrValue(columnFilters.value)
        : updaterOrValue
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
  },
})

const rows = computed(() => table.getRowModel().rows)

defineExpose({
  table,
})
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
            <div
              :data-state="row.getIsSelected() && 'selected'"
              class="flex w-full border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
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
