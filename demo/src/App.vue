<script setup lang="ts">
import { ref, h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import VirtualDataTable from './components/VirtualDataTable.vue'
import { ArrowUpDown } from 'lucide-vue-next'

interface Person {
  id: number
  name: string
  email: string
  age: number
  city: string
  company: string
  role: string
  status: string
}

// Generate large dataset
const generateData = (count: number): Person[] => {
  const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George', 'Hannah']
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez']
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose']
  const companies = ['TechCorp', 'InnovateLabs', 'DataSystems', 'CloudWorks', 'WebSolutions', 'MobileDev', 'AITech', 'CyberSec', 'FinTech', 'HealthTech']
  const roles = ['Developer', 'Designer', 'Manager', 'Analyst', 'Engineer', 'Architect', 'Consultant', 'Specialist', 'Director', 'Lead']
  const statuses = ['Active', 'Inactive', 'Pending', 'Suspended']

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
    email: `user${i + 1}@example.com`,
    age: 20 + (i % 50),
    city: cities[i % cities.length] as string,
    company: companies[i % companies.length] as string,
    role: roles[i % roles.length] as string,
    status: statuses[i % statuses.length] as string,
  }))
}

const dataCount = ref(100000) // Start with 100k rows
const data = ref<Person[]>(generateData(dataCount.value))

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
      }, [
        'Name',
        h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })
      ])
    },
    size: 200,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    size: 250,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    size: 80,
  },
  {
    accessorKey: 'city',
    header: 'City',
    size: 150,
  },
  {
    accessorKey: 'company',
    header: 'Company',
    size: 150,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    size: 150,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 100,
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const colorClass = 
        status === 'Active' ? 'text-green-600' :
        status === 'Inactive' ? 'text-gray-600' :
        status === 'Pending' ? 'text-yellow-600' :
        'text-red-600'
      return h('span', { class: colorClass }, status)
    },
  },
]

const updateDataCount = (count: number) => {
  dataCount.value = count
  data.value = generateData(count)
}
</script>

<template>
  <div class="container mx-auto py-10 px-4">
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-2">Vue Virtual Dynamic Scroller Table</h1>
      <p class="text-muted-foreground mb-4">
        A high-performance data table combining vue-virtual-scroller with shadcn-vue components,
        capable of handling millions of rows with dynamic height.
      </p>
      
      <div class="flex gap-4 flex-wrap items-center mb-4">
        <div>
          <label class="text-sm font-medium mr-2">Dataset Size:</label>
          <select 
            v-model.number="dataCount" 
            @change="updateDataCount(dataCount)"
            class="border rounded px-3 py-2 bg-background"
          >
            <option :value="1000">1,000 rows</option>
            <option :value="10000">10,000 rows</option>
            <option :value="100000">100,000 rows</option>
            <option :value="500000">500,000 rows</option>
            <option :value="1000000">1,000,000 rows</option>
          </select>
        </div>
        <div class="text-sm text-muted-foreground">
          Showing {{ data.length.toLocaleString() }} rows
        </div>
      </div>
    </div>

    <VirtualDataTable :columns="columns" :data="data" :min-item-size="57" />
    
    <div class="mt-8 prose prose-sm max-w-none">
      <h2 class="text-2xl font-bold mb-4">Features</h2>
      <ul class="list-disc list-inside space-y-2 text-muted-foreground">
        <li>✅ Virtual scrolling for optimal performance</li>
        <li>✅ Handles millions of rows efficiently</li>
        <li>✅ Dynamic row height support</li>
        <li>✅ Sorting capabilities</li>
        <li>✅ Responsive design with Tailwind CSS</li>
        <li>✅ Built with shadcn-vue components</li>
        <li>✅ Powered by TanStack Table and vue-virtual-scroller</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
}
</style>

