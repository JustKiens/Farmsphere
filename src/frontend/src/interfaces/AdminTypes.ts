
export type AdminStoreType = {
  activePage: string;
  setActivePage: (page: string) => void;

  providerTab: string;
  setProviderTab: (tab: string) => void;

  accountTab: string;
  setAccountTab: (tab: string) => void;

}



export type Crop = {
  name: string;
  quantity: number;
  price: number;
  province: string;
  type: string;
}