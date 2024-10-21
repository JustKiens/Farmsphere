
import Document2Icon from "../../icons/linear/Document2Icon";
import MapIcon from "../../icons/linear/MapIcon";
import SpeedometerIcon from "../../icons/linear/SpeedometerIcon";
import UsersIcon from "../../icons/linear/UsersIcon";
import AdminSideBarButton from "./AdminSideBarButton"


const AdminSidebar = () => {

  return (
    <aside className='w-[16rem] h-full flex flex-col items-start justify-start  flex-shrink-0 border-r border-gray-200'>
      <section className="px-6 pt-6 w-full">
        <div className="ring-1 ring-gray-200 w-full rounded-md py-2 px-4 flex items-center justify-start gap-4">
          <MapIcon className="w-6 h-6 stroke-1 stroke-gray-900"/>
          <div>
            <p className="text-sm text-gray-900 font-medium">Region 3</p>
            <p className="text-xs text-gray-500">Central Luzon</p>
          </div>
        </div> 
      </section>
      <section className="p-6 flex flex-col items-start justify-start gap-4 w-full flex-1">
        <div className="w-full flex flex-col items-start justify-start mt-2">
          <label className="text-xs font-medium tracking-wider text-gray-500 mb-2 ">MAIN MENU</label>
          <AdminSideBarButton icon={<SpeedometerIcon />} name="Dashboard" />
          <AdminSideBarButton icon={<Document2Icon />} name="Requests" />
          <AdminSideBarButton icon={<UsersIcon />} name="Providers" />

        </div>
      </section>
    </aside>
  )
}

export default AdminSidebar