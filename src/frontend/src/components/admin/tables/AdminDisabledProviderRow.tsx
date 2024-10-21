
import { useRef, useState } from 'react'
import { ProviderAccount } from '../../../interfaces/AccountType'
import { TableData, TableRow } from '../../common/DataTable';
import { extractFullAddress, extractFullName } from '../../../utils/Extractors';
import { formatDateWithSuffix } from '../../../utils/Formatters';
import { activateProvider } from '../../../services/AdminServices';
import { useQueryClient } from '@tanstack/react-query';
import { provinceClasses } from '../../../constants/ColorsConstants';
import { useModalStore } from '../../../stores/ModalStore';
import ThreeDotsIcon from '../../../icons/linear/ThreeDotsIcon';
import PopOver from '../../common/PopOver';
import CheckIcon from '../../../icons/linear/CheckIcon';
import DeleteIcon from '../../../icons/linear/DeleteIcon';

type AdminDisabledProviderRowProps = {
  provider: ProviderAccount
  index: number;
  gridTemplate: string;
}

const AdminDisabledProviderRow = ({
  provider,
  index,
  gridTemplate,
}: AdminDisabledProviderRowProps ) => {


  const queryClient = useQueryClient();
  const anchorRef = useRef<HTMLButtonElement>(null);
  const setOpen = useModalStore((state) => state.setOpen)
  const setConfirmation = useModalStore((state) => state.setConfirmation)
  const setId = useModalStore((state) => state.setId)

  const [ isPopoverOpen, setIsPopoverOpen ] = useState(false);
  const { text, bg, ring } = provinceClasses[provider.accountAssignedProvince] || { text: "text-black", bg: "bg-gray-200" };
  
  const fullName = extractFullName(provider.accountFullName)
  const address = extractFullAddress(provider.accountAddress)


  const handleActivateProvider = async () => {
    try {
      await activateProvider(provider._id);
      queryClient.invalidateQueries({ queryKey: ['adminDisabledProviderTableData']});
    } catch (error) {
      console.error(error);
    } 
  }

  const handleOpenDeleteModal = () => {
    setOpen(true);
    setConfirmation(fullName)
    setId(provider._id)
  }

  return (
    <TableRow 
      index={index}
      gridTemplateColumns={gridTemplate}   
    >

      <TableData
        className="flex items-start gap-4 "
      >
        <img src={provider.accountAvatar} alt={`${fullName} avatar`} className="w-9 h-9 rounded-full ring-1 ring-gray-200" />
        <div className="flex flex-col items-start justify-center">
          <label className="text-sm text-gray-700">
            {fullName}
          </label>
          <label className="text-sm text-gray-500">
            {provider.accountClientID}
          </label>
        </div>
      </TableData>
      <TableData
        className=" flex flex-col items-start justify-center "
      >
        <label className="text-sm text-gray-700 w-full">
          {"(+63) " + provider.accountPhoneNumber}
        </label>
        <label 
          className="text-sm text-green-500 w-full underline underline-offset-2"
        >
          {(provider.accountEmail).toLowerCase()}
        </label>
      </TableData>
      <TableData className="flex items-start justify-start gap-2">
        <label className="text-sm text-gray-700 w-full ">
          {address}
        </label>      
      </TableData>
      <TableData
        className=" flex items-center justify-start "
      >
        <span
          className={`px-2 py-1 rounded-md text-xs uppercase ring-1 ${text} ${bg} ${ring}`}
        >
          {provider.accountAssignedProvince}
        </span>
      </TableData>
      <TableData
        className=" flex items-center justify-start w-full"
      >
        <label className="text-sm text-gray-700 w-full ">
          {formatDateWithSuffix(provider.createdAt)}
        </label>
      </TableData>
      <TableData
        className="flex items-start gap-4  "
      >
        <button 
          ref={anchorRef}
          className=""
          onClick={()=>setIsPopoverOpen(!isPopoverOpen)}
        >
          <ThreeDotsIcon className="w-5 h-5 stroke-2 stroke-gray-500 fill-gray-500 -rotate-90 z-0" />
        </button>
        <PopOver 
          anchorRef={anchorRef}
          isOpen={isPopoverOpen}
          onClose={() => {
            setIsPopoverOpen(false);
          }}              
          className=" top-0 right-20  py-2 flex flex-col h-fit"
          position='left'
        >
          <button 
            type="button" 
            className="px-4 hover:bg-gray-50 w-full py-1 text-base text-start text-gray-500 flex items-center gap-2"
            onClick={handleActivateProvider}
          >
            <CheckIcon className="stroke-2 stroke-gray-500 w-4 h-4 " />
            Activate
          </button>
          <hr className="border-gray-200 my-1" />
          <div 
            className="px-4 cursor-pointer hover:bg-gray-50 w-full py-1 text-base text-start text-rose-500 flex items-center gap-2"
            onClick={handleOpenDeleteModal}
          >
            <DeleteIcon className="stroke-2 stroke-rose-500 w-4 h-4 " />
            Delete
          </div>
        </PopOver>      
      </TableData>
    </TableRow>
  )
}

export default AdminDisabledProviderRow