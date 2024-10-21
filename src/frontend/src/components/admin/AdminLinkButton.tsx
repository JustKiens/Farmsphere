import { ReactNode } from "react"

type AdminLinkButtonProps = {
  isActive: boolean
  onClick: () => void
  children: ReactNode
}

const AdminLinkButton = ({ isActive, onClick, children }: AdminLinkButtonProps) => {

  const baseStyle = " relative w-fit h-10 transition-all duration-300 ease-in-out outline-offset-4 flex items-center justify-start gap-1 text-center  py-2 flex items-center justify-center";
  return (
    <button 
      onClick={onClick}
      className={ ` font-medium ${baseStyle} ${isActive ? " text-gray-700" : " text-gray-500"}`}
    >
      {children}
      {isActive && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-green-500 rounded-full" />}
    </button>
  )
}

export default AdminLinkButton
