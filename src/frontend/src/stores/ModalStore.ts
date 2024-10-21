import { create } from 'zustand'
import { ModalStoreType } from '../interfaces/StoreTypes'

export const useModalStore = create<ModalStoreType>((set) => ({
  
  isOpen: false,
  setOpen: (open) => set({ isOpen: open }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  confirmation: '',
  setConfirmation: (confirmation) => set({ confirmation }),

  id: '',
  setId: (id) => set({ id }),
}))
