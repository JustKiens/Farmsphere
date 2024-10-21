import { ISheet } from "../components/common/Drawer"

export type DrawerStoreType = {
  mainSheet: ISheet;
  setMainSheet: (sheet: ISheet) => void;

  activeSheets: ISheet[];
  setActiveSheets: (sheets: ISheet[]) => void;

  isOpen: boolean;
  setOpen: (open: boolean) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  
}

export type ModalStoreType = {

  id: string;
  setId: (id: string) => void;

  isOpen: boolean;
  setOpen: (open: boolean) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  confirmation: string;
  setConfirmation: (confirmation: string) => void;
}