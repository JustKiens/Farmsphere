import { ReactNode } from 'react'
import ProviderNavbar from '../components/provider/ProviderNavbar'
import ProviderSidebar from '../components/provider/ProviderSidebar'


type AdminLayoutProps = {
  children: ReactNode
}

const ProviderLayout = ({
  children,
}: AdminLayoutProps) => {

  return (
    <main
      className="flex flex-col w-screen h-screen items-start justify-center "
    >
      <ProviderNavbar />
      <article className="w-full h-full flex justify-start items-center overflow-hidden">
        <ProviderSidebar />
        <section
          className='w-full h-full overflow-hidden'
        >
          {children}
        </section>
      </article>
    </main>
  )
}

export default ProviderLayout