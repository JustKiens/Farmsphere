import { cloneElement, ReactElement, ReactNode } from 'react'
import { Link } from 'react-router-dom';
import { useProviderStore } from '../../stores/ProviderStore';


interface ProviderSideBarButtonPorps {
  icon: ReactNode
  name: 'Home' | 'Settings'
}

const ProviderSideBarButton = ({icon, name} : ProviderSideBarButtonPorps ) => {

  const activePage = useProviderStore((state) => state.activePage)
  const setActivePage = useProviderStore((state) => state.setActivePage)

  const isActive = activePage === name

  return (
    <Link 
      to={`/${name.toLowerCase()}`}
      onClick={()=>setActivePage(name)}
      className={`flex items-center justify-start gap-2 py-2 w-full rounded-md
       `}
    >
      {cloneElement(icon as ReactElement, {
        className: `stroke-2 w-5 h-5 ${isActive ? " stroke-gray-700 " : " stroke-gray-500 "}`
      })}      
      <p className={`${isActive ? " text-gray-700 ": " text-gray-500 "}  font-medium text-base`}>{name}</p>
    </Link>
  )
}

export default ProviderSideBarButton
