import { create } from 'zustand'
import { ProviderStore } from '../interfaces/ProviderTypes'

export const useProviderStore = create<ProviderStore>((set) => ({
  activePage: 'Home',
  setActivePage: (page) => set({ activePage: page }),

}))
