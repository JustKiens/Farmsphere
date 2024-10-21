import { Account } from "./AccountType";


export type Stocks = {
  id: string;
  name: string;
  price?: number;
  quantity?: number;
  type: string;
}

export type RequestData = {
  _id: string;
  stockAccountId: Account
  stockLevelNotes: string;
  stockLevelDate: Date;
  stockLevelVegetables: Stocks[]
  stockLevelFruits: Stocks[]
  stockLevelStatus: string;
}


export type ProviderStore = {
  activePage: 'Home' | 'Settings';
  setActivePage: (page: 'Home' | 'Settings') => void;
}