
import { useAccount } from "../../../hooks/useAccount"
import { useAdminStore } from "../../../stores/AdminStore"
import AdminLinkButton from "../AdminLinkButton"
import EditSecurityStep from "../steps/EditAccountStep"
import EditProfileStep from "../steps/EditProfileStep"


const AdminAccountOutlet = () => {

  const { data: account, isLoading } = useAccount()

  const accountTab = useAdminStore((state) => state.accountTab)
  const setAccountTab = useAdminStore((state) => state.setAccountTab)

  if (isLoading) return <div>Loading...</div>

  return (
    <main className="h-full bg-white flex flex-col w-full">
      <header className="flex items-center justify-between p-6 w-full">
        <div className="flex items-start justify-center gap-4 ">
          <AdminLinkButton 
            isActive={accountTab === "profile"}
            onClick={() => setAccountTab("profile")}
          >
            Profile
          </AdminLinkButton>

          <AdminLinkButton 
            isActive={accountTab === "security"}
            onClick={() => setAccountTab("security")}
          >
            Security
          </AdminLinkButton>
        </div>
      </header>
      <section className="flex-grow overflow-y-scroll overflow-x-hidden border-t border-gray-200">
        {accountTab === "profile" && <EditProfileStep account={account} />}
        {accountTab === "security" && <EditSecurityStep account={account} />}
      </section>
    </main>  
  )
}

export default AdminAccountOutlet