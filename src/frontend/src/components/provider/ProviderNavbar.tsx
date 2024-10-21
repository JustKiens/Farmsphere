import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../services/AccountServices"
import { useRef, useState } from "react"
import { useAccount } from "../../hooks/useAccount"
import PopOver from "../common/PopOver"
import ChevronIcon from "../../icons/linear/ChevronIcon"
import DoorIcon from "../../icons/linear/DoorIcon"
import { SettingsIcon } from "lucide-react"

const ProviderNavbar = () => {

  const { data: account, isError, isLoading } = useAccount()
  const navigate = useNavigate()
  const anchorRef = useRef(null)
  const [isOpen, setOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>


  const fullName = 
    (account?.accountFullName.firstName || '') + ' ' +
    (account?.accountFullName.middleName.charAt(0) + "." || '') + ' ' + 
    (account?.accountFullName.lastName || '') + ' ' +
    (account?.accountFullName.suffixName || '');

  return (
    <nav
      className="z-10 w-full h-20 px-2 sm:px-6 flex items-center justify-between bg-white ring-1 ring-gray-200"
    >
      <section>
        <h1 
          className="text-2xl font-medium tracking-tight text-green-500" 
        >
          Farm
          <span className="text-gray-900">Sphere</span>
        </h1>
      </section>
      <section className="flex items-end justify-center ">
        <div className=" flex items-center justify-end gap-4 flex-shrink-0">
          <img src={account?.accountAvatar} alt="Admin Image" className="rounded-full w-9 h-9 flex-shrink-0 object-cover" />
          <div className=" flex flex-col items-start justify-start ">
            <p className="text-sm text-gray-700 font-medium tracking-tight">{fullName}</p>
            <p className="text-xs text-gray-500">Data Provider</p>
          </div>
          <div 
            className="relative cursor-pointer flex items-center justify-center"
            ref={anchorRef}
            onClick={() => setOpen((prev) => !prev)}
          >
            <ChevronIcon className=" stroke-1 stroke-gray-500"/>
            <PopOver
              anchorRef={anchorRef}
              isOpen={isOpen}
              onClose={() => setOpen(false)}
              position="bottom-left"
              className="w-32 right-0 -bottom-16 py-2"
            >
              <Link 
                to='/settings'
                className="w-full px-4 text-start text-gray-500 text-sm flex items-center gap-2"
              >
                <SettingsIcon className="w-4 h-4 stroke-2 stroke-gray-500" />
                Settings
              </Link>
              <hr className="my-2 border-gray-200" />
              <button 
                className="w-full px-4 text-start text-rose-500 text-sm flex items-center gap-2"
                onClick={handleLogout}
              >
                <DoorIcon className="w-4 h-4 stroke-2 stroke-rose-500" />
                Logout
              </button>
            </PopOver>
          </div>
        </div>
      </section>
    </nav>
  )
}

export default ProviderNavbar