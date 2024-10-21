import { create } from 'zustand'
import { AdminStoreType } from '../interfaces/AdminTypes'

export const useAdminStore = create<AdminStoreType>((set) => ({
  activePage: 'dashboard',
  setActivePage: (page) => set({ activePage: page }),

  providerTab: 'active',
  setProviderTab: (tab) => set({ providerTab: tab }),

  accountTab: 'profile',
  setAccountTab: (tab) => set({ accountTab: tab }),
}))
