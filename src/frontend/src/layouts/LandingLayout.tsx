import { ReactNode } from 'react'
import LandingNavbar from '../components/landing/LandingNavbar'

type LandingLayoutProps = {
  children: ReactNode
}

const LandingLayout = ({
  children,
}: LandingLayoutProps) => {
  return (
    <main
      className="flex flex-col w-screen h-screen items-start justify-center "
    >
      <LandingNavbar />
      <article className="w-full h-full flex flex-col justify-start items-center overflow-y-scroll overflow-x-hidden">
        {children}
      </article>
    </main>
  )
}

export default LandingLayout