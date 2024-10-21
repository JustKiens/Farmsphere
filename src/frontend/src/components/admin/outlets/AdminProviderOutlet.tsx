
import { Drawer } from "../../common/Drawer"
import { useDrawerStore } from "../../../stores/DrawerStore"
import { useAdminStore } from "../../../stores/AdminStore"
import PlusIcon from "../../../icons/linear/PlusIcon"
import Button from "../../common/Button"
import AdminLinkButton from "../AdminLinkButton"
import AdminProviderTable from "../tables/AdminProviderTable"
import AdminDisabledProviderTable from "../tables/AdminDisabledProviderTable"
import AddProviderForm from "../forms/AddProviderForm"

const AdminProviderOutlet = () => {

  const providerTab = useAdminStore((state) => state.providerTab)
  const setProviderTab = useAdminStore((state) => state.setProviderTab)


  const mainSheet = useDrawerStore((state) => state.mainSheet)
  const setMainSheet = useDrawerStore((state) => state.setMainSheet)
  const isOpen = useDrawerStore((state) => state.isOpen)
  const setOpen = useDrawerStore((state) => state.setOpen)
  const activeSheets = useDrawerStore((state) => state.activeSheets)


  const handleOpen = () => {
    setMainSheet({name: "MainSheet1", component: <AddProviderForm />})
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
        <div className="flex items-start justify-center gap-4 ">
          <AdminLinkButton 
            isActive={providerTab === "active"}
            onClick={() => setProviderTab("active")}
          >
            Active
          </AdminLinkButton>

          <AdminLinkButton 
            isActive={providerTab === "disabled"}
            onClick={() => setProviderTab("disabled")}
          >
            Disabled
          </AdminLinkButton>
        </div>
        <div className="flex items-center justify-center gap-4 ">
          <Button 
            variant="primary"
            onClick={handleOpen}
          >
            <PlusIcon className="stroke-2 stroke-white" />
            Add Provider
          </Button>
        </div>
      </header>

      <section className="flex-grow overflow-y-scroll overflow-x-hidden">
        {providerTab === "active" && <AdminProviderTable />}
        {providerTab === "disabled" && <AdminDisabledProviderTable />}
      </section>
    </main>  
  )
}

export default AdminProviderOutlet