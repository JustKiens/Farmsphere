import { create } from 'zustand'
import { DrawerStoreType } from '../interfaces/StoreTypes'

export const useDrawerStore = create<DrawerStoreType>((set) => ({
  
  mainSheet: { name: '', component: null },
  setMainSheet: (sheet) => set({ mainSheet: sheet }),
  
  activeSheets: [],
  setActiveSheets: (sheets) => set({ activeSheets: sheets }),
  
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}))
