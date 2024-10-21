import { useDrawerStore } from "../../../stores/DrawerStore"
import { Drawer } from "../../common/Drawer"

import PlusIcon from "../../../icons/linear/PlusIcon"
import Button from "../../common/Button"
import RequestDataForm from "../forms/RequestDataForm"
import ProviderStocksTable from "../tables/ProviderStocksTable"


const ProviderDataOutlet = () => {


  const mainSheet = useDrawerStore((state) => state.mainSheet)
  const setMainSheet = useDrawerStore((state) => state.setMainSheet)
  const isOpen = useDrawerStore((state) => state.isOpen)
  const setOpen = useDrawerStore((state) => state.setOpen)
  const activeSheets = useDrawerStore((state) => state.activeSheets)

  const handleOpen = () => {
    setMainSheet({name: "MainSheet1", component: <RequestDataForm />})
    setOpen(true)
  }


  return (
    <main className="h-full bg-white flex flex-col w-full">
      <Drawer 
        mainSheet={mainSheet}
        isOpen={isOpen}
        activeSheets={activeSheets}
      />
      <header className="flex items-center justify-between p-6 w-full">
        <div
          className="flex items-start justify-center gap-4 "
        >
          <h1 className="text-2xl font-medium tracking-tight text-gray-900">Data</h1>
        </div>
        <div className="flex items-center justify-center gap-4 ">
          <Button 
            variant="primary"
            onClick={handleOpen}
          >
            <PlusIcon className="stroke-2 stroke-white" />
            Request Data
          </Button>
        </div>
      </header>
      <section className="flex-grow overflow-y-scroll overflow-x-hidden ">
        <ProviderStocksTable />
      </section>
    </main>  
  )
}

export default ProviderDataOutlet