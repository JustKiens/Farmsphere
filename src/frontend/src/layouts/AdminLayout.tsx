import { ReactNode } from 'react'
import AdminNavbar from '../components/admin/AdminNavbar'
import AdminSidebar from '../components/admin/AdminSidebar'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = ({
  children,
}: AdminLayoutProps) => {

  return (
    <main
      className="flex flex-col w-screen h-screen items-start justify-center "
    >
      <AdminNavbar />
      <article className="w-full h-full flex justify-start items-center overflow-hidden">
        <AdminSidebar />
        <section
          className='w-full h-full overflow-hidden'
        >
          {children}
        </section>
      </article>
    </main>
  )
}

export default AdminLayout