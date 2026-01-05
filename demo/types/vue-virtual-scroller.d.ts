declare module 'vue-virtual-scroller' {
  import { DefineComponent, Slot } from 'vue'

  export interface RecycleScrollerProps {
    items: any[]
    itemSize?: number | null
    minItemSize?: number | string | null
    keyField?: string
    buffer?: number
    pageMode?: boolean
    prerender?: number
    emitUpdate?: boolean
  }

  export interface DynamicScrollerProps {
    items: any[]
    minItemSize: number | string
    keyField?: string
    buffer?: number
    pageMode?: boolean
    prerender?: number
    emitUpdate?: boolean
  }

  export interface DynamicScrollerItemProps {
    item: any
    active: boolean
    sizeDependencies?: any[]
    dataIndex?: number
  }

  export const RecycleScroller: DefineComponent<RecycleScrollerProps, {}, {}, {}, {}, {}, {}, {
    default?: Slot<{ item: any; index: number; active: boolean }>
  }>
  
  export const DynamicScroller: DefineComponent<DynamicScrollerProps, {}, {}, {}, {}, {}, {}, {
    default?: Slot<{ item: any; index: number; active: boolean }>
  }>
  
  export const DynamicScrollerItem: DefineComponent<DynamicScrollerItemProps>
}
